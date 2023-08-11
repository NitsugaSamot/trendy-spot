import { NavLink } from "react-router-dom";
// import { initMercadoPago } from '@mercadopago/sdk-react';
// import axios from "axios";
// import { useState, useEffect } from "react";

import './card.css'

const Card = ({ image, id, name, price, productbrand }) => {
  // Inicialización de Mercado Pago con tu clave pública
  // initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");

  // Estado local para almacenar la información del producto seleccionado
  // const [clotes, setClotes] = useState({
  //   id: "",
  //   name: "",
  //   image: "",
  //   price: "",
  //   quantity: 1
  // })

  // Función para crear una preferencia de pago
  // const createPreference = async () => {
  //   try {
  //     // Envía una petición POST al servidor con la información del producto
  //     const response = await axios.post("http://localhost:3004/mercadopago/order", clotes)
  //     // Obtén el link para redirigir al cliente a la página de pago
   
  //     const link = response.data.response.body.init_point
  //     //Redirige al cliente a la página de pago
  //     window.location.href = link;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  // Efecto secundario para llamar a la función createPreference después de que el estado clotes se haya actualizado
  // useEffect(() => {
  //   if (clotes.id) {
  //     createPreference();
  //   }
  // }, [clotes]);

  // Manejador para el botón de compra
  // const handleBuy = () => {
  // Actualiza el estado clotes con la información del producto seleccionado
  //   setClotes({
  //     id: id,
  //     name: name,
  //     image: image,
  //     quantity: 1,
  //     price: price,
  //   })
  // };

  return (
    <div className="card">
      <NavLink to={`/detail/${id}`}>
        <img className="" src={image} alt={name} width={"300px"} />
        <hr />
        <h4 className="h5">{name}</h4>
        <h3 className="h5">{productbrand}</h3>
        <hr />
        <h2 className="price">$ {price}</h2>
        <hr />
      </NavLink>
      {/* <button onClick={handleBuy}>Buy</button> */}
    </div>
  );
};

export default Card;
