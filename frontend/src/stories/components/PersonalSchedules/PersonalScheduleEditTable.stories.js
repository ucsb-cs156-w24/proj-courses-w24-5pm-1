import React from "react";

//import PersonalSectionsTable from "main/components/PersonalSections/PersonalSectionsTable";
import PersonalSchedulesTableEdit from "main/components/PersonalSchedules/PersonalScheduleTableEdit";
// import { personalSectionsFixtures } from "fixtures/personalSectionsFixtures";
import { editCourseFixtures } from "fixtures/editCourseFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

export default {
  title: "components/PersonalSchedules/PersonalScheduleTableEdit",
  component: PersonalSchedulesTableEdit,
};

const Template = (args) => {
  return <PersonalSchedulesTableEdit {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  personalSchedules: [],
  currentUser: currentUserFixtures.adminUser,
};

export const TwoClasses = Template.bind({});

TwoClasses.args = {
  personalSchedules: editCourseFixtures.twoCourses,
  currentUser: currentUserFixtures.adminUser,
};

export const TwoClassesUser = Template.bind({});
TwoClassesUser.args = {
  personalSchedules: editCourseFixtures.twoCourses,
  currentUser: currentUserFixtures.adminUser,
};
