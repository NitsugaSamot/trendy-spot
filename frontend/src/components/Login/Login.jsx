import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  return (
    <>
        <h1 className="">
          Inicia Sesión Y haz tus  compras
        </h1>



        <form 
            className=""
            onSubmit=''
            >
            <div className="">
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
                      value=''
                      onChange=''
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
                      value=''
                      onChange=''
                 />


            </div>

            <input 
                type="submit" 
                value="Iniciar Sesión"
                className=""    
            />


        </form>

        <nav className="">
              <Link
                className=''
                to="register"
              >
                ¿No tienes una cuenta? Registrate
              </Link>
              <Link
                className=''
                to="register"
              >
                Olvide mi Password
              </Link>
        </nav>
    </>
  )
}
