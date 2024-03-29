import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SpecificCoursesCreatePage from "main/pages/Courses/PSSpecificCoursePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

import { apiCurrentUserFixtures } from "fixtures/currentUserFixtures";
import { systemInfoFixtures } from "fixtures/systemInfoFixtures";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";

const mockToast = jest.fn();
jest.mock("react-toastify", () => {
  const originalModule = jest.requireActual("react-toastify");
  return {
    __esModule: true,
    ...originalModule,
    toast: (x) => mockToast(x),
  };
});

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    __esModule: true,
    ...originalModule,
    Navigate: (x) => {
      mockNavigate(x);
      return null;
    },
  };
});

describe("SpecificCoursesCreatePage tests", () => {
  const axiosMock = new AxiosMockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
    axiosMock.resetHistory();
    axiosMock
      .onGet("/api/currentUser")
      .reply(200, apiCurrentUserFixtures.userOnly);
    axiosMock
      .onGet("/api/systemInfo")
      .reply(200, systemInfoFixtures.showingNeither);
  });

  test("renders without crashing", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SpecificCoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );
  });

  test("when you fill in the form and hit submit, it makes a request to the backend", async () => {
    const queryClient = new QueryClient();
    const courses = [
      {
        id: "17",
        psId: 13,
        enrollCd: "08250",
      },
    ];

    axiosMock.onPost("/api/courses/post").reply(202, courses);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SpecificCoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId("CourseForm-enrollCd"),
    ).toBeInTheDocument();

    const enrollCdField = screen.getByTestId("CourseForm-enrollCd");
    const psIdField = document.querySelector("#CourseForm-psId");
    const submitButton = screen.getByTestId("CourseForm-submit");

    fireEvent.change(psIdField, { target: { value: 13 } });
    localStorage.setItem("CourseForm-psId", "13");
    expect(enrollCdField).toHaveAttribute("readOnly");
    fireEvent.change(enrollCdField, { target: { value: "08250" } });
    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await waitFor(() => expect(axiosMock.history.post.length).toBe(1));

    // expect(quarterField).toHaveValue("20124");
    //expect(setQuarter).toBeCalledWith("20124"); //need this and axiosMock below?
    expect(localStorage.getItem("CourseForm-psId")).toBe("13");
    expect(axiosMock.history.post[0].params).toEqual({
      psId: "13",
      enrollCd: "08250",
    });

    expect(mockToast).toBeCalledWith(
      "New course Created - id: 17 enrollCd: 08250",
    );
    expect(mockNavigate).toBeCalledWith({ to: "/courses/list" });
  });

  test("when you input incorrect information, we get an error", async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SpecificCoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(await screen.findByTestId("CourseForm-psId")).toBeInTheDocument();

    const psIdField = document.querySelector("#CourseForm-psId");
    const enrollCdField = screen.getByTestId("CourseForm-enrollCd");
    const submitButton = screen.getByTestId("CourseForm-submit");

    fireEvent.change(psIdField, { target: { value: 13 } });
    fireEvent.change(enrollCdField, { target: { value: "99881" } });

    expect(submitButton).toBeInTheDocument();

    fireEvent.click(submitButton);

    await screen.findByTestId("PSCourseCreate-Error");
    const PSError = screen.getByTestId("PSCourseCreate-Error");
    expect(PSError).toBeInTheDocument();
    expect(screen.getByTestId("CourseForm-enrollCd")).toHaveAttribute(
      "readOnly",
    );
  });

  test("sets schedule and updates localStorage when schedules are available", async () => {
    console.log("Inside Last Test");
    const queryClient = new QueryClient();

    axiosMock.onGet("/api/personalschedules/all").reply(200, [
      {
        id: 17,
        name: "SampName",
        description: "desc",
        quarter: "W08",
      },
    ]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <SpecificCoursesCreatePage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(
      await screen.findByTestId("CourseForm-enrollCd"),
    ).toBeInTheDocument();
    expect(localStorage.getItem("CourseForm-psId")).toBe("17");
  });
});
