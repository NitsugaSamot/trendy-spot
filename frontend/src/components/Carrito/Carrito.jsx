import React from 'react'
import NavClient from '../nav-client/NavClient'
import { Outlet, Navigate } from "react-router-dom"
import Filter from '../filter/filter'
import Home from '../home/home'
import './styles.css'
import Nav from '../nav-client/NavClient'

const Carrito = () => {
  return (
    <>
      <div className='containerDiv'> 
            <Nav/>

            <Filter/>

            <Home/>
      </div>

    </>
  )
}

export default Carrito