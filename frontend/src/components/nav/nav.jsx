import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClothes, searchName, removeFromCart } from "../../redux/actions";
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
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  },[cart]);

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


  const handleEmptyCart = () => {
    cart.forEach(item => {
      dispatch(removeFromCart(item.id));
    });
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
          <img src={imageCart} alt="Carrito" className="icon-image" />
          {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
        </div>
        {cartVisible && (
          <div className="cart-popup">
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price * item.quantity}</p>
                  <button
                    className="remove-button"
                    onClick={() => dispatch(removeFromCart(item.id))
                    }
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-total">
              Total: ${totalPrice}
            </div>
            <button className="empty-cart-button" onClick={handleEmptyCart}>
            Empty Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Nav;
