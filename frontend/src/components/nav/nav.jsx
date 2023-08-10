import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClothes, searchName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import imageLogo from './trendy-spot-logo.png'
import './nav.css'
import { useLocation, useNavigate } from "react-router-dom";
import imageCart from "../nav/cart.png"

const Nav = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Carrito 
  const cart = useSelector((state) => state.cart)
  const [cartVisible, setCartVisible] = useState(false);

  useEffect(()=> {
    
  })


  const handleRefresh = () => {
    dispatch(getAllClothes());
    window.scrollTo(0, 500);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    navigate("/")
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

      {location.pathname === '/' && <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>}
      <NavLink to="/create">
        <button className='btnSearch'>create</button>
      </NavLink>

      <div className="cart-icon-container">
        <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
          <img src={imageCart} alt="Carrito" />
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </div>
        {cartVisible && (
          <div className="cart-popup">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Nav;
