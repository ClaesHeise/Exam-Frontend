import React, { useState,useEffect } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";
import facade from "../facades/apiFacade";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
 
  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials,[evt.target.id]: evt.target.value })
  }
 
  return (
    <>
    <Container fluid="xxl">
      <h2>Login</h2>
      <Form onChange={onChange} >
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" placeholder="Enter user name"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password"/>
        </Form.Group>
        <Button onClick={performLogin} variant="primary" type="button">
          Login
        </Button>
      </Form>
    </Container>
    </>
  )
 
}
function LoggedIn( { logout } ) {
  return (
    <>
      <Container fluid="xxl">
        <h4>You're logged in as "{facade.getUser()}"</h4>
        <p>Do you want to sign out?</p>
        <Container className="justify-content-center">
            <Button variant="primary" onClick={logout}>Logout</Button>
        </Container>
      </Container>
    </>
  )
 
}
 
function LoginReturn() {
  const [content, setContent] = useState(<h4>Loading...</h4>);
  let navigate = useNavigate();
  const props = useOutletContext();

  useEffect(() => {
    if(!facade.getLog()){
      setContent(<LogIn login={login} />);
    }
    else{
      setContent(<><LoggedIn logout={logout} /></>);
    }
  },[])

  const logout = async () => {
    await facade.logout();
    props.setLog("Login");
    setContent(<LogIn login={login} />);
  } 
  const login = async (user, pass) => {
    setContent(<h4>Loading content...</h4>);
    await facade.login(user,pass);
    props.setLog("Logout");
    navigate("/");
  } 
 
  return (
    <>
    {content}
    </>
  )
}
export default LoginReturn;