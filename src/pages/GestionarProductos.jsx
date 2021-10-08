import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filtros from '../components/Filtros'

//const GestionarproductosBackend = [
//];

const GestionarProductos = () => {
    const [mostrarTablaProductos, setMostrarTablaProductos] = useState(true);
    const [GestionarProductos, setGestionarProductos] = useState([]);
    const [textoBoton,setTextoBoton] = useState('Crear nuevo Producto');
    //const [colorBoton,setColorBoton] = useState();


    useEffect(() => {
    }, []);

    useEffect(() => {
        if (mostrarTablaProductos) {
            setTextoBoton('Crear nuevo Producto');
        } else {   
            setTextoBoton('Volver a Gestionar Productos');
            //setColorBoton();
        }
    }, [mostrarTablaProductos]);
        
    return (
        <div>
            <button
            onClick={() => {
                setMostrarTablaProductos(!mostrarTablaProductos)
            }}
            className="botonCrear">                
            {textoBoton}
            </button>
            {mostrarTablaProductos ? <TablaProductos listaProductos={GestionarProductos}/> : <RegistrarProductos/> }
        </div>
    )
}    
/*------------ Tabla Productos --------------*/

const TablaProductos = ({ listaProductos }) => {
    useEffect(() => {
        console.log("listado de productos en la tabla",listaProductos)
    }, [listaProductos]);
    
    return (
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">Gestionar productos</div>
            <div className="descripcionSeccion">Aquí encuentras los productos, los actualizas o agregas nuevos.</div>
        </div>   
            <section>    
                <ul className="posicionBuscador"> 
                    <li>
                        <div className="label">Ingresa el ID del producto:</div>
                        <Filtros/>
                    </li>
                </ul>
                <div className="productsTable">
                    <table summary="Productos registrados">
                        <caption></caption>
                            <thead>
                            <tr>
                                <th scope="col">ID Producto</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Actividad</th>
                            </tr>
                            </thead>
                        <tbody>
                            {listaProductos.map((producto) => {
                                return (
                                    <tr>
                                        <td>{producto.idProducto}</td>
                                        <td>{producto.descripcion}</td>
                                        <td>{producto.valor}</td>
                                        <td><label className="badgeAvailable">Disponible</label></td>
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
    );
};

/*------------ Crear Nuevos Productos --------------*/

const RegistrarProductos = () => {
    return(
        <div>
            <Header/>
            <div className="textosInicioSeccion">
            <div className="tituloSeccion">Agregar nuevo producto</div>
            <div className="descripcionSeccion">Ingresa los datos del nuevo producto.</div>
        </div>
            <div className="contenedorFormulario">
            <form>

                <label htmlFor="id">ID de Producto
                <input type="text" name="idProducto"
                placeholder="Ejemplo: 0001" required/>
                </label>
            
                <label htmlFor="descripciónProducto">Descripción del producto
                <input type="text" name="Descripción"
                placeholder="Ejemplo: Bonsai..." required/>
                </label>

                <label htmlFor="valorProducto">Valor producto
                <input type="text" name="Descripción"
                placeholder="Ingresa el valor en pesos..." required/>
                </label>
            
                <label htmlFor="estadoProducto">Estado del producto
                    <select name="estado" required>
                        <option disable value={0}> Selecciona un estado</option>
                        <option>Disponible</option>
                        <option>No disponible</option>
                    </select>
                </label>
                <button type="submit" className="botonGuardarProducto"> Guardar nuevo producto
                </button>
            </form>
            </div>
        <Footer/>
    </div>
    );
};

export default GestionarProductos;
