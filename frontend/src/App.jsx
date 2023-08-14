import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";

import "./App.css";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import CreateProduct from "./views/createProduct/createProduct";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/nav/nav";
import { Login } from "./components/Login/Login";
import Register from "./components/Login/Register";
import ConfirmAccount from "./components/Login/ConfirmAccount";
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { getAllClothes } from "./redux/actions";

//* Mercado Pago
import Product from "./MercadoPago/Product";
import ConfirmationPage from "./MercadoPago/ConfirmationPage";



function App() {
  const dispatch = useDispatch()
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    console.log(storedCart);
    dispatch(getAllClothes());
  }, [dispatch]);

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ['/login', '/register', '/confirm', '/logged_in'];

  const shouldShowNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

  return (
    <div>
      <AuthProvider>

      {shouldShowNav && <Nav />}
      
      
          <Routes>
              <Route path='/' element={<AuthLayout/>}>
                  <Route path="/" element={<Home />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path='create' element={<CreateProduct/>} />
                    <Route path='login' element={<Login/>} />
                    <Route path='login/register' element={<Register/>} />
                    <Route path='confirm/:id' element={<ConfirmAccount/>} />
                    <Route path="/" element={<Home />} />
                  <Route path="mercado" element={<Product />} />
                  <Route path='/confirmation' element={<ConfirmationPage />} />

              <Route/>

{/* protectedRoutes */}

                <Route path="/logged_in" element={<ProtectedRoutes/>}>
                    <Route index element={<Carrito/>} />
                </Route>
            </Route>

            
          </Routes>
      </AuthProvider>




      {/* {!location.pathname.startsWith('/detail') && !location.pathname.startsWith('/confirmation') && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail/>} />
        <Route path='/create' element={<CreateProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/login/register' element={<Register/>} />
        <Route path='/confirm/:id' element={<ConfirmAccount/>} />
      </Routes>
    </div>
  );
  */}

export default App;
