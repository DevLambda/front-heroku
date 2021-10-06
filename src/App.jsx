
import Login from './pages/login';
import Ventas from './pages/Ventas';
import GestionarProductos from './pages/GestionarProductos';
import GestionarUsuarios from './pages/GestionarUsuarios';
import './styles/App.css'

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>

         <Route path='/Index'>
          <Login />
         </Route>

         <Route path='/Ventas'>
          <Ventas />
         </Route>

         <Route path='/GestionarProductos'>
          <GestionarProductos />
         </Route>

         <Route path='/GestionarUsuarios'>
          <GestionarUsuarios />
         </Route>

         <Route path='/'>
          <Login />
         </Route>

        </Switch>
      </Router>
       
    </div>
  );
}



export default App;


