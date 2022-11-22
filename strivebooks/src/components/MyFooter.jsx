import React from "react";
import { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";

class MyFooter extends Component {
    render() {
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
}


export default MyFooter;