import React, { useState, useEffect } from "react";

function ServicioForm({ servicioToEdit, onSaveComplete }) {

const [nombre,setNombre] = useState("");
const [descripcion,setDescripcion] = useState("");
const [precio,setPrecio] = useState("");
const [duracion,setDuracion] = useState("");
const [activo,setActivo] = useState(true);

const API = "http://localhost:4000/api/servicios";

useEffect(()=>{

if(servicioToEdit){

setNombre(servicioToEdit.nombre);
setDescripcion(servicioToEdit.descripcion);
setPrecio(servicioToEdit.precio);
setDuracion(servicioToEdit.duracion);
setActivo(servicioToEdit.activo);

}

},[servicioToEdit]);

const handleSubmit = async(e)=>{

e.preventDefault();

const servicio = {

nombre,
descripcion,
precio,
duracion,
activo

};

if(servicioToEdit){

await fetch(`${API}/${servicioToEdit._id}`,{

method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(servicio)

});

}else{

await fetch(API,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(servicio)

});

}

setNombre("");
setDescripcion("");
setPrecio("");
setDuracion("");
setActivo(true);

onSaveComplete();

}

return(

<form onSubmit={handleSubmit}>

<div className="row">

<div className="col-md-6 mb-3">
<input
type="text"
className="form-control"
placeholder="Nombre"
value={nombre}
onChange={e=>setNombre(e.target.value)}
required
/>
</div>

<div className="col-md-6 mb-3">
<input
type="text"
className="form-control"
placeholder="Descripción"
value={descripcion}
onChange={e=>setDescripcion(e.target.value)}
required
/>
</div>

<div className="col-md-4 mb-3">
<input
type="number"
className="form-control"
placeholder="Precio"
value={precio}
onChange={e=>setPrecio(e.target.value)}
required
/>
</div>

<div className="col-md-4 mb-3">
<input
type="number"
className="form-control"
placeholder="Duración (min)"
value={duracion}
onChange={e=>setDuracion(e.target.value)}
required
/>
</div>

<div className="col-md-4 mb-3">

<label className="me-2">Activo</label>

<input
type="checkbox"
checked={activo}
onChange={e=>setActivo(e.target.checked)}
/>

</div>

<div className="col-md-12">

<button className="btn btn-success">

{servicioToEdit ? "Actualizar Servicio" : "Guardar Servicio"}

</button>

</div>

</div>

</form>

)

}

export default ServicioForm;