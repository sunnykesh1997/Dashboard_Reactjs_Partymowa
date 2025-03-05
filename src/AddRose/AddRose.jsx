import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddRose.css'
const AddRose = () => {
  const [roses, setRoses] = useState([]);
  const [roseData, setRoseData] = useState({ name: '', price: '', image: null });
  const [editingRose, setEditingRose] = useState(null);

  // Fetch all roses from backend
  const fetchRoses = async () => {
    const response = await axios.get('https://backend-nodejs-partymowa.onrender.com/api/roses');
    setRoses(response.data);
  };

  useEffect(() => {
    fetchRoses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setRoseData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', roseData.name);
    formData.append('price', roseData.price);
    if (roseData.image) { // Only append image if it's selected
      formData.append('image', roseData.image);
    }
  
    if (editingRose) {
      await axios.put(`https://backend-nodejs-partymowa.onrender.com/api/roses/update/${editingRose._id}`, formData);
    } else {
      await axios.post('https://backend-nodejs-partymowa.onrender.com/api/roses/add', formData);
    }
  
    setRoseData({ name: '', price: '', image: null });
    setEditingRose(null);
    fetchRoses();
  };
  

  const handleDelete = async (id) => {
    await axios.delete(`https://backend-nodejs-partymowa.onrender.com/api/roses/delete/${id}`);
    fetchRoses();
  };

  const handleEdit = (rose) => {
    setRoseData({ name: rose.name, price: rose.price, image: null });
    setEditingRose(rose);
  };

  return (
    <div className='addrose'>
      <div className="container">
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={roseData.name} onChange={handleChange} placeholder="Rose Name" required />
        <input type="number" name="price" value={roseData.price} onChange={handleChange} placeholder="Price" required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">{editingRose ? 'Update' : 'Add'} Rose</button>
      </form>

      <h2>Rose List</h2>
      <ul>
        {roses.map((rose) => (
          <li key={rose._id}>
            <img src={`http://localhost:5000${rose.image}`} alt={rose.name} width={50} height={50} />
            <p>{rose.name} - ₹{rose.price}</p>
            <button onClick={() => handleEdit(rose)}>Edit</button>
            <button onClick={() => handleDelete(rose._id)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default AddRose;
