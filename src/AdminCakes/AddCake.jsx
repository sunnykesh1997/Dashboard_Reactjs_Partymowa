  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import './AddCake.css';

  const AddCake = () => {
    const [formData, setFormData] = useState({
      name: '',
      halfKgPrice: '',
      fullKgPrice: '',
      type: 'Egg',
    });
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [cakes, setCakes] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
      setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('name', formData.name);
      data.append('halfKgPrice', formData.halfKgPrice);
      data.append('fullKgPrice', formData.fullKgPrice);
      data.append('type', formData.type);
      if (image) data.append('image', image);

      try {
        if (editingId) {
          await axios.put(`https://backend-nodejs-partymowa.onrender.com/api/cakes/update/${editingId}`, data);
          alert('Cake updated successfully!');
        } else {
          const res = await axios.post('https://backend-nodejs-partymowa.onrender.com/api/cakes/add', data);
          alert(res.data.message);
        }
        setFormData({ name: '', halfKgPrice: '', fullKgPrice: '', type: 'Egg' });
        setImage(null);
        setCurrentImage(null);
        setEditingId(null);
        fetchCakes();
      } catch (error) {
        console.error(error);
        alert('Error adding/updating cake');
      }
    };

    const fetchCakes = async () => {
      try {
        const res = await axios.get('https://backend-nodejs-partymowa.onrender.com/api/cakes');
        setCakes(res.data);
      } catch (error) {
        console.error(error);
        alert('Error fetching cakes');
      }
    };

    const handleEdit = (cake) => {
      setFormData({
        name: cake.name,
        halfKgPrice: cake.halfKgPrice,
        fullKgPrice: cake.fullKgPrice,
        type: cake.type,
      });
      setCurrentImage(cake.image); // Set current image URL
      setEditingId(cake._id);
    };

    const handleDelete = async (id) => {
      try {
        await axios.delete(`/api/cakes/delete/${id}`);
        alert('Cake deleted successfully!');
        fetchCakes();
      } catch (error) {
        console.error(error);
        alert('Error deleting cake');
      }
    };

    useEffect(() => {
      fetchCakes();
    }, []);

    return (
      <div className='addcake'>
        <div className="container">
        <h1>Admin Panel - Add Cake</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Cake Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="halfKgPrice"
            placeholder="1/2 Kg Price"
            value={formData.halfKgPrice}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="fullKgPrice"
            placeholder="1 Kg Price"
            value={formData.fullKgPrice}
            onChange={handleChange}
            required
          />
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="Egg">Egg</option>
            <option value="Eggless">Eggless</option>
          </select>
          <input type="file" onChange={handleImageChange} />
          {currentImage && !image && (
            <div>
              <p>Current Image:</p>
              <img src={`https://backend-nodejs-partymowa.onrender.com/${currentImage}`} alt="Cake" style={{ width: '100px' }} />
            </div>
          )}
          <button type="submit">{editingId ? 'Update Cake' : 'Add Cake'}</button>
        </form>

        <h2>Cake List</h2>
        <ul>
          {cakes.map((cake) => (
            <li key={cake._id}>
              <p>Name: {cake.name}</p>
              <p>Half Kg Price: {cake.halfKgPrice}</p>
              <p>Full Kg Price: {cake.fullKgPrice}</p>
              <p>Type: {cake.type}</p>
              <img
                src={`https://backend-nodejs-partymowa.onrender.com/${cake.image}`}
                alt={cake.name}
                style={{ width: '100px' }}
              />
              <button onClick={() => handleEdit(cake)}>Edit</button>
              <button onClick={() => handleDelete(cake._id)}>Delete</button>
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  };

  export default AddCake;
