import React from 'react'
import NavClient from '../nav-client/NavClient'
import { Outlet, Navigate } from "react-router-dom"
import Filter from '../filter/filter'
import Home from '../home/home'
import './styles.css'

const Carrito = () => {
  return (
    <>
      <div className='containerDiv'> 
            <NavClient/>

            <Filter/>

            <Home/>
      </div>

    </>
  )
}

export default Carrito