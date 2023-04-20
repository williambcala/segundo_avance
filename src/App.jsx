import { useState } from 'react'
import './App.css'
import { authContext } from './AuthContext';




function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Aquí se podría agregar la lógica para comprobar las credenciales del usuario
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <div className="container">
        <h1>Publicaciones y Noticias</h1>
        <p>Aquí se mostrarían las publicaciones y noticias</p>
      </div>
    );
  } else {
    return (

     

      
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
}

export default App;







