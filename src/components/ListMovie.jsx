import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMoviePrice, setSelectedMoviePrice] = useState(null);
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?s=batman&apikey=75ebb460&page=${currentPage}`);
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [currentPage]);

  const generateRandomPrice = () => {
    // Generate random price between 100000 and 1000000
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
      Math.floor(Math.random() * 900000) + 100000
    );
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
    // Set the selected movie price to the current price
    setSelectedMoviePrice(generateRandomPrice());
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const addToCart = () => {
    // Add the selected movie to the cart with its price
    setCart([...cart, { movie: selectedMovie, price: selectedMoviePrice }]);
    // Close the modal after adding to the cart
    closeModal();
    alert('Item berhasil ditambahkan ke keranjang!');
  };

  
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  const checkout = () => {
    // Calculate the total price
    const total = calculateTotalPrice(cart);
  
    // Extract relevant information from the cart for the URL
    const cartForURL = cart.map(item => ({
      title: item.movie.Title,
      price: item.price
    }));
  
    // Convert the cart array to a JSON string and encode it
    const encodedCart = encodeURIComponent(JSON.stringify(cartForURL));

    // Navigate to the /checkout route with total and encoded cart as parameters
    navigate(`/checkout/${total}/${encodedCart}`);

  
    // Clear the cart
    setCart([]);
  };
  
  // const checkout = () => {
  //   // Calculate the total price
  //   const total = calculateTotalPrice(cart);

  //   // Convert the cart array to a JSON string and encode it
  //   const encodedCart = encodeURIComponent(JSON.stringify(cart));

  //   // Navigate to the /checkout route with total and encoded cart as parameters
  //   navigate(`/checkout/${total}/${encodedCart}`);

  //   // Clear the cart
  //   setCart([]);
  // };
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      // Extract the numerical value from the formatted price and add it to the total
      const priceValue = parseFloat(item.price.replace(/[^\d.-]/g, ''));
      return total + priceValue;
    }, 0);
  };
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-semibold mb-4">List Movies</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <li key={movie.imdbID} className="border p-4 rounded-lg shadow-md">
            <img src={movie.Poster} alt={movie.Title} className="w-full h-48 object-cover mb-4" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{movie.Title}</h3>
              <p className="text-gray-500">Year: {movie.Year}</p>
              <p className="text-gray-500">Genre: {movie.Genre}</p>
              <p className="text-gray-500">Price: {generateRandomPrice()}</p>
              <button
                onClick={() => openModal(movie)}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 focus:outline-none"
              >
                Detail Movie
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Previous Page
        </button>
        <span className="text-lg"> Page {currentPage} </span>
        <button
          onClick={nextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          Next Page
        </button>
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedMovie.Title}</h2>
            <p>Year: {selectedMovie.Year}</p>
            <p>Genre: {selectedMovie.Genre}</p>
            <p>Type: {selectedMovie.Type}</p>
            <p>Price: {selectedMoviePrice}</p>
            <p>Rating: {selectedMovie.imdbRating}</p>
            <p className="text-gray-700 mt-4">{selectedMovie.Plot}</p>
            <button
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
            <button
              onClick={addToCart}
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4 hover:bg-green-700 focus:outline-none"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart */}
      <div className="mt-8">
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
                  onClick={() => removeFromCart(index)}
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
              onClick={checkout}
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
    </div>
  );
};

export default ListMovies;
