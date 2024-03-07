import SectionsTableBase from "main/components/SectionsTableBase";

import { yyyyqToQyy } from "main/utils/quarterUtilities.js";
import {
  convertToFraction,
  formatDays,
  formatInstructors,
  formatLocation,
  formatTime,
  isSection,
  formatStatus,
  formatInfoLink,
  renderInfoLink,
} from "main/utils/sectionUtils.js";
import { useNavigate } from "react-router-dom";
import { hasRole } from "main/utils/currentUser";

function getFirstVal(values) {
  return values[0];
}

function getVal(values) {
  if (values.length > 1) {
    return null;
  }
  return values[0];
}

export default function SectionsTable({ sections, currentUser }) {
  // Stryker restore all
  // Stryker disable BooleanLiteral
  const navigate = useNavigate();

  const addCallback = (courseId) => {
    navigate(`/courses/create/${courseId}`);
  };

  const columns = [
    {
      Header: "Quarter",
      accessor: (row) => yyyyqToQyy(row.courseInfo.quarter),
      disableGroupBy: true,
      id: "quarter",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Course ID",
      accessor: "courseInfo.courseId",

      Cell: ({ cell: { value } }) => value.substring(0, value.length - 2),
    },
    {
      Header: "Title",
      accessor: "courseInfo.title",
      disableGroupBy: true,

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      Header: "Is Section?",
      accessor: (row) => isSection(row.section.section),
      // Stryker disable next-line StringLiteral: this column is hidden, very hard to test
      id: "isSection",
    },
    {
      Header: "Status",
      accessor: (row) => formatStatus(row.section),
      disableGroupBy: true,
      id: "status",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enrolled",
      accessor: (row) =>
        convertToFraction(row.section.enrolledTotal, row.section.maxEnroll),
      disableGroupBy: true,
      id: "enrolled",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Location",
      accessor: (row) => formatLocation(row.section.timeLocations),
      disableGroupBy: true,
      id: "location",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Days",
      accessor: (row) => formatDays(row.section.timeLocations),
      disableGroupBy: true,
      id: "days",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Time",
      accessor: (row) => formatTime(row.section.timeLocations),
      disableGroupBy: true,
      id: "time",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Instructor",
      accessor: (row) => formatInstructors(row.section.instructors),
      disableGroupBy: true,
      id: "instructor",

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Enroll Code",
      accessor: "section.enrollCode",
      disableGroupBy: true,

      aggregate: getFirstVal,
      Aggregated: ({ cell: { value } }) => `${value}`,
    },
    {
      Header: "Info",
      accessor: formatInfoLink,
      Cell: renderInfoLink,
      disableGroupBy: true,
      id: "info",

      aggregate: getFirstVal,
      Aggregated: renderInfoLink,
    },
  ];

  const columnsIfUser = [
    ...columns,
    {
      Header: "Add",
      id: "add",
      disableGroupBy: true,
      aggregate: getVal,
      accessor: (row) => {
        return (
          <button
            onClick={() => addCallback(row.section.enrollCode)}
            data-testid={`add-button-${row.section.enrollCode}`}
          >
            Add
          </button>
        );
      },
    },
  ];

  const testid = "SectionsTable";

  const columnsToDisplay = hasRole(currentUser, "ROLE_USER")
    ? columnsIfUser
    : columns;

  return (
    <SectionsTableBase
      data={sections}
      columns={columnsToDisplay}
      testid={testid}
    />
  );
}
