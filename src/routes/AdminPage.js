import React, { useState,useEffect } from "react"
import facade from "../facades/apiFacade"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Outlet, NavLink, } from 'react-router-dom'
import { ButtonGroup } from "react-bootstrap";

export function UpdateAccount(){

  const [newPassword, setNewPassword] = useState("");

  const performChange = (evt) => {
    evt.preventDefault();
    facade.updatePassword(newPassword);
    console.log(newPassword);
    // Insert so it updates password, on db
  }

  const onChange = (evt) => {
    setNewPassword(evt.target.value);
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>New password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"/>
          </Form.Group>
          <Button onClick={performChange} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function DeleteAccount(){
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        facade.getAllUsers("admin", 0).then(data => setUserNames(data));
      },[]);
    console.log(facade.getAllUsers("admin"));

    // useEffect(() => {
    //     setUserNames(facade.getAllUsers());
    // }, [])

    const perfromDelete = (evt) => {
        evt.preventDefault();
        facade.deleteUser(evt.target.value)
        .then(res => {
            if(!res.code) {
                const newUserNames = [...userNames];
                const index = newUserNames.indexOf(evt.target.value);
                if(index > -1) {
                    newUserNames.splice(index, 1);
                    setUserNames(newUserNames);
                }
            }
        })
    }

    return(
        <Container>
            {userNames.map(name => {
                return(
                    <Container>
                    <Row key={name}>
                        <ButtonGroup>
                            <Button disabled variant="secondary" style={{"width": "100%"}}>{name}</Button>
                            <Button variant="danger" value={name} onClick={perfromDelete}>Delete</Button>
                        </ButtonGroup>
                    </Row>
                    <br />
                    </Container>
                )
            })}
        </Container>
    )
}

export function CreateAccount(){
  
  const initUser = {
    username: "",
    password: "",
    roles: ["admin"]
  }

  const [newUser, setNewUser] = useState(initUser);

  const performAdd = (evt) => {
    evt.preventDefault();
    // viewTeacher(false);
    facade.createUser(newUser.username, newUser.password, newUser.roles);
    console.log(newUser); //Delete
    // Insert so it updates teacher, on db
    // like so -> createAccount = facade.createUser(user, pass);
    //createAccount(newTeacher.username, newTeacher.password);
  }

  const onChange = (evt) => {
    setNewUser({...newUser,[evt.target.id]: evt.target.value});
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter user name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password"/>
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default function AdminPage() {
  // const [viewPass, setViewPass] = useState(false);
  // const [viewTopic, setViewTopic] = useState(false);
  // const [viewTeacher, setViewTeacher] = useState(false);

  const initObject = {
    // viewPass: false,
    // viewTopic: false,
    // viewTeacher: false,
    // viewCalculator: false,
    // viewCalculatorList: false
    viewCreate: false,
    viewUpdate: false,
    viewDelete: false
  }

  const [viewObject, setViewObject] = useState(initObject);


  const opposite = (evt) => {
    // console.log(evt.target.id);
    const id = evt.target.id;
    // if(id === "viewPass"){
    //   setViewObject({...viewObject,[id]: !viewObject.viewPass});
    // }
    // else if(id === "viewTopic"){
    //   setViewObject({...viewObject,[id]: !viewObject.viewTopic});
    // }
    // else if(id === "viewTeacher"){
    //   setViewObject({...viewObject,[id]: !viewObject.viewTeacher});
    // }
    // else if(id === "viewCalculatorList"){
    //   setViewObject({...viewObject,[id]: !viewObject.viewCalculatorList});
    // }
    // else{
    //   setViewObject({...viewObject,[id]: !viewObject.viewCalculator});
    // }
    if(id === "viewCreate"){
      setViewObject({...viewObject,[id]: !viewObject.viewPass});
    }
    else if(id === "viewUpdate"){
      setViewObject({...viewObject,[id]: !viewObject.viewTopic});
    }
    else if(id === "viewDelete"){
      setViewObject({...viewObject,[id]: !viewObject.viewTeacher});
    }
  }

  return (
    <Container fluid="xxl">
      <br/>
      <Container fluid>
        <h3>Teacher page</h3>
      </Container>
      <br/>
      <Container as={Row}>
      <Col sm="3">
          <Container >
            {viewObject.viewPass ? (
              <Button id="viewCreate" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close create</Button>
            ) : 
            (
              <Button id="viewCreate" onClick={opposite} as={NavLink} to="createAccount" variant="outline-secondary">Create account</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
          {viewObject.viewTopic ? (
              <Button id="viewUpdate" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close update</Button>
            ) : 
            (
              <Button id="viewUpdate" onClick={opposite} as={NavLink} to="updateAccount" variant="outline-secondary">Update account</Button>
            )}
          </Container>    
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewTeacher ? (
          <Button id="viewDelete" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close delete</Button>
        ) : 
        (
          <Button id="viewDelete" onClick={opposite} as={NavLink} to="deleteAccount" variant="outline-secondary">Delete account</Button>
        )}
        </Container>
        </Col>
        {/* <Col sm="3">
          <Container >
            {viewObject.viewPass ? (
              <Button id="view" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close password</Button>
            ) : 
            (
              <Button id="viewPass" onClick={opposite} as={NavLink} to="changepw" variant="outline-secondary">Change password</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
          {viewObject.viewTopic ? (
              <Button id="viewTopic" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new topic</Button>
            ) : 
            (
              <Button id="viewTopic" onClick={opposite} as={NavLink} to="createTopic" variant="outline-secondary">Create new topic</Button>
            )}
          </Container>    
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewTeacher ? (
          <Button id="viewTeacher" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new teacher</Button>
        ) : 
        (
          <Button id="viewTeacher" onClick={opposite} as={NavLink} to="addTeacher" variant="outline-secondary">Create new teacher</Button>
        )}
        </Container>
        </Col> */}
        {/* <Col sm="3">
        <Container >
        {viewObject.viewCalculator ? (
          <Button id="viewCalculator" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close new calculator</Button>
        ) : 
        (
          <Button id="viewCalculator" onClick={opposite} as={NavLink} to="createCalculator" variant="outline-secondary">Create new calculator</Button>
        )}
        </Container>
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewCalculatorList ? (
          <Button id="viewCalculatorList" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close view calculators</Button>
        ) : 
        (
          <Button id="viewCalculatorList" onClick={opposite} as={NavLink} to="calculatorList" variant="outline-secondary">View calculators</Button>
        )}
        </Container>
        </Col> */}
      </Container>
      <br />
      <br />
      <Outlet />
    </Container>
  )
}
