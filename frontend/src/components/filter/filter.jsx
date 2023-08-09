import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./filter.css";

import { orderByName, filterByBrand, refresh,  filterPrice, filterPriceAndBrand } from "../../redux/actions";
import "./filter.css";

// import {
//   // orderByName,
//   filterByBrand,
//   filterPrice,
// } from "../../redux/actions";
import './filter.css';


const Filter = () => {
  const [price, setPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  const allClothes2 = useSelector((state) => state.allClothes2);


  const handleFilterBrandSelect = (event) => {
    setObjToFilter({ ...objToFilter, [event.target.name]: event.target.value });
    if (objToFilter.minPrice && objToFilter.maxPrice) {
      dispatch(filterPriceAndBrand(objToFilter));
    } else {
      dispatch(filterByBrand(event.target.value));
    }
    // onPageChange(1);
  };

const handleFilterPrice = (event) => {
    setPrice({ ...price, [event.target.name]: event.target.value });
    setObjToFilter({ ...objToFilter, [event.target.name]: event.target.value });
  };

const handleClickPrice = () => {
    if (price.minPrice >= 100 && price.maxPrice <= 10000);
    if (objToFilter.brand) {
      dispatch(filterPriceAndBrand(objToFilter));
    } else {
      dispatch(filterPrice(price));
    }
    // onPageChange(1);
  };

const [objToFilter, setObjToFilter] = useState({
    brand: "",
    minPrice: "",
    maxPrice: "",
  });
  // const handleFilterBrandSelect = (event) => {
  //   dispatch(refresh());
  //   dispatch(filterByBrand(event.target.value));
  // };


  const dispatch = useDispatch();
  

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


  const filterBrands = [];

  const brands = allClothes2.filter((product) => {
    if (!filterBrands.includes(product.productbrand)) {
      filterBrands.push(product.productbrand);
    }
  });

  // const handleFilterBrandSelect = (event) => {
  //   // dispatch(refresh());
  //   dispatch(filterByBrand(event.target.value));
  // };


  // const handleFilterPrice = (event) => {
  //   setPrice({ ...price, [event.target.name]: event.target.value });
  // };


  // const handleClickPrice = () => {
  //     dispatch(filterPrice(price.minPrice, price.maxPrice));
  // };

  // const handleClickPrice = () => {
  //   if (price.minPrice >= 100 && price.maxPrice <= 10000)
  //   dispatch(filterPrice(price));
  // };


  return (
    <div className="containerFilter">
      <h4>Order</h4>
      <select className="form-select"   name="order" onChange={handleOrderSelect}>
      <option value="" disabled selected>Order by Name</option>
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

      <h4>Brand</h4>
      <select className="form-select" name="order" onChange={handleFilterBrandSelect}>
        <option value="" disabled selected>Order by Brand</option>
        { filterBrands.map((brand, index) => ( 
          
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select >
      <h4>Price</h4>

      <div className="containerPrice">
        <label>
          <input
            className="inputPrice"
            type="number"
            name="minPrice"
            value={price.minPrice}
            onChange={handleFilterPrice}
            placeholder="Price Min"
          />
          <input
            className="inputPrice"
            type="number"
            name="maxPrice"
            value={price.maxPrice}
            onChange={handleFilterPrice}
            placeholder="Price Max"
          />
        </label>
      </div>
      <button className="btnPrice" onClick={handleClickPrice}>
        Search 
      </button>
    </div>
  );
};

export default Filter

