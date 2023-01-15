import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import facade from "../facades/apiFacade";
import { useEffect, useState } from 'react'

function Header() {
  const [log, setLog] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  useEffect(() => {
    if (facade.getToken() !== null) {
      facade.getUserFromToken(setLog)
    }
  }, [isLoggedIn])
  
  useEffect(() => {
    if (log === "Login") {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  }, [log])

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={NavLink} to ="/"> Programming exam!</Navbar.Brand>
        <Nav>
          <Nav.Link as={NavLink} to="/scoreboard">Table page</Nav.Link>
          {/* <Nav.Link as={NavLink} to="/createacc">Create Account</Nav.Link> */}
          {isLoggedIn ? (<Nav.Link as={NavLink} to="/adminPage">Admin page</Nav.Link>) : (<></>)}
          <Nav.Link as={NavLink} to="/login">{log}</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Outlet context={{setLog}} />
    </>
    );
}

export default Header;
