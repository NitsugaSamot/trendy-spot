import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClothes, searchName, removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from "axios";
import imageCart from "../../assets/cart.png";
import imageLogo from '../../assets/trendy-spot-logo.png';
import './nav.css'

const Nav = () => {
  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");

  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // CARRITO //
  const cart = useSelector((state) => state.cart);
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  // Calcular el precio total del carrito cada vez que cambie //
  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);
  
  const orderData = {
    quantity: 1,
    name: "Compra en TrendySpot",
    price: totalPrice
  }
  
  const handleBuy = () => {
    const createPreference = async () => {
      try {
        const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
        const link = response.data.response.body.init_point;
        window.location.href = link;
        handleEmptyCart()
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
    createPreference();
  };

  const handleIncrement = (itemId) => {
    dispatch(increaseQuantity(itemId));
  };
  
  const handleDecrement = (itemId) => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleEmptyCart = () => {
    cart.forEach(item => {
      dispatch(removeFromCart(item.id));
    });
  };

  const handleRefresh = () => {
    dispatch(getAllClothes());
    window.scrollTo(0, 400);
  }

  const handleClick = (event) => {
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
      
      <div>
      <input
       className="search"
        type="text"
        placeholder="Search your clothes"
        value={search}
        onChange={handleInputName}
      />
      <button onClick={handleClick} className="btnSearch" type="submit">Search</button>
      </div>
      
      
      {location.pathname === '/'  && <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>}
      <NavLink  to="/create">
        <button className='btnSearch'>Create</button>
      </NavLink>

      <NavLink  to="/login/register">
        <button className='btnSearch'>Sign up</button>
      </NavLink>
      
      {/* Contenedor del icono del carrito */}
    <div className="cart-icon-container">
      
      <div className="cartDiv">
      <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
        {/* Icono del carrito */}
        <img src={imageCart} alt="Carrito" className="icon-image" />
        {/* Mostrar cantidad de elementos en el carrito */}
        <div className="bak-cart-count">
          <span className="cart-count">{cart.length}</span>
          </div>
      </div>
      </div>
      {/* Mostrar el contenido del carrito si está visible */}
      {cartVisible && (
        <div className="cart-popup">
          <div className="cart-items">
            {/* Mostrar los elementos en el carrito */}
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <p>{item.name}</p>
                  <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
                <p>Cantidad: {item.quantity}</p>
                  <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
                <div>
                </div>
                <p>Precio: ${item.price * item.quantity}</p>
                {/* Botón para eliminar un elemento del carrito */}
                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {/* Mostrar el precio total del carrito */}
          <div className="cart-total">
            Total: ${totalPrice}
          </div>
          {/* Botón para vaciar el carrito */}
          <div className="maxDiv">
          <button className="empty-cart-button" onClick={handleEmptyCart}>
            Empty Cart
          </button>
          {/* Botón para comprar */}
          <button className="empty-cart-button" onClick={handleBuy}>
            Buy
          </button>
          </div>
        </div>
      )}
      
      </div>
    </div>
  );
};
export default Nav;
