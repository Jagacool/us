import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function TakeProducts({ takeProducts }) {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  const getProducts = () => {
    fetch("https://63e0923b65b57fe60644f2ba.mockapi.io/products", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setProductData(data));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const updateProductStatus = async (productId) => {
    const updatedData = {
      status: "available",
    };

    await fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    getProducts();
  };

  console.log("From TakeProducts after", takeProducts);

  return (
    <div className="container">
      <div className="row">
        <div className="heading text-white p-1 mt-3 mb-3">
          <h1 className="text-center mt-3">Return Products</h1>
        </div>

        {productData.length > 0 ? (
          productData?.map((product, index) => {
            if (product.status === "unavailable") {
              return (
                <div className="col-lg-3 mb-2 col-md-4 col-sm-6 d-flex justify-content-center data-con" key={index}>
                  <div className="card col-12">
                    <div className="card-body">
                      <h3 className="card-title">Product Name: {product.name}</h3>
                      <h5 className="card-text">Price: ${product.price}</h5>
                      <p className="text-muted">Category: {product.category}</p>
                      <div className="card-footer">
                        <div className="d-grid">
                          <button
                            className="btn btn-success"
                            onClick={() => {
                              updateProductStatus(product.id);
                              console.log(product.id);
                            }}
                          >
                            Return to Store
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div>
            <h1 className="text-white">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
}
