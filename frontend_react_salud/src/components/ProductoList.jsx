import React from "react";

function ProductoList({ productos, onEdit, onDeleted }) {

const API = "http://localhost:4000/api/productos-terapia";

const handleDelete = async(id)=>{

if(window.confirm("¿Eliminar producto?")){

await fetch(`${API}/${id}`,{

method:"DELETE"

});

onDeleted();

}

}

return(

<div className="card shadow">

<div className="card-header bg-dark text-white">

Lista de Productos

</div>

<div className="card-body">

<table className="table">

<thead>

<tr>

<th>Nombre</th>
<th>Descripción</th>
<th>Precio</th>
<th>Terapia</th>
<th>Unidad</th>
<th>Activo</th>
<th>Acciones</th>

</tr>

</thead>

<tbody>

{productos.map((producto)=>(

<tr key={producto._id}>

<td>{producto.nombre}</td>
<td>{producto.descripcion}</td>
<td>{producto.precio}</td>
<td>{producto.terapia}</td>
<td>{producto.unidadMedida}</td>
<td>{producto.activo ? "Sí" : "No"}</td>

<td>

<button
className="btn btn-warning me-2"
onClick={()=>onEdit(producto)}
>
Editar
</button>

<button
className="btn btn-danger"
onClick={()=>handleDelete(producto._id)}
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

export default ProductoList;