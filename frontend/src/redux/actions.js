import axios from "axios";
import {
  ORDER_BY_NAME,
  FILTER_BY_BRAND,
  FILTER_BY_PRICE,
  GET_ALL,
  SEARCH_NAME,
  REFRESH,
  GET_ALL_BRANDS,
  FILTER_BRAND_AND_PRICE,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INITIALIZE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
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

export const setSelectedBrand = (brandName) => {
  return {
    type: "SET_SELECTED_BRAND",
    payload: brandName,
  };
};



export function orderByName(payload){
    return function (dispatch){
    return dispatch ({
        type: ORDER_BY_NAME,
        payload
    });
    };
}


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

export const filterPriceAndBrand = (payload) => {
  return async function (dispatch) {
    try {
      const filteredByBrandAndPrice = await axios.get(`
      http://localhost:3004/products/filter?brandName=${payload.brand}&name=${payload.minPrice}&name=${payload.maxPrice}`);
      return dispatch({
        type: FILTER_BRAND_AND_PRICE,
        payload: filteredByBrandAndPrice.data,
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };
};

export const filterPrice = ({minPrice, maxPrice}) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3004/products/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );
      return dispatch({
        type: FILTER_BY_PRICE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

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

export const removeFromCart = (itemId) => ({
  type: REMOVE_FROM_CART,
  payload: itemId,
});

export const increaseQuantity = (itemId) => {
  return {
    type: INCREASE_QUANTITY,
    payload: itemId,
  };
};

export const decreaseQuantity = (itemId) => {
  return {
    type: DECREASE_QUANTITY,
    payload: itemId,
  };
};

