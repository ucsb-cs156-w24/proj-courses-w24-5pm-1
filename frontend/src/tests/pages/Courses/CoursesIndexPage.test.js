import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import mockConsole from "jest-mock-console";

import CoursesIndexPage from "main/pages/Courses/PSCourseIndexPage";
import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import { courseWithScheduleFixtures } from "fixtures/courseWithScheduleFixtures";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

describe("CoursesIndexPage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  const testId = "CourseTable";

  const setupUserOnly = () => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
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
  };

  test("renders without crashing for regular user", () => {
    setupUserOnly();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/courseDetails/all").reply(200, []);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders without crashing for admin user", () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock.onGet("/api/courses/admin/all").reply(200, []);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("renders two courses without crashing for regular user", async () => {
    setupUserOnly();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/courseDetails/all")
      .reply(200, courseWithScheduleFixtures.threeCourseWithSchedules);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByTestId(`${testId}-cell-row-0-col-personalSchedule.id`),
      ).toHaveTextContent("1");
    });
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-personalSchedule.id`),
    ).toHaveTextContent("2");
  });

  test("renders two courses without crashing for admin user", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/courseDetails/all")
      .reply(200, courseWithScheduleFixtures.threeCourseWithSchedules);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByTestId(`${testId}-cell-row-0-col-personalSchedule.id`),
      ).toHaveTextContent("1");
    });
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-personalSchedule.id`),
    ).toHaveTextContent("2");
  });

  test("renders empty table when backend unavailable, user only", async () => {
    setupUserOnly();

    const queryClient = new QueryClient();
    axiosMock.onGet("/api/courseDetails/all").timeout();

    const restoreConsole = mockConsole();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
    await waitFor(() => {
      expect(axiosMock.history.get.length).toBeGreaterThanOrEqual(1);
    });

    const errorMessage = console.error.mock.calls[0][0];
    expect(errorMessage).toMatch(
      "Error communicating with backend via GET on /api/courseDetails/all",
    );
    restoreConsole();

    expect(
      screen.queryByTestId(`${testId}-cell-row-0-col-personalSchedule.id`),
    ).not.toBeInTheDocument();
  });

  test("what happens when you click delete, admin", async () => {
    setupAdminUser();
    const queryClient = new QueryClient();
    axiosMock
      .onGet("/api/courseDetails/all")
      .reply(200, courseWithScheduleFixtures.threeCourseWithSchedules);
    axiosMock
      .onDelete("/api/courses/user")
      .reply(200, "Course with id 25 was deleted");

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CoursesIndexPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId(`${testId}-cell-row-0-col-personalSchedule.id`),
    ).toHaveTextContent("1");
    expect(
      screen.getByTestId(`${testId}-cell-row-1-col-personalSchedule.id`),
    ).toHaveTextContent("2");

    const deleteButton = screen.getByTestId(
      `CourseTable-cell-row-0-col-Delete-button`,
    );
    expect(deleteButton).toBeInTheDocument();

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockToast).toBeCalledWith("Course with id 25 was deleted");
    });
  });
});
