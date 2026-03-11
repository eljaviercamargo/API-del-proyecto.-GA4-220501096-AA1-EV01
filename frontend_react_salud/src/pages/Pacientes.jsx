import React, { useState, useEffect } from "react";
import PacienteForm from "../components/PacienteForm";
import PacienteList from "../components/PacienteList";
import "bootstrap/dist/css/bootstrap.min.css";

function Pacientes() {

const [pacientes, setPacientes] = useState([]);
const [pacienteToEdit, setPacienteToEdit] = useState(null);

const API = "http://localhost:4000/api/pacientes";

const fetchPacientes = () => {

fetch(API)
.then(res => res.json())
.then(data => {

if(Array.isArray(data)){
setPacientes(data)
}else{
setPacientes([])
}

})
.catch(err => console.log(err))

}

useEffect(()=>{

fetchPacientes()

},[])

const handleEdit = (paciente) => {

setPacienteToEdit(paciente)

}

const handleSaveComplete = () => {

setPacienteToEdit(null)
fetchPacientes()

}

return (

<div className="container mt-5">

<h2 className="text-center mb-4">
Gestión de Pacientes
</h2>

<div className="card shadow mb-4">

<div className="card-header bg-primary text-white">
Agregar Paciente
</div>

<div className="card-body">

<PacienteForm
pacienteToEdit={pacienteToEdit}
onSaveComplete={handleSaveComplete}
/>

</div>

</div>

<PacienteList
pacientes={pacientes}
onEdit={handleEdit}
onDeleted={fetchPacientes}
/>

</div>

)

}

export default Pacientes