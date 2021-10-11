import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Filtros from '../components/Filtros'

const GestionarVentasBackend = [
    {
        idVenta: "0001",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Entregada",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0002",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Cancelada",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0003",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
    {
        idVenta: "0004",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0001',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "001",
    },
]

const Ventas = () =>{
    const [Ventas, setVentas] = useState([]);
    const [mostrarTablaVentas, setMostrarTablaVentas] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Registrar Venta');

    useEffect(() => {
        setVentas(GestionarVentasBackend);
    }, []);

    useEffect(() => {
        if (mostrarTablaVentas) {
            setTextoBoton('Registrar Venta');
        } else {   
            setTextoBoton('Volver a Gestionar Ventas');
            //setColorBoton();
        }
    }, [mostrarTablaVentas]);

    return(
        <div>
        <button
        onClick={() => {
            setMostrarTablaVentas(!mostrarTablaVentas)
        }}
        className="botonCrear">                
        {textoBoton}
        </button>
        {mostrarTablaVentas ? (<TablaVentas listaVentas={Ventas}/>
        ) : ( <RegistrarVentas 
            setMostrarTablaVentas={setMostrarTablaVentas}
            listaVentas={Ventas}
            setVentas={setVentas}
        />
        )}
        <ToastContainer position='bottom-center' autoClose={4000} />
    </div>
    )
}

/*---------Tabla ventas--------------------*/


const TablaVentas = ({ listaVentas }) => {

    useEffect(() => {
        console.log("listado de ventas en la tabla",listaVentas)
    }, [listaVentas]);



    return (
    <div>
        <Header/> 
            <div className="textosInicioSeccion">
                <div className="tituloSeccion">Gestionar Ventas
                    {/* <span>Gestionar Ventas</span> 
                    <button  className="botonCrear">Registrar Venta</button>*/}
                </div>
                <div className="descripcionSeccion">Consulta el histórico de ventas, actualiza el estado de estas y/o edita la información que requieras. Lo único que no podrás editar es el ID de venta.
            </div>
    </div> 
        <section>
            <ul className="posicionBuscador">
                <li>
                    <div className="label">Ingresa el ID de la venta: </div>
                            <Filtros/>
                </li>
            </ul>

                    <div className="productsTable">
                        <table summary="Ventas registradas" className="usersTable">
                            <caption></caption>
                                <thead>
                                <tr>
                                    <th scope="col">ID Venta</th>
                                    <th scope="col">Fecha Venta</th>
                                    <th scope="col">Fecha Pago</th>
                                    <th scope="col">Estado Venta</th>
                                    <th scope="col">ID Cliente</th>
                                    <th scope="col">Nombre Cliente</th>
                                    <th scope="col">Valor total</th>
                                    <th scope="col">ID Vendedor</th>
                                    <th scope="col"></th>
        
                                </tr>
                            </thead>
                            <tbody>
                                    {listaVentas.map((ventas) => {
                                        return(
                                        <tr>
                                                <td>{ventas.idVenta}</td>
                                                <td>{ventas.fecha_venta}</td>
                                                <td>{ventas.fecha_pago}</td>
                                                <td><label className=
                                                {ventas.estado_venta==='Entregada' ? "badgeAvailable" : ventas.estado_venta==='En Progreso' ? "badgeInProgress" : "badgeNotAvailable"} >{ventas.estado_venta}</label>
                                                </td>
                                                <td>{ventas.idCliente}</td>
                                                <td>{ventas.nombre_cliente}</td>
                                                <td>{ventas.total_venta}</td>
                                                <td>{ventas.idVendedor}</td>
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
    )
};

/*------------Registrar Ventas----------------------*/

const RegistrarVentas = ({ setMostrarTablaVentas, listaVentas, setVentas }) => {
    const form = useRef(null);

    const submitForm = (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });

        setMostrarTablaVentas(true);
        setVentas([...listaVentas, nuevaVenta]);
        toast.success('Venta registrada exitosamente');
    };

    return(
        <div>
            <Header/>
            
            <div className="textosInicioSeccion">
                <div className="tituloSeccion">
                    <span>Registrar nueva venta</span></div>
                <div className="descripcionSeccion">Ingresa los datos de la venta a registrar.</div>
            </div>
            <section id="container">
                <div className="datos_cliente">
                  <div className="action_cliente">
                      <h4>Datos del cliente</h4>
                      <a href="#" className="btn_new btn_new_cliente"><i className="fas fa-plus"></i>Nuevo Cliente</a>
                  </div>
                  <form ref={form} onSubmit={submitForm} name ="form_new_cliente_venta" id= "form_new_cliente_venta" class="datos">
                      <input type="hidden" name="action" value="addCliente"/>
                      <input type="hidden" id="idCliente "name="idCliente" value="" required/>
                      <div className="wd50">
                          <label>Cédula</label>
                          <input type="text" name="ced_cliente" id="ced_cliente"  required/>
                      </div>
                      <div className="wd50">
                          <label>Nombre</label>
                          <input type="text" name="nom_cliente" id="nom_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label>Teléfono</label>
                          <input type="text" name="tel_cliente" id="tel_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label>Dirección</label>
                          <input type="text" name="dir_cliente" id="dir_cliente" disabled required/>
                      </div>
                      <div id="div_registro_cliente" className= "wd100">
                          <button type="submit" className="btn_save"><i className="far fa-save fa-lg"></i>Guardar</button>
                      </div>
                  </form>
                 </div>

              <div className="datos_venta">
                  <h4>Datos del  Vendedor</h4>
                  <div className="datos">
                      <div className="wd50">
                          <label>ID Vendedor</label>
                          <input type="text" name="idVendedor" id="idVendedor"  required/>
                      </div>
                      <div className="wd50">
                          <label>Nombre</label>
                          <input type="text" name="nom_cliente" id="nom_cliente" disabled required/>
                      </div>
                      <div className="wd50">
                          <label>Fecha de facturación</label>
                          <input type="date" name="fecha_fact" id="fecha_fact"  required/>
                      </div>
                      <div className="wd50">
                          <label>fechaPago</label>
                          <input type="date" name="fecha_pago" id="fecha_pago"  required/>
                      </div>
                      <div className="wd100">
                          <label>Acciones</label>
                          <a href="#" className="btn_ok" id="btn_anular_venta"><i className="fas fa-ban"></i>Anular</a>
                          <a href="#" className="btn_new" id="btn_facturar_venta"><i className="fas fa-edit"></i>Procesar</a>
                      </div>
                  </div>
              </div>

              <table border="1"className="tbl_venta">
                  <thead>
                      <tr>
                          <th width="100px">Código</th>
                          <th width="150px">Descripción</th> 
                          <th width="150px">Existencia</th>
                          <th width="100px">Cantidad</th>
                          <th class="150px">Precio</th>
                          <th class="150px"> Acción</th>
                      </tr>
                      
                      <tr>
                          <td><input type="text" name="txt_cod_producto" id="txt_cod_producto"/></td>
                          <td id="txt_descripcion">-</td>
                          <td id="txt_existencia">-</td>
                          <td><input type="text" name="txt_cant_producto" id="txt_cod_producto" value="0" min="1" disabled/></td>
                          <td id="txt_precio" className="textright">0.00</td>
                          <td><a href="#" className="link_add" id="add_product_venta"><i className="fas fa-plus"></i></a></td>
                      </tr>
                      <tr>
                          <th>Código</th>
                          <th colspan="2">Descripción</th>
                          <th>Cantidad</th>
                          <th className="textright">Precio Unitario</th>
                          <th className="textright">Precio Total</th>
                          <th>Acción</th>
                      </tr>
                  </thead>

                  <tbody id="detalle_venta">
                      <tr>
                          <td>1001</td>
                          <td colspan="2">Tennis</td>
                          <td className="textcenter">1</td>
                          <td className="textright">100.00</td>
                          <td className="textright">100.00</td>
                          <td className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i>Eliminar</a></td>
                      </tr>

                      <tr>
                          <td>1002</td>
                          <td colspan="2">Camisas</td>
                          <td className="textcenter">1</td>
                          <td className="textright">150.00</td>
                          <td className="textright">100.00</td>
                          <td className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i></a>
                          </td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <td colspan="5" className="textright">Total </td>
                          <td className="textright">1000.00</td>
                      </tr>
                  </tfoot>
              </table>
            </section>
        <Footer/>
    </div>
    );
};

export default Ventas;
