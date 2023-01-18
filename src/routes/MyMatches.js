import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import facade from "../facades/apiFacade";
import Container from 'react-bootstrap/Container';

const MyMatches = () => {
  const init = [
    {
      opponentTeam: "nan",
      judge: "nan",
      type: "nan",
      inDoors: false
    }
  ]
  const [matches, setMatches] = useState(init);

  useEffect(() => {
    facade.getPlayersMatches().then(data => setMatches(data));
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
    </Container>
  )
}

export default MyMatches