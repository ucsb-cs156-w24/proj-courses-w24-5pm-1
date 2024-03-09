package edu.ucsb.cs156.courses.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.documents.Course;
import edu.ucsb.cs156.courses.documents.SectionFixtures;
import edu.ucsb.cs156.courses.documents.PersonalSectionsFixtures;
import edu.ucsb.cs156.courses.documents.CourseWithScheduleFixtures;
import edu.ucsb.cs156.courses.entities.PSCourse;
import edu.ucsb.cs156.courses.entities.PersonalSchedule;
import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.models.CourseWithSchedule;
import edu.ucsb.cs156.courses.repositories.PSCourseRepository;
import edu.ucsb.cs156.courses.repositories.PersonalScheduleRepository;
import edu.ucsb.cs156.courses.repositories.UserRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import edu.ucsb.cs156.courses.testconfig.TestConfig;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.beans.factory.annotation.Autowired;

@WebMvcTest(controllers = {PSCourseDetailsController.class})
@Import(TestConfig.class)
@AutoConfigureDataJpa
public class PSCourseDetailsControllerTests extends ControllerTestCase {

  @MockBean PersonalScheduleRepository personalscheduleRepository;

  @MockBean UserRepository userRepository;

  @MockBean private UCSBCurriculumService ucsbCurriculumService;

  @Autowired private MockMvc mockMvc;

  @Autowired private ObjectMapper objectMapper;

  // Authorization tests for /api/courseDetails/all

  @Test
  public void api_ps_course_details_logged_out_returns_403() throws Exception {
    mockMvc.perform(get("/api/courseDetails/all")).andExpect(status().is(403));
  }

  @WithMockUser(roles = {"USER"})
  @Test
  public void api_ps_course_details_user_logged_in_no_personal_schedule() throws Exception {

    MvcResult response =
        mockMvc
            .perform(get("/api/courseDetails/all"))
            .andExpect(status().is(200))
            .andReturn();
    String actual = response.getResponse().getContentAsString();
    boolean correct = actual.contains("[]");
    assertEquals(correct, true);
  }

  @WithMockUser(roles = {"USER"})
  @Test
  public void api_ps_course_details_user_logged_in_returns_existing_course() throws Exception {
    // arrange
    User u = currentUserService.getCurrentUser().getUser();
    PersonalSchedule personalSchedule =
        PersonalSchedule.builder()
            .name("Schedule 1")
            .description("First test schedule")
            .quarter("20221")
            .user(u)
            .id(1L)
            .build();
    Course course = objectMapper.readValue(PersonalSectionsFixtures.ONE_COURSE, Course.class);

    CourseWithSchedule courseWithSchedule = new CourseWithSchedule();
    courseWithSchedule.setPersonalSchedule(personalSchedule);
    courseWithSchedule.setCourse(course);

    when(personalscheduleRepository.findByIdAndUser(eq(1L), eq(u))).thenReturn(Optional.of(personalSchedule));
    when(ucsbCurriculumService.getJSONbyQtrEnrollCd(eq("20221"), eq("59501")))
        .thenReturn(PersonalSectionsFixtures.ONE_COURSE);

    // act
    MvcResult response =
        mockMvc
            .perform(get("/api/courseDetails/all"))
            .andExpect(status().isOk())
            .andReturn();

    // assert
    verify(personalscheduleRepository, times(1)).findByIdAndUser(eq(1L), eq(u));
    verify(ucsbCurriculumService, times(1)).getJSONbyQtrEnrollCd("20221", "59501");
    String expectedJson = mapper.writeValueAsString(courseWithSchedule);
    expectedJson = "[" + expectedJson + "]";
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }
}
