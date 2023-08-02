import "./App.css";
import Nav from "./components/nav/nav";
import Home from "./components/home/home";
import Detail from "./components/detail/detail";
import Footer from "./components/footer/footer";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
