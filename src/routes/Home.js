import facade from "../facades/apiFacade";
import React, { useState,useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


const Home = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(facade.getLog())
  const [user, setUser] = useState(facade.getUser);

  // useEffect(() => {
  //   if (facade.getToken() !== null) {
  //     setUser(facade.getUser);
  //   }
  // }, [isLoggedIn])

  // useEffect(() => {
  //   if (user === "No user") {
  //     setIsLoggedIn(false)
  //   } else {
  //     setIsLoggedIn(true)
  //   }
  // }, [user])

  // // Checkbox / Togglebutton example
  // const checkbox = jokes.map((ele) =>
  // <ToggleButton key={ele.name} id={ele.name} value={ele.name} variant={'outline-danger'}>
  //   {ele.joke}
  // </ToggleButton>
  // )

  return (
    <Container fluid>
      <p>Logged in as : {user}</p>
      <br />
      {isLoggedIn ? 
      ( 
        <Container fluid>
          <h2>You are logged in</h2>
        </Container>
      ) : 
      (
        <Container fluid>
          <h2>Not logged in</h2>
        </Container>
      )}
    </Container>
  )
}

export default Home