import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Nav = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getRecipesByName(search));
    setSearch("");
  };

  const handleInputName = (e) => {
    setSearch(e.target.value);
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
            <button type="submit">
              Buscar
            </button>
          </form>
        </div>

  );
};
export default Nav;
