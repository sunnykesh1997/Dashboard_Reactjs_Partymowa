import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddDecoration.css'
const AddDecoration = () => {
  const [decorations, setDecorations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  // Fetch decorations
  const fetchDecorations = () => {
    axios.get('http://localhost:5000/api/decorations')
      .then((response) => setDecorations(response.data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchDecorations();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Add or update decoration
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('price', formData.price);
    if (formData.image) formDataToSend.append('image', formData.image);

    if (editId) {
      // Update decoration
      axios.put(`http://localhost:5000/api/decorations/${editId}`, formDataToSend)
        .then(() => {
          fetchDecorations();
          setFormData({ name: '', price: '', image: null });
          setEditId(null);
        })
        .catch((error) => console.error(error));
    } else {
      
      // Add new decoration
      axios.post('http://localhost:5000/api/decorations', formDataToSend,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
        .then(() => {
          fetchDecorations();
          setFormData({ name: '', price: '', image: null });
        })
        .catch((error) => console.error(error));
    }
  };

  // Delete decoration
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/decorations/${id}`)
      .then(() => fetchDecorations())
      .catch((error) => console.error(error));
  };

  // Edit decoration
  const handleEdit = (decoration) => {
    setFormData({
      name: decoration.name,
      price: decoration.price,
      image: null, // Image won't be editable directly
    });
    setEditId(decoration._id);
  };

  return (
    <div className="adddecor">
      <div className="container">
        <h1>Admin - Manage Decorations</h1>
        <form onSubmit={handleSubmit} className="admin-form">
          <input
            type="text"
            name="name"
            placeholder="Decoration Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <input type="file" onChange={handleFileChange} />
          <button type="submit">{editId ? 'Update' : 'Add'} Decoration</button>
        </form>
        <div className="decoration-list">
          {decorations.map((decoration) => (
            <div key={decoration._id} className="decoration-item">
              <img src={`http://localhost:5000/${decoration.image}`} alt={decoration.name} />
              <h3>{decoration.name}</h3>
              <p>Price: ₹{decoration.price}</p>
              <button onClick={() => handleEdit(decoration)}>Edit</button>
              <button onClick={() => handleDelete(decoration._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddDecoration;
