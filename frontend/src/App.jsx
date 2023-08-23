import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";

import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import CreateProduct from "./views/createProduct/createProduct";

import Nav from "./components/nav/nav";
import { Login } from "./components/Login/Login";
import Register from "./components/Login/Register";
import ConfirmAccount from "./components/Login/ConfirmAccount";
import ForgetPassword from "./components/Login/ForgetPassword";
import Profile from "./components/profile/profile";
import EditProfile from './components/profile/editProfile'
import ChangePassword from "./components/profile/changePassword";

import { AuthProvider } from "./context/AuthProvider";
import ContextUser from "./components/Carrito/ContextUser";
import { NewPassword } from "./components/Login/NewPassword";




import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { getAllClothes } from "./redux/actions";
import {initializeCart} from "../src/redux/actions"
import ConfirmationPage from "./MercadoPago/confirmationPage";

import Product from './MercadoPago/Product'


import "./App.css";

function App() {
  const dispatch = useDispatch()
  
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {

    dispatch(getAllClothes());
    dispatch(initializeCart(storedCart))
  }, [dispatch, storedCart]);

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ['/login', '/register', '/confirm', '/reset-password' ,'/logged_in ', '/new-password', '/logged_in/profile', '/logged_in/changue-password', '/logged_in/edit-profile'];

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
                    <Route path='perfil' element={<perfilUser/>} />
                    <Route path='login' element={<Login/>} />


                    <Route path='login/register' element={<Register/>} />
                    <Route path='confirm/:id' element={<ConfirmAccount/>}
                     />
                    <Route path='reset-password' element={<ForgetPassword/>} />
                    <Route path='new-password/:token' element={<NewPassword/>} />

                    
                    <Route path="/" element={<Home />} />
                  <Route path="mercado" element={<Product />} />
                  <Route path='/confirmation' element={<ConfirmationPage />} />

                <Route/>

                <Route path="/logged_in" element={<ProtectedRoutes/>}>
                    <Route index element={<ContextUser/>} />

                    <Route path='/logged_in/profile' element={< Profile/>} />
                    <Route path='/logged_in/changue-password' element={< ChangePassword/>} />
                    <Route path='/logged_in/edit-profile' element={<EditProfile />} />

                </Route>
            </Route>

            
          </Routes>
      </AuthProvider>





        {/* <Route path="detail/:id" element={<Detail/>} />
        <Route path='/create' element={<CreateProduct/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/login/register' element={<Register/>} />
        <Route path='/confirm/:id' element={<ConfirmAccount/>} />
        <Route path='/confirmation' element={<ConfirmationPage/>} /> */}
      {/* </Routes> */}

    </div>
  );
}

export default App;

















      {/* {!location.pathname.startsWith('/detail') && !location.pathname.startsWith('/confirmation') && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route path="mercado" element={<Product />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
      </Routes> */}


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
