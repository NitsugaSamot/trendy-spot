import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllClothes, searchName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import imageLogo from "../../assets/trendy-spot-logo.png";
import "./nav.css";

const Nav = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRefresh = () => {
    dispatch(getAllClothes());
    window.scrollTo(0, 400);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    navigate("/");
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

      <div>
        <input
          className="search"
          type="text"
          placeholder="Search your clothes"
          value={search}
          onChange={handleInputName}
        />
        <button className="btnSearch" type="submit" onClick={handleClick}>
          Search
        </button>
      </div>

      {location.pathname === "/" && (
        <button className="btnRefresh" onClick={handleRefresh}>
          Refresh
        </button>
      )}
      <NavLink to="/create">
        <button className="btnSearch">create</button>
      </NavLink>

      <NavLink to="/login/register">
        <button className="btnSearch">Registrate</button>
      </NavLink>
    </div>
  );
};
export default Nav;
