import React, { useState, useEffect } from "react";

function PacienteForm({ pacienteToEdit, onSaveComplete }) {

const [nombre,setNombre] = useState("")
const [apellido,setApellido] = useState("")
const [rut,setRut] = useState("")
const [telefono,setTelefono] = useState("")
const [email,setEmail] = useState("")
const [fechaNacimiento,setFechaNacimiento] = useState("")
const [password,setPassword] = useState("")

const API = "http://localhost:4000/api/pacientes"

useEffect(()=>{

if(pacienteToEdit){

setNombre(pacienteToEdit.nombre)
setApellido(pacienteToEdit.apellido)
setRut(pacienteToEdit.rut)
setTelefono(pacienteToEdit.telefono)
setEmail(pacienteToEdit.email)
setFechaNacimiento(
pacienteToEdit.fecha_nacimiento
? pacienteToEdit.fecha_nacimiento.split("T")[0]
: ""
)

}

},[pacienteToEdit])

const handleSubmit = (e)=>{

e.preventDefault()

const paciente = {

nombre,
apellido,
rut,
telefono,
email,
fecha_nacimiento: fechaNacimiento,
password

}

const method = pacienteToEdit ? "PUT" : "POST"

const url = pacienteToEdit
? `${API}/${pacienteToEdit._id}`
: API

fetch(url,{

method,
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(paciente)

})
.then(res=>res.json())
.then(()=>{

setNombre("")
setApellido("")
setRut("")
setTelefono("")
setEmail("")
setFechaNacimiento("")
setPassword("")

onSaveComplete()

})
.catch(err=>console.log(err))

}

return(

<form onSubmit={handleSubmit}>

<div className="row g-3">

<div className="col-md-6">
<input
type="text"
className="form-control"
placeholder="Nombre"
value={nombre}
onChange={(e)=>setNombre(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="text"
className="form-control"
placeholder="Apellido"
value={apellido}
onChange={(e)=>setApellido(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="text"
className="form-control"
placeholder="Identificación"
value={rut}
onChange={(e)=>setRut(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="text"
className="form-control"
placeholder="Teléfono"
value={telefono}
onChange={(e)=>setTelefono(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="email"
className="form-control"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="date"
className="form-control"
value={fechaNacimiento}
onChange={(e)=>setFechaNacimiento(e.target.value)}
required
/>
</div>

<div className="col-md-6">
<input
type="password"
className="form-control"
placeholder="Contraseña"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>
</div>

</div>

<button className="btn btn-success mt-3">

{pacienteToEdit
? "Actualizar Paciente"
: "Guardar Paciente"}

</button>

</form>

)

}

export default PacienteForm