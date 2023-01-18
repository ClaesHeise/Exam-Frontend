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
        facade.getAllUsers("player", 0).then(data => setUserNames(data));
      },[]);
    console.log(facade.getAllUsers("admin"));

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
                    <Container key={name}>
                    <Row>
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
    phone: "",
    email: "",
    roles: ["player"]
  }

  const [newUser, setNewUser] = useState(initUser);

  const performAdd = (evt) => {
    evt.preventDefault();
    facade.createUser(newUser.username, newUser.password, newUser.phone, newUser.email, newUser.roles);
    setNewUser(initUser);
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
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Enter phone nr."/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>E-mail</Form.Label>
            <Form.Control type="email" placeholder="Enter email"/>
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function CreateMatch(){
  
  const initMatch = {
    opponentTeam: "",
    judge: "",
    type: "",
    inDoors: false
  }

  const [newMatch, setNewMatch] = useState(initMatch);

  const performAdd = (evt) => {
    evt.preventDefault();
    facade.createMatch(newMatch.opponentTeam, newMatch.judge, newMatch.type, newMatch.inDoors);
    setNewMatch(initMatch);
  }

  const onChange = (evt) => {
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setNewMatch({...newMatch,[evt.target.id]: value});
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="opponentTeam">
            <Form.Label>Opponent team</Form.Label>
            <Form.Control type="text" placeholder="Enter teams"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="judge">
            <Form.Label>Judge</Form.Label>
            <Form.Control type="text" placeholder="Enter judge name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" placeholder="Enter type"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="inDoors">
            <Form.Check type="checkbox" label="In-doors" />
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function CreateLocation(){
  
  const initLocation = {
    address: "",
    city: "",
  }

  const [newLocation, setNewLocation] = useState(initLocation);

  const performAdd = (evt) => {
    evt.preventDefault();
    facade.createLocation(newLocation.address, newLocation.city);
    setNewLocation(initLocation);
  }

  const onChange = (evt) => {
    setNewLocation({...newLocation,[evt.target.id]: evt.target.value});
  }

  return(
    <>
      <Container fluid="xxl">
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter address"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter city"/>
          </Form.Group>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export function UpdateMatch(){
  
  const initMatch = {
    id: null,
    opponentTeam: "",
    judge: "",
    type: "",
    inDoors: false,
    users: [],
    location: 0,
  }

  const initMatches = [
    {
      opponentTeam: "nan",
      judge: "nan",
      type: "nan",
      inDoors: false
    }
  ]
  const [matches, setMatches] = useState(initMatches);
  const [newMatch, setNewMatch] = useState(initMatch);
  const [players, setPlayers] = useState([]);
  const [locations, setLocations] = useState(["none"]);
  
  useEffect(() => {
    facade.getAllLocations().then(data => setLocations(data));
    facade.getAllMatches().then(data => setMatches(data));
    facade.getAllUsers("player", 1).then(data => setPlayers(data));
  },[]);

  const performAdd = (evt) => {
    evt.preventDefault();
    facade.updateMatch(newMatch.id, newMatch.opponentTeam, newMatch.judge, newMatch.type, newMatch.inDoors, newMatch.users, newMatch.location);
  }

  const onChange = (evt) => {
    const target = evt.target;
    const value = target.type === "checkbox" || target.type === "radio" ? target.checked : target.value;
    setNewMatch({...newMatch,[evt.target.id]: value});
  }

  const matchAnswer = (evt) => {
    setNewMatch({...newMatch, id: evt.target.value})
  }

  const matchButtonRow = matches.map((ele, index) => {
    return(
    <Col sm="3" key={ele.index}>
      <Container>
        <Button id={""+(index+1)} value={ele.id} onClick={matchAnswer} variant="outline-secondary">{ele.opponentTeam}</Button>
      </Container>
    </Col>
    );
  })

  const locationAnswer = (evt) => {
    setNewMatch({...newMatch, location: evt.target.value});
    console.log(newMatch.location);
  }

  const locationButtonRow = locations.map((ele, index) => {
    return(
    <Col sm="3" key={ele.locationId}>
      <Container>
        <Button id={""+(index+1)} value={ele.locationId} onClick={locationAnswer} variant="outline-secondary">{ele.address}</Button>
      </Container>
    </Col>
    );
  })

  const playerAnswer = (evt) => {
    newMatch.users.push(evt.target.value);
    setNewMatch({...newMatch, users: newMatch.users});
  }

  const playerButtonRow = players.map((ele, index) => {
    return(
    <Col sm="3" key={ele.id}>
      <Container>
        <Button id={""+(index+1)} value={ele.id} onClick={playerAnswer} variant="outline-secondary">{ele.username}</Button>
      </Container>
    </Col>
    );
  })

  return(
    <>
      <Container fluid="xxl">
      <h2>Pick the match</h2>
      <Container as={Row}>
        {matchButtonRow}
      </Container>
      <br />
      <p>Match picked: {newMatch.id}</p>
      <br />
      <h2>Input info</h2>
        <Form onChange={onChange} >
          <Form.Group className="mb-3" controlId="opponentTeam">
            <Form.Label>Opponent team</Form.Label>
            <Form.Control type="text" placeholder="Enter teams"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="judge">
            <Form.Label>Judge</Form.Label>
            <Form.Control type="text" placeholder="Enter judge name"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" placeholder="Enter type"/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="inDoors">
            <Form.Check type="checkbox" label="In-doors" />
          </Form.Group>
          <br />
          <h2>Add location</h2>
          <Container as={Row}>
            {locationButtonRow}
          </Container>
          <br />
          <p>Picked location: {newMatch.location}</p>
          <h2>Add players</h2>
          <Container as={Row}>
            {playerButtonRow}
          </Container>
          <br/>
          <Container as={Row}>
            <Col sm="3">
              <Container>
                <p>Players added: </p>
              </Container>
            </Col>
            {newMatch.users.map((ele, index) => 
              <Col key={index} sm="1">
                <Container>
                  <p>{ele}</p>
                </Container>
              </Col>
            )}
          </Container>
          <br/>
          <Button onClick={performAdd} variant="primary" type="button">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default function AdminPage() {

  const initObject = {
    viewCreateUser: false,
    viewUpdate: false,
    viewDelete: false,
    viewCreateMatch: false,
    viewCreateLocation: false,
    viewUpdateMatch: false,
  }

  const [viewObject, setViewObject] = useState(initObject);


  const opposite = (evt) => {
    const id = evt.target.id;
    if(id === "viewCreateUser"){
      setViewObject({...viewObject,[id]: !viewObject.viewCreateUser});
    }
    else if(id === "viewUpdate"){
      setViewObject({...viewObject,[id]: !viewObject.viewUpdate});
    }
    else if(id === "viewDelete"){
      setViewObject({...viewObject,[id]: !viewObject.viewDelete});
    }
    else if(id === "viewCreateMatch"){
      setViewObject({...viewObject,[id]: !viewObject.viewCreateMatch});
    }
    else if(id === "viewCreateLocation"){
      setViewObject({...viewObject,[id]: !viewObject.viewCreateLocation});
    }
    else if(id === "viewUpdateMatch"){
      setViewObject({...viewObject,[id]: !viewObject.viewUpdateMatch});
    }
  }

  return (
    <Container fluid="xxl">
      <br/>
      <Container fluid>
        <h3>Admin page</h3>
      </Container>
      <br/>
      <Container as={Row}>
      <Col sm="3">
          <Container >
            {viewObject.viewCreateUser ? (
              <Button id="viewCreateUser" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close create</Button>
            ) : 
            (
              <Button id="viewCreateUser" onClick={opposite} as={NavLink} to="createAccount" variant="outline-secondary">Create account</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
          {viewObject.viewUpdate ? (
              <Button id="viewUpdate" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close update</Button>
            ) : 
            (
              <Button id="viewUpdate" onClick={opposite} as={NavLink} to="updateAccount" variant="outline-secondary">Update account</Button>
            )}
          </Container>    
        </Col>
        <Col sm="3">
        <Container >
        {viewObject.viewDelete ? (
          <Button id="viewDelete" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close delete</Button>
        ) : 
        (
          <Button id="viewDelete" onClick={opposite} as={NavLink} to="deleteAccount" variant="outline-secondary">Delete account</Button>
        )}
        </Container>
        </Col>
        <Col sm="3">
          <Container >
            {viewObject.viewCreateMatch ? (
              <Button id="viewCreateMatch" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close create</Button>
            ) : 
            (
              <Button id="viewCreateMatch" onClick={opposite} as={NavLink} to="createMatch" variant="outline-secondary">Create matches</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
            {viewObject.viewCreateLocation ? (
              <Button id="viewCreateLocation" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close create</Button>
            ) : 
            (
              <Button id="viewCreateLocation" onClick={opposite} as={NavLink} to="createLocation" variant="outline-secondary">Create location</Button>
            )} 
          </Container>
        </Col>
        <Col sm="3">
          <Container >
            {viewObject.viewUpdateMatch ? (
              <Button id="viewUpdateMatch" onClick={opposite} as={NavLink} to="" variant="outline-secondary">Close update</Button>
            ) : 
            (
              <Button id="viewUpdateMatch" onClick={opposite} as={NavLink} to="updateMatch" variant="outline-secondary">Update matches</Button>
            )} 
          </Container>
        </Col>
      </Container>
      <br />
      <br />
      <Outlet />
    </Container>
  )
}
