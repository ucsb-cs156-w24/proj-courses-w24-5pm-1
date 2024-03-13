package edu.ucsb.cs156.courses.controllers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.ControllerTestCase;
import edu.ucsb.cs156.courses.documents.Course;
import edu.ucsb.cs156.courses.documents.PersonalSectionsFixtures;
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
import java.util.Collections;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@WebMvcTest(controllers = {PSCourseDetailsController.class})
@Import(TestConfig.class)
@AutoConfigureDataJpa
public class PSCourseDetailsControllerTests extends ControllerTestCase {

  @MockBean PersonalScheduleRepository personalscheduleRepository;

  @MockBean UserRepository userRepository;

  @MockBean PSCourseRepository coursesRepository;

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
        mockMvc.perform(get("/api/courseDetails/all")).andExpect(status().is(200)).andReturn();
    String actual = response.getResponse().getContentAsString();
    boolean correct = actual.contains("[]");
    assertEquals(correct, true);
  }

  @WithMockUser(roles = {"USER"})
  @Test
  public void api_ps_course_details_user_logged_in_returns_existing_course() throws Exception {
    // arrange
    User u = currentUserService.getCurrentUser().getUser();
    Long userId = u.getId();
    PersonalSchedule personalSchedule =
        PersonalSchedule.builder()
            .name("Schedule 1")
            .description("First test schedule")
            .quarter("20221")
            .user(u)
            .id(1L)
            .build();
    Course course = objectMapper.readValue(PersonalSectionsFixtures.ONE_COURSE, Course.class);

    PSCourse course1 = PSCourse.builder().id(1L).user(u).enrollCd("59501").psId(1L).build();

    CourseWithSchedule courseWithSchedule = new CourseWithSchedule();
    courseWithSchedule.setPersonalSchedule(personalSchedule);
    courseWithSchedule.setCourse(course);

    ArrayList<PSCourse> crs = new ArrayList<PSCourse>();
    crs.add(course1);

    Iterable<PersonalSchedule> personalSchedules = Collections.singletonList(personalSchedule);

    when(personalscheduleRepository.findAllByUserId(eq(userId))).thenReturn(personalSchedules);
    when((coursesRepository.findAllByPsId(eq(1L)))).thenReturn(crs);
    when(ucsbCurriculumService.getJSONbyQtrEnrollCd(eq("20221"), eq("59501")))
        .thenReturn(PersonalSectionsFixtures.ONE_COURSE);

    // act
    MvcResult response =
        mockMvc.perform(get("/api/courseDetails/all")).andExpect(status().isOk()).andReturn();

    // assert
    verify(personalscheduleRepository, times(1)).findAllByUserId(eq(u.getId()));
    verify(coursesRepository, times(1)).findAllByPsId(1L);
    verify(ucsbCurriculumService, times(1)).getJSONbyQtrEnrollCd("20221", "59501");
    String expectedJson = mapper.writeValueAsString(courseWithSchedule);
    expectedJson = "[" + expectedJson + "]";
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }
}

/**
 * User us = getCurrentUser().getUser(); PersonalSchedule ps = personalScheduleRepository
 * .findByIdAndUser(psId, us) .orElseThrow(() -> new EntityNotFoundException(PersonalSchedule.class,
 * psId)); ArrayList<Course> sections = new ArrayList<Course>(); ArrayList<String> jsons = new
 * ArrayList<String>(); Iterable<PSCourse> courses = coursesRepository.findAllByPsId(psId); for
 * (PSCourse crs : courses) {
 *
 * <p>User u = crs.getUser(); String qtr = ps.getQuarter(); String responseBody =
 * ucsbCurriculumService.getJSONbyQtrEnrollCd(qtr, crs.getEnrollCd()); jsons.add(responseBody);
 * Course course = objectMapper.readValue(responseBody, Course.class); sections.add(course); }
 * return sections;
 */
