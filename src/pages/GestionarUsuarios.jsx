import React, { useEffect, useState, useRef} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';
import { nanoid } from 'nanoid';

const GestionarUsuariosBackend = [
    {
        id_usuario:'0001',
        given_name: "Marcela",
        family_name: "Rojas",
        email: "marcelarojasd.7c@gmail.com",
        rol: 'Administrador',
        estado: 'Pendiente'
    },
    {
        id_usuario:'0002',
        given_name: "Gina",
        family_name: "Rodriguez",
        email: "ginarodriguez@gmail.com",
        rol: 'Vendedor', 
        estado: 'Pendiente'
    },
    {
        id_usuario:'0003',
        given_name: "Cristian",
        family_name: "Caleño",
        email: "cristianc@gmail.com",
        rol: 'Administrador', 
        estado: 'Pendiente'
    },
]

/*--Esta función permite editar cada registro de la tabla de usuario, solo permite editar estado y rol---*/

const FilaUsuarios = ({usuario})=>{
    const [editUsuario, setEditUsuario] = useState(false);
    return(
        <tr>
            {editUsuario ? (
            
            <>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.given_name}</td>
            <td>{usuario.family_name}</td>
            <td>{usuario.email}</td>
            <td>
             <select className="listaUsuarios" name="rol" required defaultValue={usuario.rol} >
                                            <option disabled value={0}> Selecciona un rol</option>
                                                <option>Administrador</option>
                                                <option>Vendedor</option>
                                        </select>
            </td>  
            <td>
             <select className="listaUsuarios" name="estado" required defaultValue={usuario.estado} >
                                            <option disabled value={0}>Seleccione el estado</option>
                                                <option>Aprobado</option>
                                                <option>No Aprobado</option>
            </select>
            </td>
            </> ) : (
                        <>
                                    <td>{usuario.id_usuario}</td>
                                    <td>{usuario.given_name}</td>
                                    <td>{usuario.family_name}</td>
                                    <td>{usuario.email}</td>
                                    <td>{usuario.rol}</td>
                                        <select className="listaUsuarios"name="rol" required defaultValue={usuario.rol} >
                                            <option disabled value={0}> Selecciona un producto</option>
                                                <option>Administrador</option>
                                                <option>Vendedor</option>
                                        </select>
                                    <td><label className={usuario.estado==='Aprobado'?"badgeAvailable":"badgeNotAvailable"}>
                                        {usuario.estado}</label></td>
                                    <td>
                                          
                                        {/* {editUsuario ?   */}
                                        <button type="submit" className="editButton" onClick={setEditUsuario(!editUsuario)}>
                                        <span className="material-icons">check</span></button> 
                                        {/* : */}
                                            <button className="editButton" onClick={setEditUsuario(!editUsuario)}>
                                            <span className="material-icons">edit</span></button> 
                                        {/* }                    */}
                                    </td>
                        </>
                    )
                }
        </tr>     
    ) 
};

const GestionarUsuarios = () => {

    const [GestionarUsuarios, setGestionarUsuarios] = useState([]);
    
    useEffect(() => {
        setGestionarUsuarios(GestionarUsuariosBackend);
    }, []);

    const submitEdit =(e)=>{
        e.preventDefault();
        console.log(e);
     }
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
                    <form onSubmit={submitEdit}>
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
                                    <FilaUsuarios key={nanoid()} usuario={usuario}/>
                                );
                            })}
                            </tbody>
                        </table>
                    </form>
                </div>
            </section>
        <Footer/>
    </div>
           
)};   
    
export default GestionarUsuarios;
