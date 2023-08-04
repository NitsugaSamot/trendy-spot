import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";
import imageLogo from "../../assets/trendy-spot-logo.png"
import "./nav.css"
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

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
      <NavLink to="/create">
        <button>create</button>
      </NavLink>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="¿Qué quieres buscar?"
          value={search}
          onChange={handleInputName}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};
export default Nav;
