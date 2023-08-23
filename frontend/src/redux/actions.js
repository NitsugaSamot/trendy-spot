// import axios from "axios";
import axiosClient from "../contextClient/config/axiosClient";
import {
  ORDER_BY_NAME,
  GET_ALL,
  SEARCH_NAME,
  REFRESH,
  ADD_TO_CART,
  INITIALIZE_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  FILTER_PRODUCTS
} from "./action-types";

export const getAllClothes = () => {
  return async function (dispatch) {
    try {
      const all = await axiosClient.get(
        "/products"
      );
      return dispatch({
        type: GET_ALL,
        payload: all.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};
//OK
export function orderByName(payload) {
  return function (dispatch) {
    return dispatch({
      type: ORDER_BY_NAME,
      payload,
    });
  };
}
//OK
export const searchName = (payload) => {
  return async function (dispatch) {
    try {
      const productByName = await axiosClient.get(
        `/products/?name=${payload}`
      );
      return dispatch({
        type: SEARCH_NAME,
        payload: productByName.data,
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

//OK
export const refresh = () => {
  return {
    type: REFRESH,
    paylaod: "",
  };
};

export const filterProducts = (brand, minPrice, maxPrice) => {
  return async function (dispatch) {
    try {
      const filtered = await axiosClient.get(
        `/products/filter?brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      return dispatch({
        type: FILTER_PRODUCTS,
        payload: filtered.data,
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

export const addToCart = (item) => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TO_CART,
      payload: item,
    });
    const cartItems = getState().cart; // Obtener los elementos del carrito del estado
    localStorage.setItem("cart", JSON.stringify(cartItems)); // Actualizar el localStorage
  };
};

export const initializeCart = (cartItems) => ({
  type: INITIALIZE_CART,
  payload: cartItems,
});

export const removeFromCart = (itemId, color, size) => ({
  type: REMOVE_FROM_CART,
  payload: { itemId, color, size },
});

export const increaseQuantity = (itemId, size, color) => {
  return {
    type: INCREASE_QUANTITY,
    payload: { itemId, color, size },
  };
};

export const decreaseQuantity = (itemId, size, color) => {
  return {
    type: DECREASE_QUANTITY,
    payload: { itemId, color, size },
  };
};

















// export const filterProducts = (brand, minPrice, maxPrice) => {
//   return async function (dispatch) {
//     try {
//       let url = "http://localhost:3004/products/filter?";
//       if (brand) {
//         url += `brandName=${brand}&`;
//       }
//       if (minPrice && maxPrice) {
//         url += `minPrice=${minPrice}&maxPrice=${maxPrice}`;
//       }

//       const filteredProducts = await axiosClient.get(url);
//       return dispatch({
//         type: FILTER_PRODUCTS,
//         payload: filteredProducts.data,
//       });
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data.error);
//     }
//   };
// };



// export const filterByBrand = (brandName) => {
//   return async function (dispatch) {
//     try {
//       const response = await axiosClient.get(
//         `/products/brands/${brandName}`
//       );
//       return dispatch({
//         type: FILTER_BY_BRAND,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

// export const filterPrice = ({ minPrice, maxPrice }) => {
//   return async function (dispatch) {
//     try {
//       const response = await axiosClient.get(
//         `/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
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

//.................para implementar todos los filtros de una.........................
// export const filterPriceAndBrand = (payload) => {
//   return async function (dispatch) {
//     try {
//       const filteredByBrandAndPrice = await axiosClient.get(`
//       /products/filter?brand=${payload.brand}&minPrice=${payload.minPrice}&maxPrice=${payload.maxPrice}`);
//       return dispatch({
//         type: FILTER_BRAND_AND_PRICE,
//         payload: filteredByBrandAndPrice.data,
//       });
//     } catch (error) {
//       console.log(error);
//       alert(error.response.data.error);
//     }
//   };
// };

//....................carrito....................................