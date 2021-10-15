import React, { useEffect, useState, useRef} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros';
import { nanoid } from 'nanoid';
import axios from 'axios';

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
        estado: 'Aprobado'
    },
]

/*--Esta función permite editar cada registro de la tabla de usuario, solo permite editar estado y rol---*/

const FilaUsuarios = ({usuario})=>{

    const [edit, setEdit] = useState(false);
    const [infoUsuario, setInfoUsuario]=useState(
        {
        rol: usuario.rol,
        estado:  usuario.estado,
        }
    );

    const actualizarDatosUsuarios = async () =>{
      console.log(infoUsuario);
      //Pendiente gestionar con Ashley que esta info la reciba la base de datos, con metodo PATCH-hora y 36min de la clase 14
    {/*const options ={
        method: 'PATCH',
        url: 'poner url de api .../update'
        headers: {'Content-Type': 'application/json'},
        data; {...infoUsuario, id:usuario._id (esto se debe confirmar, no se si es el id del usuario cuando se crea con auth0)}
    }*/}
    };

    // await axios
    // .request(options)
    // .then(function (response){
    // console.log(response.data);
    // toast.success("Usuario actualizado con éxito")
    // })
    // .catch(function (error){
    // console.error(error);
    // toast.error("Error al actualizar usuario")
    // });
    
    return(
        <tr>
            { edit ? (
            <>
            <td>{usuario.id_usuario}</td>
            <td>{usuario.given_name}</td>
            <td>{usuario.family_name}</td>
            <td>{usuario.email}</td>
            <td>
             <select name="rol_usuario" className="listaUsuarios" required value={infoUsuario.rol} onChange={(e)=>setInfoUsuario({...infoUsuario, rol:e.target.value})} >
                <option disabled value={0}> Selecciona un rol</option>
                    <option>Administrador</option>
                    <option>Vendedor</option>
            </select>
            </td>
             <td>
             <select name="estado_usuario" className="listaUsuarios" required value={infoUsuario.estado} onChange={(e)=>setInfoUsuario({...infoUsuario, estado:e.target.value})}>
                <option disabled value={0}>Seleccione el estado</option>
                    <option>Aprobado</option>
                    <option>Pendiente</option>
            </select>
            </td>
            <td>
            <button className="editButton" onClick={actualizarDatosUsuarios()}>
                        <span className="material-icons">check</span></button></td>
            </> 
            ) : (
                    <> 
                    <td>{usuario.id_usuario}</td>
                    <td>{usuario.given_name}</td>
                    <td>{usuario.family_name}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.rol}</td>
                    <td><label className={usuario.estado==='Aprobado'?"badgeAvailable":"badgeNotAvailable"}>
                        {usuario.estado}</label></td>
                    <td><button className="editButton" onClick={()=>setEdit(!edit)}> 
                        <span className="material-icons">edit</span></button></td>            
                </>
            )
            }        
        </tr>     
        
    ) 
   
};

const GestionarUsuarios = () => {

    const [GestionarUsuarios, setGestionarUsuarios] = useState([]);
    const form=useRef(null);
    
    useEffect(() => {
        setGestionarUsuarios(GestionarUsuariosBackend);
    }, []);

    const submitEdit =(e)=>{
        e.preventDefault();
        const fd = new FormData(form.current);
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
                    {/* <form ref={form} onSubmit={submitEdit}> */}
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
                    {/* </form> */}
                </div>
            </section>
        <Footer/>
    </div>
           
)};   
    
export default GestionarUsuarios;
