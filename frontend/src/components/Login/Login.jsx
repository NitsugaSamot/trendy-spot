import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Login = () => {
  return (
    <>
        <h1 className="text-sky-600 font-black text-6xl capitalize">
          Inicia Sesión Y administra tus 
          <span className="text-slate-700"> Proyectos</span>
        </h1>



        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit='{handleSubmit}'
            >
            <div className="my-5">
                <label 
                  className="uppercase text-gray-700 block text-xl font-bold"
                  htmlFor="email">
                      Email
                  </label>
                
                  <input 
                      id="email"
                      type="email"
                      placeholder="Email de Registro"
                      className="w-full mt-3 p-3 border rounded bg-gray-50"
                      value='{email}'
                      onChange='{ e=> setEmail(e.target.value)}'
                  />

            </div>

            <div className="my-5">
                <label 
                  className="uppercase text-gray-700 block text-xl font-bold"
                  htmlFor="password">
                      Password
                  </label>
                
                  <input 
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="w-full mt-3 p-3 border rounded bg-gray-50"
                      value='{password}'
                      onChange='{ e=> setPassword(e.target.value)}'
                 />


            </div>

            <input 
                type="submit" 
                value="Iniciar Sesión"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:ng-sky-800 transition-colors"    
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
