import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyFooter = () => {
  return (
    <Container className="bg-dark text-white w-100">
        <Row>
            <Col>
                <h2>This is a Footer!</h2>
                <p>This footer contains footer content.</p>
            </Col>
        </Row>
    </Container>
  );
}

export default MyFooter;