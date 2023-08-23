import { useState } from 'react'
import {NavLink ,Link, useNavigate } from 'react-router-dom'
// import Alerta from '../Alerta/Alerta'
import Alerta from '../alert/alert'
import axiosClient from '../../contextClient/config/axiosClient'
// import useAuth from '../hooks/useAuth'
import useAuth from '../../contextClient/hooks/useAuth'
import './styles.css'
import imageLogo from "../../assets/trendy-spot-logo.png";
import imageUser from '../../assets/user-icon.png'
const Login = () => {

  const[email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()

    if([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      return
    }

    try {
      //Informacion requerida: email y password
      const {data} = await axiosClient.post('/users/login', {email, password})
      setAlerta({})
      //
      localStorage.setItem('token', data.token)
      setAuth(data)
      // navigate('/')
      navigate('/logged_in')

    } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
    }
  }

  const { msg } = alerta

  return (
    <>
    <div className='mainRegister'>
        <h3 className="titleLogin">
          Inicia Sesión Y haz tus  compras
        </h3>

        {msg && <Alerta alerta={alerta}/>}

        <form 
            className="formLogin"
            onSubmit={handleSubmit}
            
            >
            <div className='columnaLogin'>
            <div className="divInput">
                <label 
                  className="label"
                  htmlFor="email">
                      Email
                  </label>
                
                  <input 
                      id="email"
                      type="email"
                      placeholder="Email de Registro"
                      className="inputLogin"
                      value={email}
                      onChange={ e=> setEmail(e.target.value)}
                  />

            </div>

            <div className="divInput">
                <label 
                  className="label"
                  htmlFor="password">
                      Password
                  </label>
                
                  <input 
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="inputLogin"
                      value={password}
                      onChange={ e=> setPassword(e.target.value)}
                 />


            </div>
            </div>

             <div className='columna'>
                  <NavLink to="/">
                      <img src={imageLogo} alt="logo-home" className='logoRegister' />  
                  </NavLink>
             </div> 
            
            

            <input 
                type="submit" 
                value="Iniciar Sesión"
                className="btnLogin"    
            />


        </form>

        <nav className="navRegister">
              <Link
                className='linksRegister'
                to="register"
              >
                ¿No tienes una cuenta? Registrate
              </Link>
              <Link
                className='linksRegister'
                to="/reset-password"
              >
                Olvide mi Password
              </Link>
        </nav>
        </div>
    </>
  )
}

export default Login

// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import Alert from "../alert/alert";
// import axios from "axios";
// // import axiosClient from "../../contextClient/config/axiosClient";
// import useAuth from "../../contextClient/hooks/useAuth";
// import imageLogo from "../../assets/trendy-spot-logo.png";
// import "./styles.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [alert, setAlert] = useState({});

//   const { setAuth } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if ([email, password].includes("")) {
//       setAlert({
//         msg: "Todos los campos son obligatorios",
//         error: true,
//       });
//       return;
//     }

//     try {
//       //Informacion requerida: email y password
//       const { data } = await axios.post(
//         "https://back-trendy-app.up.railway.app/users/login",
//         {
//           email,
//           password,
//         }
//       );
//       setAlert({});
//       //
//       localStorage.setItem("token", data.token);
//       setAuth(data);
//       // navigate('/')
//       navigate("/logged_in");
//     } catch (error) {
//       setAlert({
//         msg: error.response.data.msg,
//         error: true,
//       });
//     }
//   };

//   const { msg } = alert;

//   return (
//     <>
//       <div className="mainRegister">
//         <h3 className="titleLogin">Inicia Sesión Y haz tus compras</h3>

//         {msg && <Alert alerta={alert} />}

//         <form className="formLogin" onSubmit={handleSubmit}>
//           <div className="columnaLogin">
//             <div className="divInput">
//               <label className="label" htmlFor="email">
//                 Email
//               </label>

//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email de Registro"
//                 className="inputLogin"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="divInput">
//               <label className="label" htmlFor="password">
//                 Password
//               </label>

//               <input
//                 id="password"
//                 type="password"
//                 placeholder="Password"
//                 className="inputLogin"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="columna">
//             <NavLink to="/">
//               <img src={imageLogo} alt="logo-home" className="logoRegister" />
//             </NavLink>
//           </div>

//           <input type="submit" value="Iniciar Sesión" className="btnLogin" />
//         </form>

//         <nav className="navRegister">
//           <NavLink className="linksRegister" to="register">
//             ¿No tienes una cuenta? Registrate
//           </NavLink>
//           <NavLink className="linksRegister" to="/reset-password">
//             Olvide mi Password
//           </NavLink>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default Login;
