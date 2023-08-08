import "./App.css";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import CreateProduct from "./components/createProduct/createProduct";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/nav/nav";

function App() {

  const location = useLocation();

  return (
    <div>
      {!location.pathname.startsWith('/detail') && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path='/create' element={<CreateProduct/>} />
      </Routes>
    </div>
  );
}

export default App;
