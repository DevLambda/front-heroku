import React, { useEffect, useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import Filtros from '../components/Filtros'

const GestionarProductos = () => {
    const [mostrarTablaProductos, setMostrarTablaProductos] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Crear nuevo Producto')

    useEffect(() => {
        if (mostrarTablaProductos) {
            setTextoBoton('Crear nuevo Producto')
        } else {   
            setTextoBoton('Volver a Gestionar Productos')
        }
    }, [mostrarTablaProductos])
        
    return (
        <div>
            <button
            onClick={() => {
                setMostrarTablaProductos(!mostrarTablaProductos)
            }}
            className="botonCrear">
            {textoBoton}
            </button>
            {mostrarTablaProductos ? <TablaProductos/> : <RegistrarProductos/> }
        </div>
    )
}    
/*------------ Taabla Productos --------------*/

const TablaProductos = () => {
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
                            <tr>
                                <td>1</td>
                                <td>Zapatos</td>
                                <td>$120.000</td>
                                <td><label className="badgeAvailable">Disponible</label></td>
                                <td><button className="editButton">
                                    <span className="material-icons">edit</span></button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Maletín</td>
                                <td>$90.000</td>
                                <td><label className="badgeNotAvailable">No disponible</label></td>
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
                <div ClassName="labelform">
                <label for="fname">ID producto</label>
                <input type="text" id="fname" nameName="firstname" placeholder="000001..."/>
            
                <label for="lname">Descripción del producto</label>
                <input type="text" id="lname" nameName="Descripción" placeholder="Zapatos, camisas..."/>

                <label for="lname">Valor producto</label>
                <input type="text" id="lname" nameName="Descripción" placeholder="Ingresa el valor en pesos..."/>
            
                <label for="estado">Selecciona el estado</label>
                <select id="estado" nameName="estado">
                    <option value="Disponible">Disponible</option>
                    <option value="No disponible">No disponible</option>
                </select>
                <input type="submit" value="Guardar nuevo producto"></input>
                </div>
            </form>
        </div>
        <Footer/>
    </div>
    );
};

export default GestionarProductos;
