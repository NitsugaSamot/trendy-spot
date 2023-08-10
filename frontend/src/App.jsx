import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./components/Layouts/AuthLayout";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";

import "./App.css";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import Nav from "./components/nav/nav";
import { Login } from "./components/Login/Login";
import Register from "./components/Login/Register";
import ConfirmAccount from "./components/Login/ConfirmAccount";
import Carrito from "./components/Carrito/Carrito";
import {AuthProvider} from './context/AuthPrivider'


function App() {
  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ['/login', '/register', '/confirm', '/logged_in'];

  const shouldShowNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

  return (
    <div>
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
