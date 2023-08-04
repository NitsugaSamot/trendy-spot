import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchName } from "../../redux/actions";

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
    <div>
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

  // const dispatch = useDispatch();

  // // const handleSubmit = (e) => {
  // //   e.preventDefault();
  // //   dispatch(getRecipesByName(search));
  // //   setSearch("");
  // // };