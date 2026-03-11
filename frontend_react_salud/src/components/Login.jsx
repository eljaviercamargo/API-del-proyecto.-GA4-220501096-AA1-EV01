import React, { useState } from "react";
import "./Login.css";

function Login() {

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = (e)=>{

e.preventDefault()

fetch("http://localhost:4000/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({email,password})
})
.then(res=>res.json())
.then(data=>{

if(data.token){

localStorage.setItem("token",data.token)
window.location.href="/menu"

}else{

alert("Credenciales incorrectas")

}

})

}

return(

<div className="login-container">

<div className="login-left">

<h3 className="mb-3">Panel Clínico</h3>

<p className="mb-4">
Ingrese sus credenciales para acceder al sistema
</p>

<form onSubmit={handleLogin}>

<input
type="email"
className="form-control mb-3"
placeholder="Correo electrónico"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
className="form-control mb-3"
placeholder="Contraseña"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<div className="login-options">

<div className="remember-box">

<input
type="checkbox"
id="remember"
/>

<label htmlFor="remember">
Recordar
</label>

</div>

<a href="/" className="forgot-link">
Olvidé contraseña
</a>

</div>

<button className="btn btn-primary w-100">
Iniciar sesión
</button>

</form>

</div>

<div className="login-right">

<img
src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
alt="Tecnología médica"
/>

</div>

</div>

)

}

export default Login;