import React,{useState,useEffect} from 'react';
import {
  Navbar,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Col
} from 'reactstrap';

const Header = (props) => {
    const [{page,totalPages},setPage]=useState({page:1,totalPages:Infinity});
    useEffect(()=>{
      if (props.page && props.totalPages){
        setPage({page:props.page,totalPages:props.totalPages});
      }
    },[props]);
    function handleSelect(values){
        props.handleSubmit(values.target.value);
    }
    function handleInput(values){
        props.handleSearch(values.target.value);
    }
    return (
    <>
      <Navbar className="bottom-shadow" color="white" light expand="md" fixed="top">
            <Container>
                <Col xs="10" sm="11">
                  <Form className="form-inline" onSubmit={e=>{e.preventDefault();}}>
                  <FormGroup className="mr-3">
                      <Label for="type" className="mr-2">Data type</Label>
                      <Input value={props.selected} type="select" name="type" id="type" onChange={(values)=>handleSelect(values)}>
                      <option>Restaurant</option>
                      <option>Neighborhood</option>
                      </Input>
                  </FormGroup>
                  <FormGroup>
                      <Label className="mr-2" for="search">Search</Label>
                      <Input onChange={(values)=>handleInput(values)} size="50" type="text" name="search" id="search" placeholder="Type in name, borough, street, building" />
                  </FormGroup>
                  </Form>
                </Col>
                <Col xs="2" sm="1">{page}/{totalPages}</Col>
            </Container>
      </Navbar>
    </>
  );
}

export default Header;