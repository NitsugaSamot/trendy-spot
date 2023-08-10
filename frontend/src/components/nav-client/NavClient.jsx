import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import imageLogo from './trendy-spot-logo.png'
import './nav.css'
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Nav = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const {closeSession} = useAuth()

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    setSearch("");
  };

  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="containerNav">
      <NavLink to="/">
        <img src={imageLogo} alt="logo-home" className="logoHome" />
      </NavLink>
      
      {!location.pathname.startsWith('/detail') && <form onSubmit={handleSubmit}>
      <input
       className="search"
        type="text"
        placeholder="Search your clothes"
        value={search}
        onChange={handleInputName}
      />
      <button className="btnSearch" type="submit">Search</button>
      </form>}

      <NavLink  to="/create">
        <button className='btnSearch'>create</button>
      </NavLink>

      {/* <NavLink  to="/logout"> */}
        <button 
            className='btnSearch'
            onClick={closeSession} 
          >Cerrar Sesión</button>
      {/* </NavLink> */}
    </div>
  );
};
export default Nav;
