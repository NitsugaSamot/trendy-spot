import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import { orderByName, filterByBrand, refresh,  filterPrice } from "../../redux/actions";
import "./filter.css";

const Filter = () => {
  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const allClothes2 = useSelector((state) => state.allClothes2);

  const handleFilterBrandSelect = (event) => {
    dispatch(refresh());
    dispatch(filterByBrand(event.target.value));
  };

  const dispatch = useDispatch();
  const [filterBrands, setFilterBrands] = useState([]);

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const calculateUniqueBrands = () => {
    const uniqueBrands = allClothes2.reduce((acc, product) => {
      if (!acc.includes(product.productbrand)) {
        acc.push(product.productbrand);
      }
      return acc;
    }, []);
    setFilterBrands(uniqueBrands);
  };

  useEffect(() => {
    // Ejecutar la función para calcular las marcas únicas
    const delay = setTimeout(calculateUniqueBrands, 3000);
    return () => clearTimeout(delay);
  }, [allClothes2]);


  const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
  };

  const handleClickPrice = () => {
      dispatch(filterPrice(price.minPrice, price.maxPrice));
  };

  return (
    <div className="containerFilter">
      <h2>Order</h2>
      <select name="order" onChange={handleOrderSelect}>
        <option value="1">Name A-Z</option>
        <option value="2">Name Z-A</option>
      </select>
      <h2>Brand</h2>

      <select name="order" onChange={handleFilterBrandSelect}>
        {filterBrands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <h2>Price</h2>
      <div className="containerPrice">
        <label>
          <input
            type="number"
            name="minPrice"
            value={price.minPrice}
            onChange={handleFilterPrice}
          />
          <input
            type="number"
            name="maxPrice"
            value={price.maxPrice}
            onChange={handleFilterPrice}
          />
        </label>
      </div>
      <button className="btnPrice" onClick={handleClickPrice}>
        Price
      </button>
    </div>
  );
};

export default Filter

