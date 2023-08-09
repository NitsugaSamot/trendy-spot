import {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Alerta from '../Alerta/Alerta'
import axios from 'axios'

const Register = () => {

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({})

  const handleSubmit = async e => {
    e.preventDefault()

    if([name, email, password, repetirPassword].includes('')) {
      setAlerta({
      msg: 'Todos los campos son obligatorios',
      error: true
    })
     return
    }  

    name

    if(password !== repetirPassword) {
      setAlerta({
        
        msg: 'Los Passwords no coinciden',
        error: true
      })
      return
  }

  if(password.length < 6) {
    setAlerta({
      msg: 'El Password debe tener al menos 6 caracteres',
      error: true
    })
     return
  }

    setAlerta({})

    //Crear usuario de la api

    try {
      const {data} = await axios.post('http://localhost:3004/users', {name, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setName('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error) {
       setAlerta({
        msg: error.response.data.error,
        error: true
       })
    }
  }

  const {msg} = alerta

  return (
    <>
    <h1 className="titleLogin">
      Crea una cuenta para hacer tu compra
    </h1>

    {msg && <Alerta alerta={alerta} />}

    <form 
          action=""
          className=""
          onSubmit={handleSubmit}
          >
    <div className="my-5">
            <label 
              className=""
              htmlFor="name">
                  name
              </label>
            
              <input 
                  id="name"
                  type="text"
                  placeholder="Tu name"
                  className=""
                  value={name}
                  onChange={e => setName(e.target.value)}
              />

        </div>

        <div className="my-5">
            <label 
              className=""
              htmlFor="email">
                  Email
              </label>
            
              <input 
                  id="email"
                  type="email"
                  placeholder="Email de Registro"
                  className=""
                  value={email}
                  onChange={e => setEmail(e.target.value)}
              />

      </div>

        <div className="my-5">
            <label 
              className=""
              htmlFor="password">
                  Password
              </label>
            
              <input 
                  id="password"
                  type="password"
                  placeholder="Password"
                  className=""
                  value={password}
                  onChange={e => setPassword(e.target.value)}
              />


      </div>

        <div className="my-5">
            <label 
              className=""
              htmlFor="password">
                Repetir  Password
              </label>
            
              <input 
                  id="password2"
                  type="password"
                  placeholder="Repetir tu Password"
                  className=""
                  value={repetirPassword }
                  onChange={e => setRepetirPassword(e.target.value)}
              />


        </div>

        <input 
            type="submit" 
            value="Crear Cuenta"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:ng-sky-800 transition-colors"    
        />


    </form>

    <nav className="lg:flex lg:justify-between">
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/login"
          >
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link
            className='block text-center my-5 text-slate-500 uppercase text-sm'
            to="/olvide-password"
          >
            Olvide Mi Password
          </Link>
    </nav>
</>
  )
}

export default Register