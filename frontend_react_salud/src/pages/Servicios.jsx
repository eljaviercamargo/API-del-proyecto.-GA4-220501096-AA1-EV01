import React, { useState, useEffect } from "react";
import ServicioForm from "../components/ServicioForm";
import ServicioList from "../components/ServicioList";

function Servicios(){

const [servicios,setServicios] = useState([]);
const [servicioToEdit,setServicioToEdit] = useState(null);

const API = "http://localhost:4000/api/servicios";

const fetchServicios = () => {

fetch(API)
.then(res => res.json())
.then(data => {

if(Array.isArray(data)){
setServicios(data)
}else{
setServicios([])
}

})
.catch(err => console.log(err))

}

useEffect(()=>{

fetchServicios()

},[])

const handleEdit = (servicio) => {

setServicioToEdit(servicio)

}

const handleSaveComplete = () => {

setServicioToEdit(null)
fetchServicios()

}

return(

<div className="container mt-5">

<h2 className="text-center mb-4">
Gestión de Servicios
</h2>

<div className="card shadow mb-4">

<div className="card-header bg-primary text-white">
Agregar Servicio
</div>

<div className="card-body">

<ServicioForm
servicioToEdit={servicioToEdit}
onSaveComplete={handleSaveComplete}
/>

</div>

</div>

<ServicioList
servicios={servicios}
onEdit={handleEdit}
onDeleted={fetchServicios}
/>

</div>

)

}

export default Servicios;