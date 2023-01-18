import { Outlet, NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import facade from "../facades/apiFacade";
import { useEffect, useState } from 'react'

function Header() {
  const [log, setLog] = useState("Login");
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState("user");
  
  useEffect(() => {
    if (facade.getToken() !== null) {
      facade.getUserFromToken(setLog, setRole)
    }
  }, [isLoggedIn, role])
  
  useEffect(() => {
    if (log === "Login") {
      setIsLoggedIn(false)
      setRole(facade.getRole());
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
          <Nav.Link as={NavLink} to="/matches">Matches</Nav.Link>
          {/* <Nav.Link as={NavLink} to="/createacc">Create Account</Nav.Link> */}
          {role==="admin" ? (<Nav.Link as={NavLink} to="/adminPage">Admin page</Nav.Link>) : (<></>)}
          {role==="player" ? (<Nav.Link as={NavLink} to="/MyMatches">My matches</Nav.Link>) : (<></>)}
          <Nav.Link as={NavLink} to="/login">{log}</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
      <Outlet context={{setLog}} />
    </>
    );
}

export default Header;
