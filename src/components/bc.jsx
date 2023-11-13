// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { removeFromCart  } from '../reducers/action';
// const Checkout = ({ cart, total, clearCart }) => {
const Checkout = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart); // assuming the cart is directly on state
    const total = cart.reduce((acc, item) => acc + parseFloat(item.price), 0).toFixed(2);
    const handleClearCart = () => {
        dispatch(removeFromCart ());
      };
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4">Checkout</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center border-b py-2">
                <div>
                  <p>{item.movie.Title}</p>
                  <p>Price: {item.price}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-xl font-semibold">Total: {total}</p>
          </div>
          <div className="mt-4">
            <button
            //   onClick={clearCart}
            onClick={handleClearCart}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 focus:outline-none"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

Checkout.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      movie: PropTypes.object.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  total: PropTypes.string.isRequired,
  clearCart: PropTypes.func.isRequired,
};

export default Checkout;
