import axios from 'axios';
import { GET_ALL, ORDER_PRICE, SEARCH_NAME, POST_PRODUCT } from './action-types';

export const getAllClothes = ()=>{
    return async function(dispatch){
        try {
            const all = axios('http://localhost:3001/')
            return dispatch({
                type: GET_ALL,
                payload: all.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

export const postProduct = (form) => {
  return async function (dispatch) {
    try {
        var product = axios("http://localhost:3001/create", form);
      return dispatch({
        type: POST_PRODUCT,
        payload: product.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const orderPrice = (payload)=>{
    return {
        type: ORDER_PRICE,
        payload
    }
}