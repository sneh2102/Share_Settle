import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Form, Button } from "react-bootstrap";
import { Multiselect } from "multiselect-react-dropdown";
import Select from "react-select";
import { useState } from "react";
import "./GroupCreation.css";

const GroupCreation = () => {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const names = [
    { name: "Krisha" },
    { name: "Sneh" },
    { name: "Jeet" },
    { name: "Priyatam" },
  ];
  const period = ["Weekly", "Biweekly", "30 Days"].map((periodLength) => ({
    label: periodLength,
  }));

  return (
    <div className="background">
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Card style={{ width: "30rem" }}>
          <Card.Body>
            <Card.Title className="text-center mb-4">Group Creation</Card.Title>
            <Form>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Members</Form.Label>
                <Multiselect
                  options={names}
                  displayValue="name"
                  onSelect={(selectedList) => setSelectedMembers(selectedList)}
                  onRemove={(selectedList) => setSelectedMembers(selectedList)}
                  selectedValues={selectedMembers}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formMessage">
                <Form.Label>Settlement Period</Form.Label>
                <Select
                  options={period}
                  placeholder="Select a settlement period"
                />
              </Form.Group>

              <Button className="button-color" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default GroupCreation;
