import { useState, useEffect } from 'react';
import "./home.css";
import Card from "../card/card";
import banner from '../../assets/Home.png'
import Filter from "../filter/filter";
import { useSelector } from "react-redux";

const Home = () => {
  const allClothes1 = useSelector((state) => state.allClothes1);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1)

  }, [allClothes1]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 400); // Scroll hacia arriba
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = allClothes1.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allClothes1.length / productsPerPage);

  if (allClothes1.length === 0) {
    return <div>Loading...</div>;
  }

  return (
  <div>
    <img src={banner} className="background-image" />
    <div className="container py-3">
      <Filter onPageChange={(page) => setCurrentPage(page)}/>

      <div className="row">
        {currentProduct.map((product, index) => (
          <div className="col-sm-12 col-md-2 col-lg-4 col-xl-4" key={index}>
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

      <div className="d-flex justify-content-center align-items-center py-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr; Anterior
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`btn btn-outline-primary ${currentPage === index + 1 ? 'active' : ''} me-2`}
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
          
        ))}
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente &rarr;
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home;
