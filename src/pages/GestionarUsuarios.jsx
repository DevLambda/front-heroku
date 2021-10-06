// import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filtros from '../components/Filtros'


const GestionarUsuarios = () => {
    return (
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">Gestionar Usuarios</div>
            <div className="descripcionSeccion">Aquí encuentras los usuarios, los actualizas o agregas nuevos.</div>
        </div>   
            <section>    
                <ul className="posicionBuscador"> 
                    <li>
                        <div className="label">Ingresa el ID del usuario:</div>
                        <Filtros/>
                    </li>
                </ul>
                <div className="productsTable">
                    <table summary="Usuarios registrados" className="usersTable">
                        <caption></caption>
                            <thead>
                            <tr>
                                <th scope="col">ID Usuario</th>
                                <th scope="col">Nombres</th>
                                <th scope="col">Apellidos</th>
                                <th scope="col">Rol</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Estado solicitud</th>
                                <th scope="col"></th>

                            </tr>
                            </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Laura Marcela </td>
                                <td>Rojas Díaz</td>
                                <td>Administrador</td>
                                <td>marcelarojas_d@outlook.com</td>
                                <td>3518888888</td>
                                <td><label className="badgeAvailable">Aprobado</label></td>
                                <td><button className="editButton">
                                    <span className="material-icons">edit</span></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Cristian</td>
                                <td>Caleño</td>
                                <td>Vendedor</td>
                                <td>cristian@outlook.com</td>
                                <td>3518888888</td>
                                <td><label className="badgeNotAvailable">Pendiente</label></td>
                                <td><button className="editButton">
                                    <span className="material-icons">edit</span></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default GestionarUsuarios;
