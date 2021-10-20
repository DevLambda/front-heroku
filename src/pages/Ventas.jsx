import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {obtenerVentas,registrarVentas,editarVentas} from'../utils/api';
import { nanoid } from 'nanoid';

const GestionarVentasBackend = [
    {
        idVenta: "0001",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Entregada",
        idCliente:'0006',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "007",
    },
    {
        idVenta: "0002",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Cancelada",
        idCliente:'0006',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "007",
    },
    {
        idVenta: "0003",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0006',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "007",
    },
    {
        idVenta: "0004",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        idCliente:'0006',
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        idVendedor: "007",
    },
]
const Ventas = () =>{
    const [Ventas, setVentas] = useState([]);
    const [mostrarTablaVentas, setMostrarTablaVentas] = useState(true);
    const [textoBoton,setTextoBoton] = useState('Registrar Venta');
    const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

    useEffect(() => {
        setVentas(GestionarVentasBackend);
    }, []);

    useEffect(() => {
        console.log('consulta', ejecutarConsulta);
        if (ejecutarConsulta) {
            obtenerVentas((response) => {
                console.log('la respuesta que se recibio fue', response);
                setVentas(response.data);
            },
            (error) => {
                console.error('Salio un error:', error);
            }
            );
            setEjecutarConsulta(false); 
        }
    }, [ejecutarConsulta]);
    
    useEffect(() => {
        if (mostrarTablaVentas) {
            setEjecutarConsulta(true);
        }
    }, [mostrarTablaVentas]);

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
            <div>
                <button
                onClick={() => {
                    setMostrarTablaVentas(!mostrarTablaVentas)
                }}
                className="botonCrear">
                {textoBoton}
                </button>
            </div>
        
        {mostrarTablaVentas ? (<TablaVentas listaVentas={Ventas} setEjecutarConsulta={setEjecutarConsulta}/>
        ) : ( <RegistrarVentas
            setMostrarTablaVentas={setMostrarTablaVentas}
            listaVentas={Ventas}
            setVentas={setVentas}/>
        )}
        <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
    )
}

/*---------Tabla ventas--------------------*/


const TablaVentas = ({ listaVentas, setEjecutarConsulta }) => {
    const [busqueda, setBusqueda] = useState('');
    const [ventaFiltrados, setVentaFiltrados] = useState(listaVentas);

    useEffect(() => {
        setVentaFiltrados(
            listaVentas.filter((elemento) => {
                return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());

            })
        );
    }, [busqueda, listaVentas]);


    return (
    <div>
        <Header/>
            <div className="textosInicioSeccion">
                <div className="tituloSeccion">Gestionar Ventas
                    {/* <span>Gestionar Ventas</span>
                    <button  className="botonCrear">Registrar Venta</button>*/}
                </div>
                <div className="descripcionSeccion">Consulta el histórico de ventas, actualiza el estado de estas y/o edita la información que requieras. Lo único que no podrás editar es el ID de venta.</div>
            </div>
            <section>
                <ul className="posicionBuscador">
                    <li>
                        <div className="label">Ingresa el ID de la venta: </div>
                        <input id="busqueda" type="text" value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)} />
                        <button className="botonBuscar" type="submit">Buscar</button>
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
                                <th scope="col">ID Vendedor</th>
                                <th scope="col">Valor total</th>
                                <th id="acciones" colspan="2">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ventaFiltrados.map((Ventas) => {
                                return(
                                <FilaVentas
                                    key={nanoid()}
                                    Ventas={Ventas}
                                    setEjecutarConsulta={setEjecutarConsulta}
                                />   
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

/*------------Editar orden-------------------------->*/
const FilaVentas =({Ventas,setEjecutarConsulta}) => {
    const [edit,setEdit] = useState(false);
    const [infoNuevaVenta, setInfoNuevaVenta] = useState(
        {
            idVenta:Ventas.idVenta,
            fecha_venta:Ventas.fecha_venta,
            fecha_pago:Ventas.fecha_pago,
            estado_venta:Ventas.estado_venta,
            idCliente:Ventas.idCliente,
            nombre_cliente:Ventas.nombre_cliente,
            idVendedor:Ventas.idVendedor,
            total_venta:Ventas.total_venta,
        }
    );

    const actualizarVenta = async ()=> {
        await editarVentas (
            Ventas._id,
            {
                idVenta:infoNuevaVenta.idVenta,
                fecha_venta:infoNuevaVenta.fecha_venta,
                fecha_pago:infoNuevaVenta.fecha_pago,
                estado_venta:infoNuevaVenta.estado_venta,
                idCliente:infoNuevaVenta.idCliente,
                nombre_cliente:infoNuevaVenta.nombre_cliente,
                idVendedor:infoNuevaVenta.idVendedor,
                total_venta:infoNuevaVenta.total_venta,
            },
            (response) =>{
                console.log(response.data);
                toast.success('Producto editado con éxito');
                setEdit(false);
                setEjecutarConsulta(true);
            },
            (error) => {
                toast.error('Error editando el producto');
                console.error(error);
            }
        );
    };

    return(
        <tr>
            {edit ? (
                <>
                {/* //linea 233 no se que es? */}
                <td>{infoNuevaVenta.idVenta}</td>
                {/* <td>{Ventas.idVenta}</td> */}
                <td>{Ventas.fecha_venta}</td>
                {/* <td>{Ventas.fecha_pago}</td> */}
                <td><input className="estiloCampos" type="date"/></td>
                <td>
                    <select name="estado_venta" className="estilosCampos"
                        required 
                        defaultValue = {setInfoNuevaVenta.estado_venta}
                        onChange={(e) => setInfoNuevaVenta({ ...infoNuevaVenta, estado_venta: e.target.value})}>
                        <option disabled value ={0}>Selecciona un estado</option>
                        <option>Entregada</option>
                        <option>Cancelada</option>
                        <option>En Progreso</option>
                    </select>
                </td>
                <td>{Ventas.idCliente}</td>
                <td>{Ventas.nombre_cliente}</td>
                <td>{Ventas.idVendedor}</td>
                <td>{Ventas.total_venta}</td> 
                <td>
                    <button className="checkButton" onClick={actualizarVenta()}>
                    <span className="material-icons">check</span></button> 
                </td>
                <td>
                    <button className="cancelButton" onClick={()=>setEdit(!edit)}> 
                    <span className="material-icons">cancel</span>
                    </button>
                </td>
                </>
            ) : (
                <>
                <td>{Ventas.idVenta}</td>
                <td>{Ventas.fecha_venta}</td>
                <td>{Ventas.fecha_pago}</td>
                <td><label className={Ventas.estado_venta==='Entregada' ? 'badgeAvailable': Ventas.estado_venta==='En Progreso' ? "badgeInProgress" : 'badgeNotAvailable'}>
                    {Ventas.estado_venta}</label></td>
                <td>{Ventas.idCliente}</td>
                <td>{Ventas.nombre_cliente}</td>
                <td>{Ventas.idVendedor}</td>
                <td>{Ventas.total_venta}</td>  
                <td><button className="editButton" onClick={() => setEdit(!edit)}>
                    <span className="material-icons">edit</span>
                    </button>
                </td>                 
                </>
            )}
        </tr>
    );
};
/*------------Registrar Ventas----------------------*/

const RegistrarVentas = ({ setMostrarTablaVentas, listaVentas, setVentas }) => {
    const form = useRef(null);

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevaVenta = {};
        fd.forEach((value, key) => {
            nuevaVenta[key] = value;
        });

        await registrarVentas(
            {
                ced_cliente:nuevaVenta.ced_cliente,
                nombre_cliente:nuevaVenta.nombre_cliente,
                tel_cliente:nuevaVenta.tel_cliente,
                dir_cliente:nuevaVenta.dir_cliente,
                idVendedor:nuevaVenta.idVendedor,
                nom_vendedor:nuevaVenta.nom_vendedor,
                fecha_venta:nuevaVenta.fecha_venta,
                quantity:nuevaVenta.quantity,
                fecha_pago:nuevaVenta.fecha_pago,
                },
                (response) => {
                    console.log(response.data);
                    toast.success('Nuevo producto agregado con éxito');
                  },
                  (error) => {
                    console.error(error);
                    toast.error('Error agregando el producto');
                  }
            );
        setMostrarTablaVentas(true);
    };

    return(
        <div>
            <Header/>

            <div className="textosInicioSeccion">
                <div className="tituloSeccion">
                    <span>Registrar nueva venta</span></div>
                <div className="descripcionSeccion">Ingresa los datos de la venta a registrar.</div>
            </div>
            <section className="contenedorFormVentas"id="container">
                <div className="datos_cliente">
                  <div className="action_cliente">
                      <h4>Datos del Cliente</h4>
                      <a href="#" className="btn_new btn_new_cliente"><i class="fas fa-plus"></i>Nuevo Cliente</a>
                  </div>
                  <form ref={form} onSubmit={submitForm} name ="form_new_cliente_venta" id= "form_new_cliente_venta" class="datos">
                      <input id="input_ventas" type="hidden" name="action" value="addCliente"/>
                      <input id="input_ventas" type="hidden" name="idCliente" value="" required/>

                      <div className="wd20">
                          <label id="label">Cédula</label>
                          <input id="input_ventas" type="text" name="ced_cliente" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Nombre</label>
                          <input id="input_ventas" type="text" name="nombre_cliente" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Teléfono</label>
                          <input id="input_ventas" type="text" name="tel_cliente" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Dirección</label>
                          <input id="input_ventas" type="text" name="dir_cliente" required/>
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
                          <label id="label">ID Vendedor</label>
                          <input id="input_ventas" type="text" name="idVendedor" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Nombre</label>
                          <input id="input_ventas" type="text" name="nom_vendedor" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Fecha de facturación</label>
                          <input id="input_fecha" type="date" name="fecha_venta" required/>
                      </div>
                      <div className="wd100">
                      </div>
                  </div>
              </div>

              <div className="datos_venta">
                  <h4>Datos Venta</h4>
                  <div className="datos">
                      {/* <div className="wd50">
                          <label id="label">Código</label>
                          <input id="input_ventas" type="text" name="code" required/>
                      </div> */}
                      <div className="wd50">
                          <label id="label">Producto
                          <select id="listaProductos" name="descripcion" required defaultValue={0} >
                            <option disabled value={0}> Selecciona un producto</option>
                                <option>Bonsai Chumono</option>
                                <option>Bonsai Komono</option>
                                <option>Bonsai Kotate</option>
                                <option>Bonsai Omono</option>
                                <option>Bonsai Shito</option>
                                <option>Bonsai Shohin</option>
                        </select>
                      </label>
                      </div>
                      <div className="wd50">
                          <label id="label">Cantidad</label>
                          <input id="input_fecha" min={1} type="number" name="quantity" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Precio</label>
                          <input id="input_fecha" type="number" name="precio" required />
                      </div>
                      <div className="wd50">
                          <label id="label">Fecha de Pago</label>
                          <input id="input_fecha" type="date" name="fecha_pago" required/>
                      </div>
                  </div>
              </div>

              <table border="1"id="tbl_venta">
                  <thead>
                      <tr>
                          <th id="t_ventas">Código</th>
                          <th id="t_ventas" colspan="2">Producto</th>
                          <th id="t_ventas">Cantidad</th>
                          <th id="t_ventas" className="textright">Precio Unitario</th>
                          <th id="t_ventas" className="textright">Precio Total</th>
                          <th id="t_ventas"></th>
                      </tr>
                  </thead>

                  <tbody id="detalle_venta">
                      <tr>
                          <td>1001</td>
                          <td id="t_ventas" colspan="2">Tennis</td>
                          <td id="t_ventas" className="textcenter">1</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i>Eliminar</a></td>
                      </tr>

                      <tr>
                          <td>1002</td>
                          <td id="t_ventas" colspan="2">Camisas</td>
                          <td id="t_ventas" className="textcenter">1</td>
                          <td id="t_ventas" className="textright">150.00</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i></a>
                          </td>
                      </tr>
                  </tbody>
                  <tfoot>
                      <tr>
                          <td id="t_ventas" colspan="5" className="textright">Total </td>
                          <td id="t_ventas" className="textright">1000.00</td>
                      </tr>
                  </tfoot>
              </table>
            </section>
            <br/>
            <br/>
            <button type="submit" className="botonGuardarProducto"> Procesar </button>
            <Footer/>
        </div>
    );
};

export default Ventas;