import  { useState } from "react";
import { Link } from "react-router-dom";
import './nav.css'
// import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import imageLogo from './trendy-spot-logo.png'
import './nav.css'

const Nav = () => {
  const[name, setName] = useState('')

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
      <form onSubmit={handleSubmit}>
        <input
        className="search"
          type="text"
          placeholder="¿Qué quieres buscar?"
          value={search}
          onChange={handleInputName}
        />
        <button className="btnSearch" type="submit">Buscar</button>

      </form>

      <NavLink  to="/create">
        <button className='btnSearch'>create</button>
      </NavLink>
    </div>
  );
};
export default Nav;

  // const dispatch = useDispatch();

  // // const handleSubmit = (e) => {
  // //   e.preventDefault();
  // //   dispatch(getRecipesByName(search));
  // //   setSearch("");
  // // };