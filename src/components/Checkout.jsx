// import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { total, encodedCart } = useParams();
  const decodedCart = encodedCart ? JSON.parse(decodeURIComponent(encodedCart)) : [];
  const navigate = useNavigate();

   // Function to format the total in Rupiah
//    const formatRupiah = (amount) => {
//     return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
//   };
  // Function to handle the "Transaksi Kembali" button click
  const handleBackToTransaction = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
       {/* <h2 className="text-3xl font-semibold mb-4">Total Pembelian: {formatRupiah(parseFloat(total))}</h2> */}
       <h2 className="text-3xl font-semibold mb-4">Total Pembelian: Rp {parseFloat(total)}</h2>
      <h3 className="text-xl font-semibold mb-2">Detail Pembelian ({decodedCart.length} item):</h3>
      <ul className="list-disc pl-4 mb-4">
        {decodedCart.map((item, index) => (
          <li key={index} className="mb-2">
            <p className="text-lg">Judul Film: {item.title}</p>
            <p className="text-gray-700">Harga: {item.price}</p>
          </li>
        ))}
      </ul>

      {/* "Transaksi Kembali" button */}
      <button
        onClick={handleBackToTransaction}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none"
      >
        Transaksi Kembali
      </button>
    </div>
  );
};

export default Checkout;
