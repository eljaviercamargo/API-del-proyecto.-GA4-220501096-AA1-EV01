import React from "react";

function ServicioList({ servicios, onEdit, onDeleted }) {

const API = "http://localhost:4000/api/servicios";

const handleDelete = async(id)=>{

if(window.confirm("¿Eliminar servicio?")){

await fetch(`${API}/${id}`,{

method:"DELETE"

});

onDeleted();

}

}

return(

<div className="card shadow">

<div className="card-header bg-dark text-white">

Lista de Servicios

</div>

<div className="card-body">

<table className="table">

<thead>

<tr>

<th>Nombre</th>
<th>Descripción</th>
<th>Precio</th>
<th>Duración</th>
<th>Activo</th>
<th>Acciones</th>

</tr>

</thead>

<tbody>

{servicios.map((servicio)=>(

<tr key={servicio._id}>

<td>{servicio.nombre}</td>
<td>{servicio.descripcion}</td>
<td>{servicio.precio}</td>
<td>{servicio.duracion} min</td>
<td>{servicio.activo ? "Sí" : "No"}</td>

<td>

<button
className="btn btn-warning me-2"
onClick={()=>onEdit(servicio)}
>
Editar
</button>

<button
className="btn btn-danger"
onClick={()=>handleDelete(servicio._id)}
>
Eliminar
</button>

</td>

</tr>

))}

</tbody>

</table>

</div>

</div>

)

}

export default ServicioList;