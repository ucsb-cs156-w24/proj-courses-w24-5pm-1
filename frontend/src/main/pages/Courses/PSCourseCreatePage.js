import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseForm from "main/components/Courses/CourseForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";

export default function CoursesCreatePage() {
  const objectToAxiosParams = (course) => ({
    url: "/api/courses/post",
    method: "POST",
    params: {
      enrollCd: course.enrollCd,
      psId: course.psId,
    },
  });

  const onSuccess = (course) => {
    toast(
      `New course Created - id: ${course[0].id} enrollCd: ${course[0].enrollCd}`,
    );
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/courses/user/all"],
  );

  const { isSuccess } = mutation;
  const onSubmit = async (data) => {
    const psId = {
      psId: localStorage["CourseForm-psId"],
    };

    const dataFinal = Object.assign(data, psId);
    mutation.mutate(dataFinal);
  };

  if (isSuccess) {
    return <Navigate to="/courses/list" />;
  }
  if (mutation.isError) {
    const errorMessage =
      mutation.error.response.data?.message || "Unknown Error";

    if (mutation.error.response.status === 400) {
      return (
        <BasicLayout>
          <div className="pt-2">
            <h1>Create New Course</h1>

            <CourseForm submitAction={onSubmit} />
            <br />
            <p data-testid="PSCourseCreate-Error">Error: Schedule Required</p>

            <button
              style={{
                backgroundColor: "#34859b",
                color: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
              onClick={() =>
                (window.location.href = "/personalschedules/create")
              }
            >
              Create Schedule
            </button>
          </div>
        </BasicLayout>
      );
    } else {
      return (
        <BasicLayout>
          <div className="pt-2">
            <h1>Create New Course</h1>

            <CourseForm submitAction={onSubmit} />
            <p data-testid="PSCourseCreate-Error">Error: {errorMessage}</p>
          </div>
        </BasicLayout>
      );
    }
  }
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1 data-testid="PSCourseCreate-Success">Create New Course</h1>

        <CourseForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  );
}
