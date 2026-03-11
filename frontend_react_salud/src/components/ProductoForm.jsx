import React, { useState, useEffect } from "react";

function ProductoForm({ productoToEdit, onSaveComplete }) {

const [nombre,setNombre] = useState("");
const [descripcion,setDescripcion] = useState("");
const [precio,setPrecio] = useState("");
const [terapia,setTerapia] = useState("");
const [unidadMedida,setUnidadMedida] = useState("");
const [activo,setActivo] = useState(true);

const API = "http://localhost:4000/api/productos-terapia";

useEffect(()=>{

if(productoToEdit){

setNombre(productoToEdit.nombre);
setDescripcion(productoToEdit.descripcion);
setPrecio(productoToEdit.precio);
setTerapia(productoToEdit.terapia);
setUnidadMedida(productoToEdit.unidadMedida);
setActivo(productoToEdit.activo);

}

},[productoToEdit]);

const handleSubmit = async(e)=>{

e.preventDefault();

const producto = {

nombre,
descripcion,
precio,
terapia,
unidadMedida,
activo

};

if(productoToEdit){

await fetch(`${API}/${productoToEdit._id}`,{

method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(producto)

});

}else{

await fetch(API,{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(producto)

});

}

setNombre("");
setDescripcion("");
setPrecio("");
setTerapia("");
setUnidadMedida("");
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
type="text"
className="form-control"
placeholder="Terapia"
value={terapia}
onChange={e=>setTerapia(e.target.value)}
required
/>
</div>

<div className="col-md-4 mb-3">
<input
type="text"
className="form-control"
placeholder="Unidad de Medida"
value={unidadMedida}
onChange={e=>setUnidadMedida(e.target.value)}
required
/>
</div>

<div className="col-md-12 mb-3">

<label className="me-2">Activo</label>

<input
type="checkbox"
checked={activo}
onChange={e=>setActivo(e.target.checked)}
/>

</div>

<div className="col-md-12">

<button className="btn btn-success">

{productoToEdit ? "Actualizar Producto" : "Guardar Producto"}

</button>

</div>

</div>

</form>

)

}

export default ProductoForm;