import React, { useState, useEffect } from "react";
import ProductoForm from "../components/ProductoForm";
import ProductoList from "../components/ProductoList";

function Productos(){

const [productos,setProductos] = useState([]);
const [productoToEdit,setProductoToEdit] = useState(null);

const API = "http://localhost:4000/api/productos-terapia";

const fetchProductos = () => {

fetch(API)
.then(res => res.json())
.then(data => {

if(Array.isArray(data)){
setProductos(data)
}else{
setProductos([])
}

})
.catch(err => console.log(err))

}

useEffect(()=>{

fetchProductos()

},[])

const handleEdit = (producto) => {

setProductoToEdit(producto)

}

const handleSaveComplete = () => {

setProductoToEdit(null)
fetchProductos()

}

return(

<div className="container mt-5">

<h2 className="text-center mb-4">
Gestión de Productos
</h2>

<div className="card shadow mb-4">

<div className="card-header bg-primary text-white">
Agregar Producto
</div>

<div className="card-body">

<ProductoForm
productoToEdit={productoToEdit}
onSaveComplete={handleSaveComplete}
/>

</div>

</div>

<ProductoList
productos={productos}
onEdit={handleEdit}
onDeleted={fetchProductos}
/>

</div>

)

}

export default Productos