import React from "react";
import { useBackend } from "main/utils/useBackend";
import { Button } from "react-bootstrap";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import PersonalSchedulesTable from "main/components/PersonalSchedules/PersonalSchedulesTable";
import { useCurrentUser } from "main/utils/currentUser";

export default function PersonalSchedulesIndexPage() {
  const currentUser = useCurrentUser();

  const {
    data: personalSchedules,
    error: _error,
    status: _status,
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/personalschedules/all"],
    { method: "GET", url: "/api/personalschedules/all" },
    [],
  );

  const addSchedule = () => {
    return(
      <Button
        href="/personalschedules/create"
        data-testid="createButton"
      >
      Add Schedule
      </Button>
    )
  }

  const addCourse = () => {
    return(
      <Button
        href="/courses/create"
        data-testid="appnavbar-courses-create"
      >
      Add Course
      </Button>
    )
  }
  const viewCourses = () => {
    return(
      <Button
        href="/courses/list"
        data-testid="appnavbar-courses-list"
      >
      All Courses
      </Button>
    )
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Personal Schedules</h1>
        <PersonalSchedulesTable
          personalSchedules={personalSchedules}
          currentUser={currentUser}
        />
      {addSchedule()}
      {addCourse()}
      {viewCourses()}
      </div>
    </BasicLayout>
  );
}
