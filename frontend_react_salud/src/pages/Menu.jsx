import React from "react";
import { useNavigate } from "react-router-dom";

function Menu(){

const navigate = useNavigate();

return(

<div className="container d-flex flex-column justify-content-center align-items-center vh-100">

<h2 className="mb-5">
Seleccione una opción
</h2>

<div className="row w-75 text-center">

<div className="col-md-4 mb-3">
<button
className="btn btn-primary w-100 p-4 fs-4"
onClick={()=>navigate("/pacientes")}
>
Pacientes
</button>
</div>

<div className="col-md-4 mb-3">
<button
className="btn btn-primary w-100 p-4 fs-4"
onClick={()=>navigate("/productos")}
>
Productos
</button>
</div>

<div className="col-md-4 mb-3">
<button
className="btn btn-primary w-100 p-4 fs-4"
onClick={()=>navigate("/servicios")}
>
Servicios
</button>
</div>

</div>

</div>

)

}

export default Menu;