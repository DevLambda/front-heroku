import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerVentas, registrarVentas , editarVentas } from'../utils/api';
import { obtenerProductos } from'../utils/api';
import { nanoid } from 'nanoid';

const GestionarVentasBackend = [
    {
        idVenta: "0001",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Entregada",
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        nombre_vendedor: "Gina Rodriguez",
    },
    {
        idVenta: "0002",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "Cancelada",
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        nombre_vendedor: "Gina Rodriguez",
    },
    {
        idVenta: "0003",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        nombre_vendedor: "Gina Rodriguez",
    },
    {
        idVenta: "0004",
        fecha_venta:"08/10/2021",
        fecha_pago:"8/10/2021",
        estado_venta: "En Progreso",
        nombre_cliente:'Laura Rojas',
        total_venta: "$120.000",
        nombre_vendedor: "Gina Rodriguez",
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
                                <th scope="col">Nombre Cliente</th>
                                <th scope="col">Nombre Vendedor</th>
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
            nombre_cliente:Ventas.nombre_cliente,
            nombre_vendedor:Ventas.nombre_vendedor,
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
                nombre_cliente:infoNuevaVenta.nombre_cliente,
                nombre_vendedor:infoNuevaVenta.nombre_vendedor,
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
                <td>{Ventas.idVenta}</td>
                <td>{Ventas.fecha_venta}</td>
                <td>{Ventas.fecha_pago}</td>
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
                <td>{Ventas.nombre_cliente}</td>
                <td>{Ventas.nombre_vendedor}</td>
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
                <td>{Ventas.nombre_cliente}</td>
                <td>{Ventas.nombre_vendedor}</td>
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
                {/* En este form se deben poner los estilos */}
                <form ref={form} onSubmit={submitForm} name ="form_ventas" id= "form_ventas">

                <h4>Datos del Cliente</h4>
                      <div className="wd20">
                          <label id="label">Cédula</label>
                          <input id="input_ventas" type="text" name="ced_cliente" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Nombre Completo</label>
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

                    <br/>

                      <h4>Datos de la Venta</h4>
                      <div className="wd50">
                          <label id="label">Nombre Vendedor</label>
                          <input id="input_ventas" type="text" name="nom_vendedor" required/>
                      </div>
                      <div className="wd50">
                          <label id="label">Fecha de facturación</label>
                          <input id="input_fecha" type="date" name="fecha_venta" required/>
                      </div>
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
                </form>

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
                      {/* esto tiene que ir dentro de un componente */}
                      <tr>
                          <td>1001</td>
                          <td id="t_ventas" colspan="2">Tennis</td>
                          <td id="t_ventas" className="textcenter">1</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className="textright">100.00</td>
                          <td id="t_ventas" className=""><a className="link_delate" href="#" onclick= "event.preventDefault(); del_product_detalle(1);"><i className="far fa-trash-alt"></i>Eliminar</a></td>
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
            <button type="submit" className="botonGuardarProducto"> Procesar </button>
            <button type="submit" className="botonGuardarProducto"> Anular </button>
            <Footer/>
        </div>
    );
};

export default Ventas;