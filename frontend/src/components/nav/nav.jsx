import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllClothes, searchName } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import imageLogo from './trendy-spot-logo.png'
import './nav.css'
import { useLocation, useNavigate } from "react-router-dom";
import imageCart from "../nav/cart.png"

const Nav = ({ handleAddToCart }) => {
  // Obtener la ubicación actual de la página
  const location = useLocation();

  // Estado para almacenar el valor del campo de búsqueda
  const [search, setSearch] = useState("");

  // Utilizar el dispatcher de Redux para despachar acciones
  const dispatch = useDispatch();

  // Hook de React Router para la navegación
  const navigate = useNavigate();

  // Estado para el carrito de compras y su visibilidad
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  // Cargar los elementos del carrito desde el almacenamiento local al inicio
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  // Calcular el número total de artículos en el carrito
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Función para limpiar el carrito
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  // Función para refrescar la lista de prendas
  const handleRefresh = () => {
    dispatch(getAllClothes());
    window.scrollTo(0, 500);
  }

  // Manejar la presentación de los datos en el formulario de búsqueda
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    navigate("/")
    setSearch("");
  };

  // Manejar la entrada de texto en el campo de búsqueda
  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="containerNav">
      {/* Logo del enlace de inicio */}
      <NavLink to="/">
        <img src={imageLogo} alt="logo-home" className="logoHome" />
      </NavLink>

      {/* Formulario de búsqueda */}
      {!location.pathname.startsWith('/detail') && (
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search your clothes"
            value={search}
            onChange={handleInputName}
          />
          <button className="btnSearch" type="submit">Search</button>
        </form>
      )}

      {/* Botón de refrescar en la página principal */}
      {location.pathname === '/' && (
        <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>
      )}

      {/* Enlace para crear una nueva prenda */}
      <NavLink to="/create">
        <button className='btnSearch'>create</button>
      </NavLink>

      {/* Icono del carrito */}
      <div className="cart-icon">
        <div className="cart-icon-container" onClick={() => setCartVisible(!cartVisible)}>
          <img src={imageCart} alt="Carrito" />
          {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
        </div>
        {cartVisible && (
          <div className="cart-popup">
            {/* Mostrar los elementos en el carrito */}
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio: ${item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            {/* Mostrar el resumen del carrito */}
            <div className="cart-summary">
              <p>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</p>
              <button onClick={() => clearCart()}>Vaciar Carrito</button>
              <NavLink to="/cart">Ir al Carrito</NavLink>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Nav;
