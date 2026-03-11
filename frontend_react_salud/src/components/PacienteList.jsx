import React from "react";

function PacienteList({ pacientes, onEdit, onDeleted }) {

const handleDelete = (id)=>{

if(!window.confirm("¿Seguro que deseas eliminar este paciente?"))
return

fetch(`http://localhost:4000/api/pacientes/${id}`,{

method:"DELETE"

})
.then(res=>res.json())
.then(()=>{

alert("Paciente eliminado")

onDeleted()

})
.catch(err=>console.log(err))

}

return(

<div className="card shadow">

<div className="card-header bg-dark text-white">
Lista de Pacientes
</div>

<div className="card-body p-0">

<table className="table table-striped mb-0">

<thead className="table-dark">

<tr>

<th>Nombre</th>
<th>Apellido</th>
<th>Identificación</th>
<th>Email</th>
<th>Teléfono</th>
<th>Fecha Nacimiento</th>
<th>Acciones</th>

</tr>

</thead>

<tbody>

{Array.isArray(pacientes) && pacientes.length > 0 ? (

pacientes.map(p => (

<tr key={p._id}>

<td>{p.nombre}</td>
<td>{p.apellido}</td>
<td>{p.rut}</td>
<td>{p.email}</td>
<td>{p.telefono}</td>
<td>
{new Date(p.fecha_nacimiento).toLocaleDateString()}
</td>

<td>

<button
className="btn btn-warning btn-sm me-2"
onClick={()=>onEdit(p)}
>
Editar
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>handleDelete(p._id)}
>
Eliminar
</button>

</td>

</tr>

))

) : (

<tr>

<td colSpan="7" className="text-center">
No hay pacientes registrados
</td>

</tr>

)}

</tbody>

</table>

</div>

</div>

)

}

export default PacienteList