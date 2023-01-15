import Table from 'react-bootstrap/Table';
import React, { useState,useEffect } from "react";
import facade from "../facades/apiFacade";
import Container from 'react-bootstrap/Container';

const Scoreboard = () => {
  const init = [
    {
      username: "Loading data...",
      role: ["admin"]
    }
  ]
  const [users, setUsers] = useState(init);

  useEffect(() => {
    facade.getAllUsers("admin", 1).then(data => setUsers(data));
  },[]);

  // Mapper
  const tableRow = users.map((ele, index) =>
    <tr key={ele.username}>
      <td>{index+1}</td>
      <td>{ele.username}</td>
      <td>{ele.role}</td>
    </tr>
  )

  return (
    <Container fluid>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {tableRow}
        </tbody>
    </Table>
    </Container>
  )
}

export default Scoreboard