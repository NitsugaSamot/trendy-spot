import axios from "axios";
import {
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  GET_ALL,
  SEARCH_NAME,
  REFRESH,
  GET_ALL_BRANDS,
  SET_SELECTED_BRAND
} from "./action-types";

export const getAllClothes = () => {
  return async function (dispatch) {
    try {
      const all = await axios.get("http://localhost:3004/products");
      return dispatch({
        type: GET_ALL,
        payload: all.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};
export const filterByBrand = (brandName) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3004/products/brands/${brandName}`
      );
      return dispatch({
        type: FILTER_BY_BRAND,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// export const filterByBrand = (payload) => {
//   return {
//     type: FILTER_BY_BRAND,
//     payload,
//   };
// };

export const setSelectedBrand = (brandName) => {
  return {
    type: "SET_SELECTED_BRAND",
    payload: brandName,
  };
};



export const searchName = (payload) => {
  return async function (dispatch) {
    try {
      const productByName = await axios.get(
        `http://localhost:3004/products/?name=${payload}`
      );
      return dispatch({
        type: SEARCH_NAME,
        payload: productByName.data,
      });
    } catch (error) {
      console.log(error)
      alert(error.response.data.error);
    }
  };
};



export const refresh = () => {
  return {
    type: REFRESH,
    paylaod: "",
  };
};

/* NO ESTA IMPLEMENTADA EN EL FRONT */
export function getAllBrands() {
  return async function (dispatch) {
    try {
      const response = await axios.get('http://localhost:3004/products/brands')
      const brands = response.data
      dispatch({
        type: GET_ALL_BRANDS,
        paylaod: brands
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// actions.js
export const filterPrice = (minPrice, maxPrice) => {
  return async function (dispatch, getState) {
    const { selectedBrand } = getState(); // Obtener la marca seleccionada del estado

    if (selectedBrand) {
      // Si hay una marca seleccionada, filtrar por precio solo para esa marca
      const response = await axios.get(
        `http://localhost:3004/products/brands/${selectedBrand}?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      dispatch({
        type: FILTER_BY_PRICE,
        payload: response.data,
      });
    } else {
      // Si no hay una marca seleccionada, aplicar el filtro a todos los productos
      const response = await axios.get(
        `http://localhost:3004/products/search?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      dispatch({
        type: FILTER_BY_PRICE,
        payload: response.data,
      });
    }
  };
};

// export const filterPrice = (minPrice, maxPrice) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(
//         `http://localhost:3004/products/search?minPrice=${minPrice}&maxPrice=${maxPrice}`
//       );
//       return dispatch({
//         type: FILTER_BY_PRICE,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

/* NO LOGRE IMPLEMENTARLA AL FRONT */
export const filterByBrandAndPrice = (brandName, minPrice, maxPrice) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3004/products/filter?brandName=${brandName}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      if (response.status === 200 && response.data.length > 0) {
        dispatch({
          type: FILTER_BY_BRAND,
          payload: response.data,
        });
      } else {

        dispatch({
          type: FILTER_BY_BRAND, 
          payload: [],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
};



