import axios from 'axios';


export const obtenerProductos = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: 'https://mighty-headland-73361.herokuapp.com/productos/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarProducto = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'https://mighty-headland-73361.herokuapp.com/productos/create',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarProducto = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'https://mighty-headland-73361.herokuapp.com/productos/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


/*---------VENTAS-------------*/

export const obtenerVentas = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/Ventas/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarVentas = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/Ventas/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVentas = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:5000/Ventas/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


/*---------USUARIOS-------------*/

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET',
  url: 'https://mighty-headland-73361.herokuapp.com/usuarios/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const registrarUsuarios = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'https://mighty-headland-73361.herokuapp.com/usuarios/create',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarUsuarios = async ( data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: 'https://mighty-headland-73361.herokuapp.com/usuarios/update/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};
