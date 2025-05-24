import Axios from "axios";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Button, Container, Form, ListGroup } from "react-bootstrap";
import "./App.css";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const base_url = "http://localhost:5000/api";

  const fetchAllUsers = async () => {
    const result = await Axios.get(`${base_url}/users`);
    console.log(result);
    setUsers(result.data);
  };

  const createUser = async () => {
    if (!name || !age || !email) return alert("Please fill all fields");
    const result = await Axios.post(`${base_url}/users`, { name, age, email });
    setUsers([...users, result.data]);
  }

  useEffect(() => { fetchAllUsers(); }, []);

  return (
    <Container>
      <h1 className="text-center">User Management</h1>
      <Form className="form">
        <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
        <Form.Control type="text" placeholder="Age" onChange={e => setAge(e.target.value)} />
        <Form.Control type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <Button variant="success" onClick={createUser}>Add User</Button>
      </Form>

      <div className="result">
        {users.map(({ _id, name, age, email }) => (
          <ListGroup>
            <ListGroup.Item className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{name}</div>{email}</div>
              <Badge bg="success" pill>{age}</Badge>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </div>
    </Container>
  );
}