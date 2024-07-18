import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCsrfToken = async () => {
        try {
        const response = await axios.get("http://localhost:8000/api/csrf-token", { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
        } catch (error) {
        console.error("Error fetching CSRF token:", error);
        }
    };

    const getProductById = async () => {
        try {
        const response = await axios.get(`http://localhost:8000/api/products/${id}`);
        setName(response.data.data.name);
        setPrice(response.data.data.price);
        } catch (error) {
        if (error.response) {
            setMsg(error.response.data.msg);
        }
        }
    };

    fetchCsrfToken();
    getProductById();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/products/${id}`, {
        name: name,
        price: price,
      }, {
        headers: {
          'X-CSRF-Token': csrfToken,
        },
        withCredentials: true,
      });
      navigate("/products");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Update Products</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateProduct}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className='label'>Name</label>
                <div className="control">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className='input'
                    placeholder='Product Name'
                  />
                </div>
              </div>
              <div className="field">
                <label className='label'>Price</label>
                <div className="control">
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    className='input'
                    placeholder='Price'
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormEditProducts;
