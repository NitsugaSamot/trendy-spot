import "./App.css";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import Nav from "./components/nav/nav";
import { Routes, Route, useLocation } from "react-router-dom";
import { getAllClothes, initializeCart } from "./redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//* Mercado Pago
import Product from "./MercadoPago/Product";
import ConfirmationPage from "./MercadoPago/ConfirmationPage";
import Cart from "../src/components/nav/cart"



function App() {
  const dispatch = useDispatch()
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    console.log(storedCart);
    dispatch(getAllClothes());
    dispatch(initializeCart(storedCart))
  }, [dispatch, storedCart]);


  const location = useLocation();

  return (
    <div>


      {!location.pathname.startsWith('/detail') && !location.pathname.startsWith('/confirmation') && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mercado" element={<Product />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
