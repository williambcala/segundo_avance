import React from "react";
import { useState, useEffect } from "react";



import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../AuthContext";


const Login = () => {


    const navigate = useNavigate()
    const auth = useAuth()
    
    

    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        if (!correo) return setError("Ingrese un correo");

        try {
            await auth.login(correo, password)
            navigate('/home')

        } 
        
        catch (error) {
            console.log(error.code)
            if (error.code === "auth/user-not-found" || error.code === "auth/missing-password" || error.code === "auth/wrong-password") {
                setError("Su correo o contraseña está incorrecta")
            }
            else if (error.code === "auth/invalid-email") {
                setError("Por favor ingresar un correo válido")
            }
        }

        
    }

    const handleGoogle = async (e) => {
        e.preventDefault()
        await auth.loginWithGoogle()
        navigate('/home')
    }

    return(
    

     

      
            <div className="container">
              <div>
      
                <img src={inicio} />
              </div>
              <div className="header">
             <h1 className="title">Yupichat</h1>
            </div>
              <div className="form">
                <h2>Iniciar sesión</h2>
                <div className="form-group">
               
      
                  <input type="email" id="email" name="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input type="password" id="password" name="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="btn" onClick={handleLogin}>Iniciar sesión</button>
              </div>
            </div>
          );
        }
      
    
    


export default Login;