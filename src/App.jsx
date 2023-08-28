import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom";
import { AddProducts } from './AddProducts'; // Change the import statement
import { Products } from './Products'; // Change the import statement
import { EditProduct } from './EditProduct'; // Change the import statement
import { TakeProducts } from './TakeProducts'; // Change the import statement
import { Navbar } from './Navbar';

function App() {
  const navigate = useNavigate();
  const [takeProducts, setTakeProducts] = useState([]);

  console.log("takeProducts", takeProducts);

  const returnDeleteFun = async (dataid) => {
    await fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${dataid}`, {
      method: "DELETE"
    });
    navigate(`/products/take`);
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/products/edit/:id" element={<EditProduct />} />
        <Route path="/products/take" element={<TakeProducts takeProducts={takeProducts} />} />
        <Route path="*" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <div className="text-light">
      <footer className="py-5 bg-dark">
        {/* Rest of the footer content */}
      </footer>
    </div>
  );
}

export default App;
