import "./home.css";
import Card from "../card/card";
import banner from "../../assets/Home.png";
import Filter from "../filter/filter";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllClothes } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allClothes1 = useSelector((state) => state.allClothes1);
console.log(allClothes1)

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);

  // Calcular el índice inicial y final de los pokemons a mostrar en la página actual

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allClothes1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular la cantidad total de páginas

  const totalPages = Math.ceil(allClothes1.length / productsPerPage);

  if (allClothes1.length === 0) {
    return <div>Loading...</div>;
  }
  return (
  <div>
    <img src={banner} className="background-image" />
    <div className="container py-3">
      <Filter />
      <div className="row">
      {currentProduct.map((product, index) => (
         <div className="col-md-4 h-25 cardsHome" key={index}>
        <Card 
          key={product.id}
          id={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
          productbrand={product.productbrand}
        />
        </div>
      ))}
      </div>
  </div>

      <div className="paginado">
          {Array.from({ length: totalPages }, (_, index) => (
            <button className="pagina"
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
            
          ))}
      </div>
    </div>
  );
};

export default Home;