import "./App.css";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/nav/nav";
import { getAllClothes } from "./redux/actions";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//* Mercado Pago
import Product from "./MercadoPago/Product";
import ConfirmationPage from "./MercadoPago/ConfirmationPage";



function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);
  
  const location = useLocation();

  // cambie el location de detail a mercado!
  // importe product
  return (
    <div>

      
      {!location.pathname.startsWith('/confirmation') && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mercado" element={<Product />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct/>} />
        <Route path='/confirmation' element={<ConfirmationPage/>} />
      </Routes>
    </div>
  );
}

export default App;
