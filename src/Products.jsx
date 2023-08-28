import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Products({}) {
  const [productData, setProductData] = useState([]);
  const navigate = useNavigate();

  const getProducts = () => {
    fetch("https://63e0923b65b57fe60644f2ba.mockapi.io/products", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setProductData(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (productId) => {
    await fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${productId}`, {
      method: "DELETE",
    });
    getProducts();
  };

  const takeProduct = async (product) => {
    const updatedProduct = {
      ...product,
      status: "unavailable",
    };

    await fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    getProducts();
  };

  const [tempProduct, setTempProduct] = useState({});

  const showDetails = (product) => {
    setTempProduct(product);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="heading text-white p-1 mt-3 mb-3">
          <h1 className="text-center mt-3">Products List</h1>
        </div>

        {productData.length > 0 ? (
          productData.map((product, index) => (
            <div className="col-lg-3 mb-2 col-md-4 col-sm-6 d-flex justify-content-center data-con" key={index}>
              {/* Rest of your product card code */}
              {/* Replace bmd with product */}
              {/* Replace name, author, publisher, etc. with appropriate properties of product */}
              {/* Replace deletfun with deleteProduct */}
              {/* Replace updatafun with takeProduct */}
              {/* Replace navigate(`/books/edit/${bmd.id}`) with navigate(`/products/edit/${product.id}`) */}
            </div>
          ))
        ) : (
          <div className="text-white">
            <h1 className="text-white">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
