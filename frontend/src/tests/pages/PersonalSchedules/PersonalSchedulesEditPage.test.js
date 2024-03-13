import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

import PersonalSchedulesEditPage from "main/pages/PersonalSchedules/PersonalSchedulesEditPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
//import { personalScheduleFixtures } from "fixtures/personalScheduleFixtures";
import { inputEditFixtures } from "fixtures/editCourseFixtures";
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    useParams: () => ({
      id: 1,
    }),
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});
const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

describe("PSCourseEditPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const testId = "PSCourseEditTable";

  const setupUserOnly = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1", { params: { psId: 1 } })
      .reply(200, inputEditFixtures.psIdCall);
    axiosMock
      .onGet("/api/personalSections/all", { params: { id: 1 } })
      .reply(200, inputEditFixtures.sectionCall);
  };

  const setupAdminUser = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.adminUser);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1", { params: { psId: 1 } })
      .reply(200, inputEditFixtures.psIdCall);
    axiosMock
      .onGet("/api/personalSections/all", { params: { id: 1 } })
      .reply(200, inputEditFixtures.sectionCall);
  };

  test("renders without crashing for regular user", () => {
    setupUserOnly();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/personalSections/all?psId=1").reply(200, []);
    axiosMock.onGet("/api/courses/user/psid/all?psId=1").reply(200, []);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders without crashing for admin user", () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/personalSections/all?psId=1").reply(200, []);
    axiosMock.onGet("/api/courses/user/psid/all?psId=1").reply(200, []);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders two PSCourses without crashing for regular user", async () => {
    setupUserOnly();
    const queryClient = new QueryClient();

    axiosMock
      .onGet("/api/personalSections/all?psId=1")
      .reply(200, inputEditFixtures.sectionCall);
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1")
      .reply(200, inputEditFixtures.psIdCall);
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId(`${testId}-cell-row-0-col-id`),
    ).toHaveTextContent("72");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(
      "75",
    );
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

  test("renders two PSCourses without crashing for admin user", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();

    axiosMock
      .onGet("/api/personalSections/all?psId=1")
      .reply(200, inputEditFixtures.sectionCall);
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1")
      .reply(200, inputEditFixtures.psIdCall);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId(`${testId}-cell-row-0-col-id`),
    ).toHaveTextContent("72");
    expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(
      "75",
    );
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

  test("renders empty table when backend unavailable, user only for sections call", async () => {
    setupUserOnly();

    const queryClient = new QueryClient();
    axiosMock.onGet("/api/personalSections/all?psId=1").timeout();
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1")
      .reply(200, inputEditFixtures.psIdCall);
    const restoreConsole = mockConsole();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1);
    });

    const errorMessage = console.error.mock.calls[0][0];
    expect(errorMessage).toMatch(
      "Error communicating with backend via GET on /api/personalSections/all?psId=1",
    );
    restoreConsole();

    expect(
      screen.queryByTestId(`${testId}-cell-row-0-col-id`),
    ).not.toBeInTheDocument();
  });

  test("renders empty table when backend unavailable, user only for psid call", async () => {
    setupUserOnly();

    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/personalSections/all?psId=1")
      .reply(200, inputEditFixtures.psIdCall);
    axiosMock.onGet("/api/courses/user/psid/all?psId=1").timeout();
    const restoreConsole = mockConsole();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1);
    });

    const errorMessage = console.error.mock.calls[0][0];
    expect(errorMessage).toMatch(
      "useBackend: Error communicating with backend via GET on /api/courses/user/psid/all?psId=1: Error: timeout of 0ms exceeded",
    );
    restoreConsole();

    // expect(
    //   screen.queryByTestId(`${testId}-cell-row-0-col-id`),
    // ).not.toBeInTheDocument();
  });

  // // //to be uncommented when Delete is implemented
  test("what happens when you click delete, admin", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/personalSections/all?psId=1")
      .reply(200, inputEditFixtures.sectionCall);
    axiosMock
      .onGet("/api/courses/user/psid/all?psId=1")
      .reply(200, inputEditFixtures.psIdCall);
    axiosMock
      .onDelete("/api/courses/user")
      .reply(200, "PSCourse with id 72 was deleted");
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PersonalSchedulesEditPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId(`${testId}-cell-row-0-col-id`),
    ).toHaveTextContent("72");
    // expect(screen.getByTestId(`${testId}-cell-row-1-col-id`)).toHaveTextContent(
    //   "2",
    // );

    const deleteButton = screen.getByTestId(
      `${testId}-cell-row-0-col-Delete-button`,
    );
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockToast).toBeCalledWith("PSCourse with id 72 was deleted");
    });
  });

  // test("correctly updates personalSchedules with matched scheduleData ids", async () => {
  //   setupAdminUser(); // or setupUserOnly(), depending on the scenario
  //   const queryClient = new QueryClient();
  //   axiosMock.onGet("/api/personalSections/all?psId=1").reply(200, undefined);
  //   axiosMock.onGet("/api/courses/user/psid/all?psId=1").reply(200, []);

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <MemoryRouter>
  //         <PersonalSchedulesEditPage />
  //       </MemoryRouter>
  //     </QueryClientProvider>,
  //   );

  //   // Assert the updated id is displayed
  //   // This assumes your component somehow reflects the updated id (e.g., in the text content of an element)
  //   // Adjust the assertion based on how your application uses the updated data
  //   await waitFor(() => {
  //     expect(screen.getByText("Edit Schedule")).toBeInTheDocument();
  //   });
  // })
});
