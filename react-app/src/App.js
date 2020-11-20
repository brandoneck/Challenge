// import logo from './logo.svg';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/login.css";
import React, { useState } from "react";
import * as Values from './constants/constants';




function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  function login () { 

    console.log(LOGIN);

    console.log(email);
    console.log(password);

    // fetch(LOGIN+"/"+email+"/"+password)
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       this.setState({
    //         isLoaded: true,
    //         items: result.items
    //       });
    //     },
    //     // Nota: es importante manejar errores aquí y no en 
    //     // un bloque catch() para que no interceptemos errores
    //     // de errores reales en los componentes.
    //     (error) => {
    //       this.setState({
    //         isLoaded: true,
    //         error
    //       });
    //     }

  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" 
        disabled={!validateForm()}
        onClick={ ()=> login() }
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
const LOGIN = Values.LOGIN;
export default App;
