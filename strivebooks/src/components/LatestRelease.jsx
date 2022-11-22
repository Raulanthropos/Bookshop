import { Component } from 'react'
import { Container, Row, Col, Carousel } from 'react-bootstrap'
import horror from '../data/horror.json'

class LatestRelease extends Component {

  state = {
    selectedHorror: null,
  }

  render() {
    return (
      <Container>
        <Row className="justify-content-center mt-3">
          {/* this is the same thing as writing <div className="col col-xs-12 col-md-6"> */}
          <Col xs={12} md={6} className="text-center">
            <h1>Welcome to Fantasy Books!</h1>
            <h3>Check out our amazing collection!</h3>
            <Carousel interval={9999999}>
              {horror.map((fantasia) => (
                <Carousel.Item key={fantasia.asin}>
                  <img
                    className="d-block w-100"
                    src={fantasia.img}
                    alt={fantasia.title}
                    onClick={() => {
                      this.setState({
                        selectedHorror: fantasia,
                      })
                    }}
                  />
                  <Carousel.Caption>
                    <h3 className='font-weight-bolder'>{fantasia.title}</h3>
                    <p className='font-weight-bolder'>{fantasia.price}$</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default LatestRelease;