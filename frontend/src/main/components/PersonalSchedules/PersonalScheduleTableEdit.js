import React from "react";
import OurTable, { ButtonColumn } from "main/components/OurTable";
import { useBackendMutation } from "main/utils/useBackend";
import {
  cellToAxiosParamsDelete,
  onDeleteSuccess,
} from "main/utils/PersonalScheduleEditUtils";
//import { useParams } from "react-router-dom";
export default function PersonalSchedulesTableEdit({
  personalSchedules,
}) {
    //let { id } = useParams();
    //console.log("PSCourseEditTable", personalSchedules)

 // Stryker disable all : hard to test for query caching
 const deleteMutation = useBackendMutation(
  cellToAxiosParamsDelete,
  { onSuccess: onDeleteSuccess },
  [],
);
// Stryker restore all

// Stryker disable next-line all : TODO try to make a good test for this
const deleteCallback = async (cell) => {
  //const mutationArgs = { cell };
  deleteMutation.mutate(cell);
};

  // Stryker restore all

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },

    {
      Header: "Course Id",
      accessor: "courseId",
    },
    {
      Header: "Course Name",
      accessor: "title", // accessor is the "key" in the data
    },
  ];

  const buttonColumns = [
    ...columns,
    // Stryker disable next-line all
    ButtonColumn("Delete", "danger", deleteCallback, "PSCourseEditTable"),
  ];

  const columnsToDisplay = buttonColumns;

  return (
    <OurTable
      data={personalSchedules}
      columns={columnsToDisplay}
      testid={"PSCourseEditTable"}
    />
  );
}
