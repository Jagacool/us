import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";

export function EditProduct() {
  const [editProduct, setEditProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${id}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setEditProduct(data));
  }, [id]);

  console.log(editProduct);

  return editProduct ? <EditProductForm editProduct={editProduct} /> : <h1>Loading....</h1>;
}

function EditProductForm({ editProduct }) {
  const navigate = useNavigate();

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      name: editProduct.name,
      price: editProduct.price,
      poster: editProduct.poster,
      category: editProduct.category,
      rating: editProduct.rating,
      description: editProduct.description,
    },
    onSubmit: (editData) => {
      updateProduct(editData);
    },
  });

  const updateProduct = async (editData) => {
    await fetch(`https://63e0923b65b57fe60644f2ba.mockapi.io/products/${editProduct.id}`, {
      method: "PUT",
      body: JSON.stringify(editData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/products");
  };

  return (
    <div className="container">
      <div className="row mb-5 mt-5 d-flex text-light justify-content-center   ">
        <div className="col-md-6 col-lg-6 col-12">
          <div className="card bg-secondary ">
            <h3 className="card-header mb-2 bg-dark text-center">Update Product</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <label className="form-label">Product Name *</label>
                  <input
                    className="form-control"
                    value={values.name}
                    name="name"
                    onChange={handleChange}
                    type="text"
                    placeholder="Product Name"
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Price *</label>
                  <input
                    className="form-control"
                    value={values.price}
                    name="price"
                    onChange={handleChange}
                    type="text"
                    placeholder="Price"
                  />
                </div>
                {/* Rest of your input fields */}
                <div className="d-grid mt-3">
                  <button className="btn mb-2 btn-success" type="submit">
                    Update Product
                  </button>
                  <button className="btn btn-danger" onClick={() => navigate("/products")}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
