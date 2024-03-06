import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import PersonalSchedulesTableEdit from "main/components/PersonalSchedules/PersonalScheduleTableEdit";
//import { currentUserFixtures } from "fixtures/currentUserFixtures";
//import { personalSectionsFixtures } from "fixtures/personalSectionsFixtures";
import { editCourseFixtures } from "fixtures/editCourseFixtures";
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const mockedMutate = jest.fn();

jest.mock("main/utils/useBackend", () => ({
  ...jest.requireActual("main/utils/useBackend"),
  useBackendMutation: () => ({ mutate: mockedMutate }),
}));

describe("UserTable tests", () => {
  const queryClient = new QueryClient();

  test("renders without crashing for empty table with user not logged in", () => {
    //const currentUser = null;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesTableEdit
            personalSchedules={[]}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders without crashing for empty table for ordinary user", () => {
    //const currentUser = currentUserFixtures.userOnly;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesTableEdit
            personalSchedules={[]}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders without crashing for empty table for admin", () => {
    //const currentUser = currentUserFixtures.adminUser;

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesTableEdit
            personalSchedules={[]}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("Has the expected column headers and content", async () => {
    
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesTableEdit
            personalSchedules={editCourseFixtures.twoCourses}
          />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    const expectedHeaders = [
      "ID",
      "Course Id",
      "Course Name",
    ];
    const testId = "PSCourseEditTable";
    //const columnHeader = screen.getByTestId('PSCourseEditTable-header-Delete');
    expectedHeaders.forEach((headerText) => {
      const header = screen.getByText(headerText);
      expect(header).toBeInTheDocument();
    });
    //expect(columnHeader).getByText("Delete");

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-id`),
    ).toHaveTextContent("72");
    expect(
        screen.getByTestId(`${testId}-cell-row-1-col-id`),
    ).toHaveTextContent("75");

    expect(
        screen.getByTestId(`${testId}-cell-row-0-col-courseId`),
    ).toHaveTextContent("WRIT 1");
    expect(
          screen.getByTestId(`${testId}-cell-row-1-col-courseId`),
    ).toHaveTextContent("SOC 91");

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-title`),
  ).toHaveTextContent("APP TO UNIV WRIT");
  expect(
        screen.getByTestId(`${testId}-cell-row-1-col-title`),
  ).toHaveTextContent("GROUP EXP LEARNING");

    expect(
      screen.getByTestId(`${testId}-cell-row-0-col-Delete`),
    ).toHaveTextContent("Delete");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-Delete`),
    ).toHaveTextContent("Delete");

  });
});
