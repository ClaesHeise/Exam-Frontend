import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import facade from "../facades/apiFacade";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Matches = () => {
  const init = [
    {
      opponentTeam: "nan",
      judge: "nan",
      type: "nan",
      inDoors: false
    }
  ]
  const [matches, setMatches] = useState(init);
  const [locations, setLocations] = useState([{locationId: 0, address: "none"}]);
  
  useEffect(() => {
    facade.getAllLocations().then(data => setLocations(data));
    facade.getAllMatches().then(data => setMatches(data));
  },[]);

  // Mapper
  const tableRow = matches.map((ele, index) =>
    <tr key={ele.opponentTeam}>
      <td>{index+1}</td>
      <td>{ele.opponentTeam}</td>
      <td>{ele.judge}</td>
      <td>{ele.type}</td>
      <td>{ele.inDoors ? ("Inside") : ("Not inside")}</td>
    </tr>
  )
  const handleSubmit = (evt) => {
    facade.getAllMatchesOnLocation(evt.target.value).then(data => setMatches(data));
  }

  const getAll = () => {
    facade.getAllMatches().then(data => setMatches(data));
  }

  const buttonRow = locations.map((ele, index) => {
    return(
    <Col sm="3" key={ele.locationId}>
      <Container>
        <Button id={""+(index+1)} value={ele.address} onClick={handleSubmit} variant="outline-secondary">{ele.address}</Button>
      </Container>
    </Col>
    );
  })

  return (
    <Container fluid>
      <Table striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Opponent Team</th>
              <th>Judge</th>
              <th>Type</th>
              <th>In doors</th>
            </tr>
          </thead>
          <tbody>
            {tableRow}
          </tbody>
      </Table>
      <br/>
      <Container as={Row}>
        <Col sm="3">
          <Container>
            <Button id="0" onClick={getAll} variant="outline-secondary">Get all matches</Button>
          </Container>
        </Col>
        {buttonRow}
      </Container>
    </Container>
  )
}

export default Matches