package edu.ucsb.cs156.courses.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ucsb.cs156.courses.documents.Course;
import edu.ucsb.cs156.courses.entities.PSCourse;
import edu.ucsb.cs156.courses.entities.PersonalSchedule;
import edu.ucsb.cs156.courses.entities.User;
import edu.ucsb.cs156.courses.models.CourseWithSchedule;
import edu.ucsb.cs156.courses.models.CurrentUser;
import edu.ucsb.cs156.courses.errors.EntityNotFoundException;
import edu.ucsb.cs156.courses.repositories.PSCourseRepository;
import edu.ucsb.cs156.courses.repositories.PersonalScheduleRepository;
import edu.ucsb.cs156.courses.services.UCSBCurriculumService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.ArrayList;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "PS Course Details")
@RequestMapping("/api/courseDetails")
@RestController
@Slf4j
public class PSCourseDetailsController extends ApiController {
  @Autowired PersonalScheduleRepository personalScheduleRepository;

  @Autowired PSCourseRepository coursesRepository;

  @Autowired private ObjectMapper objectMapper;

  @Autowired UCSBCurriculumService ucsbCurriculumService;

  @Operation(summary = "List all sections for a user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping(value = "/all", produces = "application/json")
  public ArrayList<CourseWithSchedule> allSections()
      throws JsonProcessingException {
    CurrentUser currentUser = getCurrentUser();
    Iterable<PersonalSchedule> personalSchedules =
        personalScheduleRepository.findAllByUserId(currentUser.getUser().getId());

    ArrayList<CourseWithSchedule> sections = new ArrayList<CourseWithSchedule>();
    ArrayList<String> jsons = new ArrayList<String>();
    for (PersonalSchedule personalSchedule : personalSchedules){
      Iterable<PSCourse> courses = coursesRepository.findAllByPsId(personalSchedule.getId());
      for (PSCourse crs : courses) {
        CourseWithSchedule courseWithSchedule = new CourseWithSchedule();
        courseWithSchedule.setPersonalSchedule(personalSchedule);

        User u = crs.getUser();
        String qtr = personalSchedule.getQuarter();
        String responseBody = ucsbCurriculumService.getJSONbyQtrEnrollCd(qtr, crs.getEnrollCd());
        jsons.add(responseBody);
        Course course = objectMapper.readValue(responseBody, Course.class);
        courseWithSchedule.setCourse(course);
        sections.add(courseWithSchedule);
      }
    }
    return sections;
  }
}
