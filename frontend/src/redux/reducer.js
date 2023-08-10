import {
  FILTER_BY_BRAND,
  ORDER_BY_NAME,
  GET_ALL,
  FILTER_BY_PRICE,
  SEARCH_NAME,
  REFRESH,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INITIALIZE_CART
} from "./action-types";

const initialState = {
  allClothes1: [],
  allClothes2: [],
  cart: []
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

    case FILTER_BY_PRICE: { 

      const filteredByPrice = state.allClothes2.filter((product) => (
        
        product.price >= Number(payload.minPrice) &&
          product.price <= Number(payload.maxPrice)
      ));
      return {
        ...state,
        allClothes1: filteredByPrice,
      };
    }
    case FILTER_BY_BRAND: { 
      const allBrands = state.allClothes2;
      const brand = allBrands.filter(
        (allBrand) => allBrand.productbrand === payload
      );
      return {
        ...state,
        allClothes1: brand,
      };
    }
    case SEARCH_NAME:
      return {
        ...state,
        allClothes1: payload,
      };

    case REFRESH: { 
      const perrito = state.allClothes2;
      return {
        ...state,
        allClothes1: perrito,
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
    // case "ADD_TO_CART":
    //   // ... Lógica para agregar al carrito en Redux y actualizar el localStorage
    
    default:
      return { ...state };
  }
};

export default reducer;
