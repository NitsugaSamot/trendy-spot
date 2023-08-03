import "./home.css";
import Card from "../card/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllClothes } from "../../redux/actions";
// import { allProducts, orderPrice } from "../../redux/actions";

const Home = () => {
  const dispatch = useDispatch();
  const allClothes1 = useSelector((state) => state.allClothes1);
  
  //const [order, setOrder] = useState("");
  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 12;

  useEffect(() => {
    dispatch(getAllClothes());
  }, [dispatch]);

  // Calcular el índice inicial y final de los pokemons a mostrar en la página actual

  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProduct = allClothes1.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calcular la cantidad total de páginas

  // const totalPages = Math.ceil(allClothes1.length / productsPerPage);

  // if (allClothes1.length === 0) {
  //   return <div>Loading...</div>;
  // }

  //  const handleOrder = (event) =>{
  //   event.preventDefault()
  //   dispatch(filterOrder(event.target.value))
  //   setCurrentPage(1)
  //   setOrder(`Ordenado ${event.target.value}`)
  //     }
  console.log(allClothes1);

  return (
    <div>
      {/* <div className="Paginado"> */}
      {/* <select onChange={handleOrder}>
                <option value={'asc'}>asc</option>
                <option value={'des'}>des</option>
            </select> */}
      {/* {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setCurrentPage(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>

        ))}
      </div>
      <div className="Cards">
      {currentProduct.map((product) => (
        <Card
          key={product.id}
          name={product.name}
          id={product.id}
          img={product.image}
          type1={product.type1}
          type2={product.type2}
        />
      ))}
      </div> */}
      {allClothes1.map((product) => {
        return (
          <Card
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        );
      })}
    </div>
  );
};

export default Home;
