import { GET_ALL, ORDER_PRICE, POST_PRODUCT,SEARCH_NAME } from "./action-types";

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

      case POST_PRODUCT:
        return {
          ...state,
            allClothes1: [...state.dogs, payload],
        };

      case ORDER_PRICE:

      default:
        return { ...state };
        
        case SEARCH_NAME:
        return {
          ...state,
          recipes: action.payload,
          allRecipes: action.payload,
        };
      }
}

export default reducer;