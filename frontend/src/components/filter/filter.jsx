import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";
import {
  orderByName,
  filterByBrand,
  // refresh,
  filterPrice,
} from "../../redux/actions";
import './filter.css';

const Filter = () => {
  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  // const allClothes1 = useSelector((state) => state.allClothes1);
  const allClothes2 = useSelector((state) => state.allClothes2);
  const dispatch = useDispatch();

  const handleOrderSelect = (event) => {
    dispatch(orderByName(event.target.value));
  };

  const filterBrands = [];

  const brands = allClothes2.filter((product) => {
    if (!filterBrands.includes(product.productbrand)) {
      filterBrands.push(product.productbrand);
    }
  });

  const handleFilterBrandSelect = (event) => {
    // dispatch(refresh());
    dispatch(filterByBrand(event.target.value));
  };

  const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
  };

  const handleClickPrice = () => {
    if (price.minPrice >= 100 && price.maxPrice <= 10000);
    dispatch(filterPrice(price));
    alert("hola");

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
        { filterBrands.map((brand, index) => ( 
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
        ;
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
      <button className="btnPrice" onClick={handleClickPrice}>Price</button>
    </div>
  );
};
export default Filter;
