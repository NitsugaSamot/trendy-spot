import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";

import "./App.css";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import Nav from "./components/nav/nav";
<<<<<<< HEAD
import { Login } from "./components/Login/Login";
import Register from "./components/Login/Register";
import ConfirmAccount from "./components/Login/ConfirmAccount";
import Carrito from "./components/Carrito/Carrito";
import {AuthProvider} from './context/AuthPrivider'


function App() {
=======
import { Routes, Route, useLocation } from "react-router-dom";
import { getAllClothes, initializeCart } from "./redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//* Mercado Pago
import Product from "./MercadoPago/Product";
import ConfirmationPage from "./MercadoPago/ConfirmationPage";



function App() {
  const dispatch = useDispatch()
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    console.log(storedCart);
    dispatch(getAllClothes());
    dispatch(initializeCart(storedCart))
  }, [dispatch, storedCart]);


>>>>>>> rober
  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ['/login', '/register', '/confirm', '/logged_in'];

  const shouldShowNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

  return (
    <div>
<<<<<<< HEAD
      {shouldShowNav && <Nav />}
      
      <AuthProvider>
          <Routes>
              <Route path='/' element={<AuthLayout/>}>
                  <Route path="/" element={<Home />} />
                    <Route path="detail/:id" element={<Detail />} />
                    <Route path='create' element={<CreateProduct/>} />
                    <Route path='login' element={<Login/>} />
                    <Route path='login/register' element={<Register/>} />
                    <Route path='confirm/:id' element={<ConfirmAccount/>} />

              <Route/>

{/* protectedRoutes */}

                <Route path="/logged_in" element={<ProtectedRoutes/>}>
                    <Route index element={<Carrito/>} />
                </Route>
            </Route>

            
          </Routes>
      </AuthProvider>

=======


      {!location.pathname.startsWith('/detail') && !location.pathname.startsWith('/confirmation') && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="mercado" element={<Product />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
      </Routes>
>>>>>>> rober
    </div>
  );
}

export default App;

// import "./App.css";
// import Home from "./components/home/home";
// import Detail from "./components/detail/detail";
// import CreateProduct from "./components/createProduct/createProduct";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Nav from "./components/nav/nav";
// import { Login } from "./components/Login/Login";
// import Register from "./components/Login/Register";
// import ConfirmAccount from "./components/Login/ConfirmAccount";

// function App() {

//   const location = useLocation();

//   return (
//     <div>
//       {!location.pathname.startsWith('/detail') && <Nav />}
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="detail/:id" element={<Detail />} />
//         <Route path='/create' element={<CreateProduct/>} />
//         <Route path='login' element={<Login/>} />
//         <Route path='/register' element={<Register/>} />
//         <Route path='/confirm/:id' element={<ConfirmAccount/>} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
