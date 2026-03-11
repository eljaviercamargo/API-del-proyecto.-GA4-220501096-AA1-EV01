import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";

import Menu from "./pages/Menu";
import Pacientes from "./pages/Pacientes";
import Productos from "./pages/Productos";
import Servicios from "./pages/Servicios";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

const token = localStorage.getItem("token");

return (

<BrowserRouter>

<Routes>

{/* LOGIN */}

<Route
path="/login"
element={<Login />}
/>


{/* MENU PRINCIPAL */}

<Route
path="/menu"
element={
token
? <Menu />
: <Navigate to="/login"/>
}
/>


{/* PACIENTES */}

<Route
path="/pacientes"
element={
token
? <Pacientes />
: <Navigate to="/login"/>
}
/>


{/* PRODUCTOS */}

<Route
path="/productos"
element={
token
? <Productos />
: <Navigate to="/login"/>
}
/>


{/* SERVICIOS */}

<Route
path="/servicios"
element={
token
? <Servicios />
: <Navigate to="/login"/>
}
/>


{/* RUTA POR DEFECTO */}

<Route
path="*"
element={<Navigate to="/login"/>}
/>

</Routes>

</BrowserRouter>

)

}

export default App;