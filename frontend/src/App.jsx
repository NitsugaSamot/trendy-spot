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

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ['/login', '/register', '/confirm'];

  const shouldShowNav = !pathsWithoutNav.some(path => location.pathname.startsWith(path));

  return (
    <div>
      {shouldShowNav && <Nav />}
      
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
