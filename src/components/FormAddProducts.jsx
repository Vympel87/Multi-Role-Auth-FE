import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormAddProducts = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/products", {
        name: name,
        price: price,
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
          <h1 className="title">
            Products
        </h1>
        <h2 className="subtitle">
            Add New Products
          </h2>
          <div className="card is-shadowless">
            <div className="card-content">
                <div className="content">
                      <form onSubmit={saveProduct}>
                          <p className="has-text-centered">{ msg }</p>
                          <div className="field">
                            <label className='label'>Name</label>
                            <div className="control">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" className='input' placeholder='Product Name' />
                            </div>
                        </div>
                        <div className="field">
                            <label className='label'>Price</label>
                            <div className="control">
                                <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" className='input' placeholder='Price' />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-success">Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
          </div>
    </div>
  )
}

export default FormAddProducts