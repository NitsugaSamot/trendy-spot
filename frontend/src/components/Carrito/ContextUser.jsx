
// import { Outlet, Navigate } from "react-router-dom"
import Filter from '../filter/filter'
import Home from '../home/home'
import './styles.css'
import Nav from '../nav-client/NavClient'

const ContextUser = () => {
  return (
    <>
      <div className='containerDiv'> 
            <Nav/>
            
            <Home/>

            <Filter/>
      </div>

    </>
  )
}

export default ContextUser