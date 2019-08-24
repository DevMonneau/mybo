import React, { Component } from 'react';
import {Row, Col, Card, CardBody} from 'reactstrap';

class Clients extends Component {
  componentDidMount() {
    console.log("toto");
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                toto
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Clients;
