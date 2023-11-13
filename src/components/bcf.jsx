import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../reducers/action'; 
const CartFeature = ({  checkout }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

   const handleRemoveFromCart = (index) => {
    dispatch(removeFromCart(index));
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <div>
                <p>{item.movie.Title}</p>
                <p>Price: {item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
          >
            Checkout
          </button>
          <button
              onClick={checkout}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4 hover:bg-red-700 focus:outline-none"
            >
              Clear Cart
            </button>
        </div>
      )}
    </div>
  );
};

CartFeature.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      movie: PropTypes.object.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  checkout: PropTypes.func.isRequired,
};

export default CartFeature;
