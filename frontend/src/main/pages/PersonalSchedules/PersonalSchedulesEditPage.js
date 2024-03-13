import React from "react";
import { useBackend } from "main/utils/useBackend";
import { useParams } from "react-router-dom";
import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import PersonalSchedulesTableEdit from "main/components/PersonalSchedules/PersonalScheduleTableEdit";
import { useCurrentUser } from "main/utils/currentUser";
//import { useParams } from "react-router-dom";
export default function PersonalSchedulesEditPage() {
  let { id } = useParams();
  const currentUser = useCurrentUser();

  var { data: personalSchedules } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/personalSections/all?psId=" + id],
    { method: "GET", url: "/api/personalSections/all?psId=" + id },
    [],
  );

  const {
    data: scheduleData,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useBackend(
    // Stryker disable next-line all : don't test internal caching of React Query
    ["/api/courses/user/psid/all?psId=" + id],
    { method: "GET", url: "/api/courses/user/psid/all?psId=" + id },
    [],
  );

  const updatedPersonalSchedules = personalSchedules.map((schedule) => {
    const matchingSchedule = scheduleData.find(
      (data) => data.enrollCd === schedule.classSections[0].enrollCode,
    );
    if (matchingSchedule) {
      return {
        ...schedule,
        id: matchingSchedule.id,
      };
    }
    return schedule;
  });

  personalSchedules = updatedPersonalSchedules;
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Edit Schedule</h1>
        <PersonalSchedulesTableEdit
          personalSchedules={personalSchedules}
          currentUser={currentUser}
        />
      </div>
    </BasicLayout>
  );
}
