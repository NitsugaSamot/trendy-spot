import axiosClient from "../../contextClient/config/axiosClient";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../contextClient/hooks/useAuth";
import imageCart from "../../assets/cart.png";
import imageCart2 from "../../assets/cart2.png";
import imageLogo from "../../assets/trendy-spot-logo.png";
import imageUser from '../../assets/user-icon.png'
import "./nav.css";
import {
  getAllClothes,
  searchName,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions";

const Nav = () => {
  const { auth } = useAuth();

  console.log(auth)

  const { closeSession } = useAuth();

  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  // Obtener el estado del carrito desde el store usando useSelector
  const cart = useSelector((state) => state.cart);
  // Estado local para controlar la visibilidad del carrito y el precio total
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calcular el precio total del carrito cada vez que cambie
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const orderData = {
    quantity: 1,
    name: "Compra en TrendySpot",
    price: totalPrice,
  };

  const savePurchases = {
    items: cart.map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
    })),
    total: totalPrice,
  };

  console.log(savePurchases)


  const handleBuyAndConfirm = async () => {
    event.preventDefault();
  
    try {
      const { id, title, price, quantity, description } = savePurchases.items[0];
  
      // Realizar la acción de confirmar la compra
      await axiosClient.post(`/users/${auth.id}/purchases`, {
        id,
        name: title,
        price,
        quantity,
        description,
      });
  
      // Realizar la acción de crear la preferencia de MercadoPago
      const response = await axiosClient.post("/mercadopago/order", orderData);
      const link = response.data.response.body.init_point;
      window.location.href = link;
  
      // Vaciar el carrito
      handleEmptyCart();
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const confirmBuy = async () => {
    event.preventDefault();
    try {
      const { id, title, price, quantity, description } = savePurchases.items[0];
      await axiosClient.post(`/users/${auth.id}/purchases`, {
        id,
        name: title,
        price,
        quantity,
        description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = () => {
    const createPreference = async () => {
      try {
        const response = await axiosClient.post("/mercadopago/order", orderData);
        const link = response.data.response.body.init_point;
        window.location.href = link;
        handleEmptyCart()
        console.log(savePurchases);
        // await axiosClient.post(`/users/${id}/purchases`,savePurchases)
        const { id, title, price, quantity, description } = savePurchases.items[0];
        await axiosClient.post(`/users/${auth.id}/purchases`, {
          id,
          name: title,
          price,
          quantity,
          description,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  
    // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
    createPreference();
  };

  const handleIncrement = (itemId, size, color) => {
    dispatch(increaseQuantity(itemId, size, color));
  };

  const handleDecrement = (itemId, size, color) => {
    dispatch(decreaseQuantity(itemId, size, color));
  };

  // Manejar la acción de refrescar la lista de prendas
  const handleRefresh = () => {
    dispatch(getAllClothes());
    window.scrollTo(0, 500);
  };

  // Manejar el envío del formulario de búsqueda
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    navigate("/");
    setSearch("");
  };

  // Manejar la entrada de texto en el campo de búsqueda
  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  // Vaciar el carrito, eliminando todos los elementos
  const handleEmptyCart = () => {
    cart.forEach((item) => {
      dispatch(removeFromCart(item.id, item.color, item.size));
    });
  };

  return (
    <div className="containerNav">
      {/* Logo del enlace de inicio */}

      {auth.token ? (
        <NavLink to="/logged_in">
          <img src={imageLogo} alt="logo-home" className="logoHome" />
        </NavLink>
      ) : (
        <NavLink to="/">
          <img src={imageLogo} alt="logo-home" className="logoHome" />
        </NavLink>
      )}

      {/* Formulario de búsqueda */}
      {!location.pathname.startsWith("/detail") && (
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search your clothes"
            value={search}
            onChange={handleInputName}
          />
          <button className="btnSearch" type="submit">
            Search
          </button>
        </form>
      )}

      {/* Botón de refrescar en la página principal */}
      {location.pathname === "/" || location.pathname === "/logged_in" ? (
        <button className="btnRefresh" onClick={handleRefresh}>
          Refresh
        </button>
      ) : null}
      {/* Enlace para crear una nueva prenda */}
      <NavLink to="/create">
        <button className="btnSearch">create</button>
      </NavLink>

      {/* Contenedor del icono del carrito */}
      <div className="cart-icon-container">
        <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
          {/* Icono del carrito */}
          {cart.length > 0 ? (
            <img src={imageCart2} alt="Carrito" className="icon-image" />
          ) : (
            <img src={imageCart} alt="Carrito" className="icon-image" />
          )}

          {/* Mostrar cantidad de elementos en el carrito */}
          {cart.length > 0 && (
            <div className="bak-cart-count">
              <span className="cart-count">{cart.length}</span>
            </div>
          )}
        </div>
        {/* Mostrar el contenido del carrito si está visible */}
        {cartVisible && (
          <div className="cart-popup">
            <div className="cart-items">
              {/* Mostrar los elementos en el carrito */}
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <p>{item.name}</p>
                  <hr />
                  <p>{item.size}</p>
                  <hr />
                  <p>{item.color}</p>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleDecrement(item.id, item.size, item.color)
                    }
                  >
                    -
                  </button>
                  <p>Cantidad: {item.quantity}</p>
                  <button
                    className="quantity-button"
                    onClick={() =>
                      handleIncrement(item.id, item.size, item.color)
                    }
                  >
                    +
                  </button>
                  <div></div>
                  <p>Precio: ${item.price * item.quantity}</p>
                  {/* Botón para eliminar un elemento del carrito */}
                  <button
                    className="remove-button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id, item.color, item.size))
                    }
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
            {/* Mostrar el precio total del carrito */}
            <div className="cart-total">Total: ${totalPrice}</div>
            {/* Botón para vaciar el carrito */}

            <div className="maxDiv">
              <button className="empty-cart-button" onClick={handleEmptyCart}>
                Empty Cart
              </button>

              {auth.token ? (
                <>
                <button className="buy" onClick={handleBuy}>
                  Buy
                </button>

                <button className="buy" onClick={handleBuyAndConfirm}>
                Buy
                </button>

              </>
              ) : (
                <>
                  <button className="empty-cart-button buyDisabled" disabled>
                    Buy 2
                  </button>
                  <p className="alert">
                    Ten en cuenta que debes estar logeado para poder concretar
                    la compra
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {
   (
    auth.token ? (

      <>

        <NavLink to="/logged_in/edit-profile">
            <img src={imageUser} alt="logo-home" />
        </NavLink>

        <NavLink  to="/">
        <button 
            className='btnSearch'
            onClick={closeSession} 
          >Log Out</button>
        </NavLink>

        </>
       ) : (
        <NavLink to="/login">
        <button className='btnSearch'>Sing Up</button>
        </NavLink>

    )
  )
}
    </div>
  );
};
export default Nav;



    
    
  // const savePurchases2 = {
  //   items: cart.map(item => ({
  //     id: savePurchases.items[0].id,
  //     title: savePurchases.items[0].title,
  //     price: savePurchases.items[0].price,
  //     description: savePurchases.items[0].description,
  //     quantity: savePurchases.items[0].quantity,
  //   })),
  //   total: totalPrice,
  // };
