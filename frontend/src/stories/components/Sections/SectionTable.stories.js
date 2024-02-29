import React from "react";

import SectionsTable from "main/components/Sections/SectionsTable";
import {
  oneSection,
  threeSections,
  fiveSections,
  gigaSections,
} from "fixtures/sectionFixtures";
import { currentUserFixtures } from "fixtures/currentUserFixtures";

export default {
  title: "components/Sections/SectionsTable",
  component: SectionsTable,
};

const Template = (args) => {
  return <SectionsTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  sections: [],
};

export const OneSection = Template.bind({});

OneSection.args = {
  sections: oneSection,
};

export const ThreeSections = Template.bind({});

ThreeSections.args = {
  sections: threeSections,
};

export const ThreeSectionsUser = Template.bind({});

ThreeSectionsUser.args = {
  sections: threeSections,
  currentUser: currentUserFixtures.userOnly,
};

export const FiveSections = Template.bind({});

FiveSections.args = {
  sections: fiveSections,
};

export const FiveSectionsUser = Template.bind({});

FiveSectionsUser.args = {
  sections: fiveSections,
  currentUser: currentUserFixtures.userOnly,
};

export const GigaSections = Template.bind({});

GigaSections.args = {
  sections: gigaSections,
};
