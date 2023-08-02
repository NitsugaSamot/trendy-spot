import axios from 'axios';
<<<<<<< HEAD
import { GET_ALL, ORDER_PRICE, SEARCH_NAME } from './action-types';
=======
import { GET_ALL, ORDER_PRICE, SEARCH_NAME, POST_PRODUCT } from './action-types';
>>>>>>> dev

export const getAllClothes = ()=>{
    return async function(dispatch){
        try {
<<<<<<< HEAD
            const all = axios('http://localhost:3001/')
=======
            var all = axios('http://localhost:3001/')
>>>>>>> dev
            return dispatch({
                type: GET_ALL,
                payload: all.data
            })
        } catch (error) {
            console.error(error)
        }
    }
}

<<<<<<< HEAD
=======
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


>>>>>>> dev
export const orderPrice = (payload)=>{
    return {
        type: ORDER_PRICE,
        payload
    }
}