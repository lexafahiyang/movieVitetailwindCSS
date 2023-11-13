export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST
});

export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error
});


export const setMovies = (movies) => ({
    type: 'SET_MOVIES',
    payload: movies,
  });
  
  export const addToCart = (movie) => ({
    type: 'ADD_TO_CART',
    payload: movie,
  });
  
  export const removeFromCart = (index) => ({
    type: 'REMOVE_FROM_CART',
    payload: index,
  });
  
  export const updateTotalPrice = () => ({
    type: 'UPDATE_TOTAL_PRICE',
  });
  