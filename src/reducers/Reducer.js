import { FETCH_MOVIES_REQUEST, FETCH_MOVIES_SUCCESS, FETCH_MOVIES_FAILURE } from './action';


const initialState = {
  movies: [],
  cart: [],
  total: 0, 
  loading: false,
  error: null
};

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_MOVIES':
//       return {
//         ...state,
//         movies: action.payload,
//       };
//       case 'ADD_TO_CART': {
//         // Check if the movie is already in the cart
//         const isMovieInCart = state.cart.some(movie => movie.id === action.payload.id);
//         if (isMovieInCart) {
//           // If the movie is already in the cart, do not add it again
//           return state;
//         }
//         // If the movie is not in the cart, add it to the cart
//         return {
//           ...state,
//           cart: [...state.cart, action.payload],
//         };
//       }
//     case 'REMOVE_FROM_CART': {
//       const updatedCart = state.cart.filter((item, index) => index !== action.payload);
//       return {
//         ...state,
//         cart: updatedCart,
//       };
//     }
//    case 'UPDATE_TOTAL_PRICE': {
//       // Calculate the new total price based on the items in the cart
//       const newTotal = state.cart.reduce((acc, item) => acc + parseFloat(item.price.replace(/[^\d.]/g, '')), 0);
//       return {
//         ...state,
//         total: newTotal,
//       };
//     }
//     default:
//       return state;
//   }
// };

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
// export default movieReducer;