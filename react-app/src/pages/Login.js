// import logo from './logo.svg';
// import './App.css';
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "../styles/login.css";
import React, { useState } from "react";
import * as Values from '../constants/constants'
import Cookies from 'universal-cookie';
import md5 from 'md5';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const cookies = new Cookies();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

//   function handleSubmit(event) {
//     event.preventDefault();
//   }

  function login () { 

    const formData = new URLSearchParams();
    formData.append('mail', email);
    formData.append('password', md5(password));


    fetch(LOGIN, {
      method: 'POST',
      headers: {
        // "Content-Type": "application/json; charset=utf-8",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.ok);


          cookies.set('token', response.token, { path: "/" });
          cookies.set('mail', email, { path: "/" });
          // toast.success('accediendo..');
          
          window.location.href = "./menu";
          // this.setState({ postId: data.id });
        

      },
        (error) => {
          // console.log(error);
          toast.error('Usuario/Contraseña invalido');

          // this.setState({
          //   isLoaded: true,
          //   error
          // });
        }

      );

  }

    return (
        <div className="containerPrincipal">
                           <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />

            <div className="containerSecundario">
                <div className="form-group">
                    <label>email: </label>
                    <br />
                    <input
                        type="email"
                        autoFocus
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <label>Contraseña: </label>
                    <br />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button className="btn btn-primary"
                        disabled={!validateForm()}
                        onClick={() => login()}>Iniciar Sesión</button>
                </div>
            <ToastContainer 
                position='bottom-center'
                />
            </div>





        </div>

        

    );
}
const LOGIN = Values.LOGIN;
export default App;
