import React, { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom";
import facade from "../facades/apiFacade";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function PrimaryContent({ createAccount }) {
  const init = { username: "", password: "" };
  const [accCredentials, setAccCredentials] = useState(init);

  const performCreation = (evt) => {
    evt.preventDefault();
    createAccount(accCredentials.username, accCredentials.password);
  }

  const onChange = (evt) => {
    setAccCredentials({ ...accCredentials,[evt.target.id]: evt.target.value })
  }

  return (
    <Container fluid="xxl">
      <h2>Create account</h2>
      <Form onChange={onChange} >
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter user name"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password"/>
        </Form.Group>
        <Button onClick={performCreation} variant="primary" type="button">
          Create account
        </Button>
      </Form>
    </Container>
  );
}

export default function CreateAcc() {

  const [content, setContent] = useState(<h4>Loading...</h4>);
  let navigate = useNavigate();

  useEffect(() => {
    if(!facade.getLog()){
      setContent(<PrimaryContent createAccount={createAccount} />);
    }
    else{
      setContent(<div>
        <h4>You are already logged into an account</h4>
        <p>Please log out of your account, before creating a new one</p>
      </div>);
    }
  },[])

  const createAccount = async (user, pass) => {
    setContent(<h4>Loading content...</h4>);
    await facade.createUser(user, pass);
    navigate("/");

  }
 
  return (
    <>
    <Container fluid="xxl">
      {content} 
    </Container>
    </>
  )
}