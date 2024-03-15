package edu.ucsb.cs156.courses.models;

import edu.ucsb.cs156.courses.documents.Course;
import edu.ucsb.cs156.courses.entities.PersonalSchedule;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/** This class bundles each Personal Schedule course with its corresponding schedule. */
/** Made originally for PSCourseDetailsController.java */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseWithSchedule {
  private PersonalSchedule personalSchedule;
  private Course course;
}
