import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import CourseForm from "main/components/Courses/CourseForm";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function SpecificCoursesCreatePage() {
  const { enrollmentcode } = useParams();
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
    return (
      <BasicLayout>
        <div className="pt-2">
          <h1>Add Specific Course</h1>

          <CourseForm
            submitAction={onSubmit}
            buttonLabel="Add"
            codeEditable={false}
            enrollmentCode={enrollmentcode}
          />
          <p data-testid="PSCourseCreate-Error">
            Error: {mutation.error.response.data?.message}
          </p>
        </div>
      </BasicLayout>
    );
  }
  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Add Specific Course</h1>

        <CourseForm
          submitAction={onSubmit}
          buttonLabel="Add"
          codeEditable={false}
          enrollmentCode={enrollmentcode}
        />
      </div>
    </BasicLayout>
  );
}
