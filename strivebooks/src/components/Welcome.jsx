import React from 'react';
import { Container, Jumbotron } from "react-bootstrap";

function Welcome() {
    return (
      <div>
        <Jumbotron fluid className="styleContrast styleOverlay">
          <Container>
            <h1 className="text-dark">Welcome! Our book store is now open for business!</h1>
            <p className="text-dark">
              Hello, hello! Here! Books, old and new!
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }

export default Welcome;