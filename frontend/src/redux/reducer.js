import { GET_ALL, ORDER_PRICE } from "./action-types";

const initialState = {
    allClothes1: [],
    allClothes2: []
}

const reducer = (state = initialState, { type, payload })=>{
    switch (type) {
      case GET_ALL:
        return {
          ...state,
          allClothes1: payload,
          allClothes2: payload,
        };

      case ORDER_PRICE:

      default:
        return { ...state };
    }
}

export default reducer;
