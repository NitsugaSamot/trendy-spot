import {
  GET_ALL,
  ORDER_BY_NAME,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  FILTER_BY_BRAND,
  REFRESH,
  ADD_TO_CART,
  INITIALIZE_CART,
  REMOVE_FROM_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  // FILTER_BRAND_AND_PRICE,
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allClothes1: payload,
        allClothes2: payload,
      };

    case ORDER_BY_NAME: {
      const sortedArr =
        payload === "1"
          ? state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allClothes1.slice().sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allClothes1: sortedArr,
      };
    }

    case FILTER_BY_PRICE:
      return {
        ...state,
        allClothes1: payload,
      };

    case SEARCH_NAME:
      return {
        ...state,
        allClothes1: payload,
      };

    case FILTER_BY_BRAND:
      return {
        ...state,
        allClothes1: payload,
      };

    case REFRESH: {
      const clothes = state.allClothes2;
      return {
        ...state,
        allClothes1: clothes,
      };
    }
    case ADD_TO_CART: {
      console.log(payload);
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    }
    case INITIALIZE_CART: {
      return {
        ...state,
        cart: payload,
      };
    }
    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter((item) => item.id !== payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Actualizar el localStorage
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case INCREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case DECREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    }
    case ADD_TO_CART:{

      console.log(payload);
      return {
      ...state,
        cart: [...state.cart, payload]
      };
    }
    case INITIALIZE_CART:{ 
      return {
        ...state,
        cart: payload,
      };
    }
    case REMOVE_FROM_CART: {
      const updatedCart = state.cart.filter(item => item.id !== payload);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualizar el localStorage
      return {
        ...state,
        cart: updatedCart,
      };
    }
    case INCREASE_QUANTITY:{ 
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      }
    }

    case DECREASE_QUANTITY: {
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        ),
      };
    }
    
    default:
      return { ...state };
  }
};

export default reducer;
