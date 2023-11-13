
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
// import { configureStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducers';

// const store = configureStore(
//   movieReducer,
//   applyMiddleware(thunkMiddleware)
// );

// export default store;
