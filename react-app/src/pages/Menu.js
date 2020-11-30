import React, { Component } from 'react';
import Cookies from 'universal-cookie';
// import * as Values from '../constants/constants'
// import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';

const cookies = new Cookies();

class Menu extends Component {
    
    
    cerrarSesion=()=>{
        cookies.remove('token', {path: "/"});
        window.location.href='./';
    }

    componentDidMount() {
        if(!cookies.get('token')){
            window.location.href="./";
        }
    }

    // getUsers(){

    //     fetch(GETUSERS, {
    //         method: 'POST',
    //         headers: {
    //           // "Content-Type": "application/json; charset=utf-8",
    //           "Content-Type": "application/x-www-form-urlencoded",
    //           "Authorization": "Bearer"+cookies.get('token'),
    //         },
    //         body: formData.toString(),
    //       })
    //         .then(response => response.json())
    //         .then(response => {
    //           console.log(response);
    //           cookies.set('token', response.token, {path: "/"});
    //           window.location.href="./menu";
    //           // this.setState({ postId: data.id });
      
    //         },
    //           (error) => {
    //             console.log(error);
      
    //             // this.setState({
    //             //   isLoaded: true,
    //             //   error
    //             // });
    //           }
      
    //         );

    // }

    render() {
        console.log('token: '+ cookies.get('token'));
       
        return (
            <div>
                
                
                        <img
                            src="data:image/png;base64,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"
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    

                
                Menu Principal

                <br />
                <button style={{float: 'right'}}
                onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}
// const GETUSERS = Values.GETUSERS;
export default Menu;