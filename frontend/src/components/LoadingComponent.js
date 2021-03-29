import React from 'react';
import { Container, Row, Col } from 'reactstrap';
const Loading = () => {
    return(
    <Container className="mt-5">
        <Row className="mt-5 h-100 justify-content-center align-items-center" >
          <Col className="mt-5 text-center">Loading . . .</Col>
        </Row>
    </Container>
    );
};
export default Loading;