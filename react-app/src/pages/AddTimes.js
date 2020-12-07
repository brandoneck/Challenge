import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import * as Values from '../constants/constants'
// import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import Table from 'react-bootstrap/Table';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
            dataCursos: [],
            dataTiempos: [],
            selectedNameCurso: '',
            selectedDay: 0,
            selectedHour: 0,
            selectedMinute: 0,
            typeCurso:'',
            nameUsuario: '',
        };
        
        this.handleCursosChange = this.handleCursosChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
        this.handleNUsuarioChange = this.handleNUsuarioChange.bind(this);
    }

    cerrarSesion = () => {
        cookies.remove('token', { path: "/" });
        window.location.href = './';
    }

    componentDidMount() {
        if (!cookies.get('token')) {
            window.location.href = "./";
        }
        this.getUsers();
        this.getCursos();
        this.getTiempos();
    }

    getUsers() {

        fetch(USERS, {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + cookies.get('token'),
            },
            // body: formData.toString(),
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dataUser: response,
                });
                console.log(this.state.dataUser);
                //   cookies.set('token', response.token, {path: "/"});
                //   window.location.href="./menu";
                // this.setState({ postId: data.id });

            },
                (error) => {
                    console.log(error);

                    // this.setState({
                    //   isLoaded: true,
                    //   error
                    // });
                }

            );
    }

    getCursos() {

        fetch(CURSOS, {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + cookies.get('token'),
            },
            // body: formData.toString(),
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dataCursos: response,
                });
                console.log(this.state.dataCursos);
                //   cookies.set('token', response.token, {path: "/"});
                //   window.location.href="./menu";
                // this.setState({ postId: data.id });

            },
                (error) => {
                    console.log(error);

                    // this.setState({
                    //   isLoaded: true,
                    //   error
                    // });
                }

            );
    }
    getTiempos() {

        fetch( TIEMPOS, {
            method: 'POST',
            headers: {
                // "Content-Type": "application/json; charset=utf-8",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer " + cookies.get('token'),
            },
            // body: formData.toString(),
        })
            .then(response => response.json())
            .then(response => {
                this.setState({
                    dataTiempos: response,
                });
                console.log(this.state.dataTiempos);
                //   cookies.set('token', response.token, {path: "/"});
                //   window.location.href="./menu";
                // this.setState({ postId: data.id });

            },
                (error) => {
                    console.log(error);

                    // this.setState({
                    //   isLoaded: true,
                    //   error
                    // });
                }

            );
    }
    buildHoursOptions() {
        var arr = [];

        for (let i = 0; i <= 23; i++) {
            arr.push(<option key={i} label={i} value={i}></option>)
        }
        return arr;
    }
    buildMinutesOptions() {
        var arr = [];

        for (let i = 0; i <= 59; i++) {
            arr.push(<option key={i} label={i} value={i}></option>)
        }
        return arr;
    }
    handleCursosChange(e) {
        this.setState({ selectedNameCurso: e.target.value }, () => {
            for (var i = 0; i < this.state.dataCursos.length; i++) {
                if (this.state.dataCursos[i].nombreCurso === this.state.selectedNameCurso) {
                    this.setState({ typeCurso: this.state.dataCursos[i].tipoEntrenamiento });
                }
            }
        });

    }
    handleDayChange(e) {
        this.setState({ selectedDay: e.target.value });
    }
    handleHourChange(e) {
        this.setState({ selectedHour: e.target.value });
    }
    handleMinuteChange(e) {
        this.setState({ selectedMinute: e.target.value });
    }
    handleNUsuarioChange(e){
        this.setState({ nameUsuario: e.target.value });
    }
    addCurso() {
        if (this.state.nameUsuario.length > 0) {
            if (this.state.selectedNameCurso.length > 0) {
                if (this.state.selectedDay > 0 || this.state.selectedHour > 0 || this.state.selectedMinute > 0 ) {

                    const formAddCurso = new URLSearchParams();
                    formAddCurso.append('nombreUsuario', this.state.nameUsuario);
                    formAddCurso.append('tipoCurso', this.state.typeCurso);
                    formAddCurso.append('dias', this.state.selectedDay);
                    formAddCurso.append('horas', this.state.selectedHour );
                    formAddCurso.append('minutos', this.state.selectedMinute);
                    formAddCurso.append('nombreCurso', this.state.selectedNameCurso);

                    fetch(NEWTIMES, {
                        method: 'POST',
                        headers: {
                            // "Content-Type": "application/json; charset=utf-8",
                            "Content-Type": "application/x-www-form-urlencoded",
                            "Authorization": "Bearer " + cookies.get('token'),
                        },
                        body: formAddCurso.toString(),
                    })
                        .then(response => response.json())
                        .then(response => {
                            
                            console.log(response);
                            //   cookies.set('token', response.token, {path: "/"});
                            //   window.location.href="./menu";
                            // this.setState({ postId: data.id });
                            this.componentDidMount();
                            toast.success('Se guardaron tus datos correctamente!');

                        },
                            (error) => {
                                console.log(error);

                                // this.setState({
                                //   isLoaded: true,
                                //   error
                                // });
                                toast.error(error);
                            }

                        );

                }
                else{
                    // console.log('please select time dates ');
                    toast.error('Captura tu tiempo');
                }
            }
            else {
                // console.log('Selecciona nombre del curso ');
                toast.error('Selecciona nombre del curso');
            }
        }
        else {
            // console.log('Selecciona nombre de usuario ');
            toast.error('Selecciona nombre de usuario');
        }
    }

    submit = () => {
        confirmAlert({
          title: 'Estás seguro de enviar éstos datos?',
          message: 'Revisa que los valores sean correctos.',
          buttons: [
            {
              label: 'Yes',
            //   onClick: () => alert('Click Yes')
            onClick: () => this.addCurso()
            },
            {
              label: 'No',
            //   onClick: () => alert('Click No')
            }
          ]
        });
      };
    

    render() {
        // console.log('token: ' + cookies.get('token'));


        return (
            <div >
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <h1 class="text-center">Añadir curso</h1>
                <Table striped bordered hover size="sm"  >
                    <thead>
                        <tr>
                            <th>Nombre usuario</th>
                            <th>Tipo Curso</th>
                            <th>Días</th>
                            <th>Horas</th>
                            <th>Minutos</th>
                            <th>Nombre del curso</th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <td>




                                <select id="dropdown"

                                    value={this.state.nameUsuario}
                                    onChange={this.handleNUsuarioChange}
                                    className="form-control"
                                >
                                    <option value={''}>--</option>
                                    {this.state.dataUser.map((du) => (
                                        <option key={du._id} label={du.nombre} value={du.nombre}></option>
                                    ))
                                    }
                                </select>

                            </td>
                            <td>
                                <input type="text"
                                    value={this.state.typeCurso}
                                    className="form-control"
                                    disabled={true}
                                    ref={this.tipoEnt} />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    min="0"
                                    onChange={this.handleDayChange}
                                    className="form-control"
                                    value={this.state.selectedDay}
                                />
                            </td>
                            <td>
                                <select id="dropdown"
                                    value={this.state.selectedHour}
                                    className="form-control"
                                    onChange={this.handleHourChange}
                                >
                                    {/* <option value={0}>0</option> */}
                                    {this.buildHoursOptions()}
                                </select>
                            </td>
                            <td>
                                <select id="dropdown"
                                    value={this.state.selectedMinute}
                                    className="form-control"
                                    onChange={this.handleMinuteChange}
                                >
                                    {this.buildMinutesOptions()}
                                </select>

                            </td>
                            <td>
                                <select id="dropdown"
                                    className="form-control"

                                    // onChange={() => this.handleChange}
                                    value={this.state.selectedNameCurso}
                                    onChange={this.handleCursosChange}
                                >
                                    <option value={''}>--</option>
                                    {this.state.dataCursos.map((dc) => (
                                        <option key={dc._id} label={dc.nombreCurso} value={dc.nombreCurso}></option>
                                    ))
                                    }
                                </select>
                            </td>
                        </tr>

                    </tbody>
                </Table>

                <br />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >

                    {/* <button style={{ float: 'center' }}
                        onClick={()=> this.submit() }
                        
                        >Añadir</button> */}
                    <button className="btn btn-primary" onClick={() => { if (window.confirm('Estás seguro de mandar éstos datos?')) this.addCurso() }}>
                        Añadir
                        </button>

                </div>





                <ToastContainer
                    position='bottom-center'
                />
            </div>
        );
    }
}
const NEWTIMES = Values.NEWTIMES;
export default Menu;


