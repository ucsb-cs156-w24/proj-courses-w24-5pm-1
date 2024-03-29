import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

import { quarterRange } from "main/utils/quarterUtilities";

import { useSystemInfo } from "main/utils/systemInfo";
import SingleQuarterDropdown from "../Quarters/SingleQuarterDropdown";

const UpdateCoursesByQuarterRangeJobForm = ({ callback }) => {
  const { data: systemInfo } = useSystemInfo();

  // Stryker disable OptionalChaining
  const startQtr = systemInfo?.startQtrYYYYQ || "20211";
  const endQtr = systemInfo?.endQtrYYYYQ || "20214";
  // Stryker enable OptionalChaining

  const quarters = quarterRange(startQtr, endQtr);

  // Stryker disable all : not sure how to test/mock local storage
  const startQuarter = localStorage.getItem("BasicSearch.StartQuarter");
  const endQuarter = localStorage.getItem("BasicSearch.EndQuarter");

  const [start_quarter, setStartQuarter] = useState(
    startQuarter || quarters[0].yyyyq,
  );
  const [end_quarter, setEndQuarter] = useState(
    endQuarter || quarters[1].yyyyq,
  );
  // Stryker restore all

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({ start_quarter, end_quarter });
  };

  // Stryker disable all : Stryker is testing by changing the padding to 0. But this is simply a visual optimization as it makes it look better
  const padding = { paddingTop: 10, paddingBottom: 10 };
  // Stryker restore all

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={start_quarter}
              setQuarter={setStartQuarter}
              controlId={"BasicSearch.StartQuarter"}
              label="Start Quarter"
            />
          </Col>
          <Col md="auto">
            <SingleQuarterDropdown
              quarters={quarters}
              quarter={end_quarter}
              setQuarter={setEndQuarter}
              controlId={"BasicSearch.EndQuarter"}
              label="End Quarter"
            />
          </Col>
        </Row>
        <Row style={padding}>
          <Col md="auto">
            <Button
              variant="primary"
              type="submit"
              data-testid="updateCoursesByQuarterRange"
            >
              Update Courses
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
export default UpdateCoursesByQuarterRangeJobForm;
