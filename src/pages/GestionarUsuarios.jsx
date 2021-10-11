import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filtros from '../components/Filtros'

const GestionarUsuariosBackend = [
    {
        id_usuario:'0001',
        given_name: "Marcela",
        family_name: "Rojas",
        email: "marcelarojasd.7c@gmail.com",
        cellphone: '3098880000',
        rol: 'Administrador',
        estado: 'Pendiente'
    },
    {
        id_usuario:'0002',
        given_name: "Gina",
        family_name: "Rodriguez",
        email: "ginarodriguez@gmail.com",
        cellphone: '3098888888',
        rol: 'Vendedor', 
        estado: 'Pendiente'
    },
    {
        id_usuario:'0003',
        given_name: "Cristian",
        family_name: "Caleño",
        email: "cristianc@gmail.com",
        cellphone: '30985558888',
        rol: 'Administrador', 
        estado: 'Pendiente'
    },
    {
        id_usuario:'0004',
        given_name: "Ashley",
        family_name: "Romero",
        email: "ashleyr@gmail.com",
        cellphone: '3098888666',
        rol: 'Administrador', 
        estado: 'Aprobado'
    },
]

const GestionarUsuarios = () => {

    const [GestionarUsuarios, setGestionarUsuarios] = useState([]);
    
    useEffect(() => {
        setGestionarUsuarios(GestionarUsuariosBackend);
    }, []);

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
                                    <th scope="col">Correo</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col">Estado solicitud</th>
                                    <th scope="col">Acción</th> 
                                </tr>
                                </thead>
                            <tbody>
                            {GestionarUsuariosBackend.map((usuario) => {
                                return (
                                    <tr>
                                    <td>{usuario.id_usuario}</td>
                                    <td>{usuario.given_name}</td>
                                    <td>{usuario.family_name}</td>
                                    <td>{usuario.rol}</td>
                                    <td>{usuario.email}</td>
                                    <td><label className={usuario.estado==='Aprobado'?"badgeAvailable":"badgeNotAvailable"}>
                                        {usuario.estado}</label></td>
                                    <td><button className="editButton">
                                        <span className="material-icons">edit</span></button>
                                    </td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </section>
                <Footer/>
            </div>
            
    )};    
    


    


export default GestionarUsuarios;
