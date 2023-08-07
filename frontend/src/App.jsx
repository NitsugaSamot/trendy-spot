import "./App.css";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import Formulario from "./components/loginForm/Formulario"
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct/>} />
        <Route path="/login" element={<Formulario/>} />
      </Routes>
        
      <Footer />
    </div>
  );
}

export default App;
