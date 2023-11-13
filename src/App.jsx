// import { useState } from 'react'

import ListMovies from './components/ListMovie';
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Checkout from './components/Checkout';
import TestHalaman from './components/testHalaman';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<ListMovies />} />
        <Route path="/checkout/:total/:encodedCart" element={<Checkout />} />
        <Route path="/1" element={<TestHalaman />} />
      </Routes>
    </>
  )
}

export default App
