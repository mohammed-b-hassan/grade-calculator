import React, { useState, useEffect } from "react";
import {
  Container,
  ButtonGroup,
  Button,
  Jumbotron,
  Alert,
  InputGroup,
  FormControl,
  ListGroup,
  Row,
  Form,
} from "react-bootstrap";
import "./App.css";
// custom components

import InputField from "./components/InputField";
import _ from "lodash";

const App = () => {
  const [data, setData] = useState([
    { hour: "", grade: "", prevGrade: "", removed: false },
  ]);
  const [result, setResult] = useState("");
  const [prevAvrage, setPrevAvrage] = useState("");
  const [prevHours, setPrevHours] = useState("");

  const [addState, setAddState] = useState(true);

  const calculateHandler = (e) => {
    e.preventDefault();
    let currentGrades = 0;
    let currentHours = 0;
    let totalHours = 0;
    let totalGrades = 0;
    let totalPrevGrades = 0;
    let prevGrade = 0;

    data.map((v, i) => {
      if (v.removed) return;

      currentGrades += parseInt(v.grade) * parseInt(v.hour);
      currentHours += parseInt(v.hour);
      prevGrade = v.prevGrade;

      if (parseInt(prevGrade).isFinite) totalPrevGrades += currentGrades;
    });

    totalHours = parseInt(currentHours) + parseInt(prevHours);
    totalGrades =
      currentGrades +
      parseInt(prevAvrage) * parseInt(prevHours) -
      totalPrevGrades;

    let result = totalGrades / totalHours;
    // setResult(result);
    setResult(_.ceil(result, 2));
    // setResult(result.toFixed(2));
    // setResult(roundedToFixed(result, 2));
    // setResult(Math.round(((totalGrades / totalHours) * 100) / 100));
    // setResult(round(totalGrades / totalHours, 2));
  };

  const resetHandler = () => {
    setData([{ hour: "", grade: "", prevGrade: "", removed: false }]);
    setResult("");
    setPrevAvrage("");
    setPrevHours("");
    setAddState(true);
  };

  const roundedToFixed = (input, digits) => {
    var rounded = Math.pow(10, digits);
    return (Math.round(input * rounded) / rounded).toFixed(digits);
  };

  const addInputHandler = () => {
    if (data.length > 7) return setAddState(false);
    setData([...data, { hour: "", grade: "", prevGrade: "", removed: false }]);
  };

  const inputs = data.map((v, i) => {
    return (
      <Row className="justify-content-md-center" key={i}>
        <ListGroup.Item>
          <InputField id={i} data={data} setData={setData} />
        </ListGroup.Item>
      </Row>
    );
  });

  // console.log(data);

  return (
    <>
      <Jumbotron style={{ textAlign: "center" }}>
        <h1> حساب المعدل التراكمي المتوقع </h1>
        <br />
        <h3> برنامج حساب المعدل التراكمي المتوقع للطلبة </h3>
      </Jumbotron>

      <Container>
        <InputGroup className="mb-3" size="sm">
          <FormControl
            required
            type="number"
            max="400"
            min="0"
            value={prevHours}
            name="hour"
            placeholder="الساعات المقطوعة"
            onChange={(e) => setPrevHours(e.target.value)}
          />

          <FormControl
            required
            type="number"
            max="100"
            min="0"
            step="0.01"
            value={prevAvrage}
            name="grade"
            placeholder="المعدل الحالي"
            onChange={(e) => setPrevAvrage(e.target.value)}
          />
        </InputGroup>

        {result && (
          <Alert variant="primary" style={{ textAlign: "center" }}>
            <Alert.Heading>
              {" "}
              حسب المعلومات المدخله من قبلك فإن المعدل التراكمي المتوقع سيكون{" "}
            </Alert.Heading>
            <strong className="mb-0"> {result}% </strong>
            <div className="d-flex justify-content-end">
              <Button onClick={resetHandler} variant="outline-primary">
                Reset
              </Button>
            </div>
          </Alert>
        )}

        <Form onSubmit={calculateHandler}>
          <ListGroup variant="flush">{inputs}</ListGroup>

          <div className="center ">
            <ButtonGroup>
              <Button type="submit" variant="primary" size="sm" active>
                حساب
              </Button>
              {addState && (
                <Button
                  onClick={addInputHandler}
                  variant="secondary"
                  size="sm"
                  active
                >
                  اضافة مادة
                </Button>
              )}
            </ButtonGroup>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default App;
