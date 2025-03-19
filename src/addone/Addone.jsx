import React, { useState, useEffect } from 'react';
import './AddOne.css';

const AddOne = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
  });
  const [images, setImages] = useState([null, null, null]);
  const [addone, setAddone] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
  
    // Append images if they exist
    images.forEach((image, index) => {
      if (image) {
        data.append('images', image); // Use 'images' as the field name
      }
    });
  
    console.log('FormData:', data); // Debugging log
  
    const requestUrl = editingId
      ? `http://localhost:5000/api/addone/update/${editingId}`
      : 'http://localhost:5000/api/addone/add';
  
    try {
      const response = await fetch(requestUrl, {
        method: editingId ? 'PUT' : 'POST',
        body: data, // Send FormData directly
      });
  
      const resData = await response.json();
  
      if (response.ok) {
        alert(resData.message);
        fetchAddone(); // Refresh the list
        setFormData({ name: '', price: '' }); // Reset form
        setImages([null, null, null]); // Reset images
        setEditingId(null); // Clear editing ID
      } else {
        throw new Error(resData.message || 'Error during request');
      }
    } catch (error) {
      console.error('Error during request:', error);
      alert('Error adding/updating addone');
    }
  };

  const fetchAddone = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/addone');
      if (!res.ok) {
        throw new Error('Failed to fetch Addone');
      }
      const data = await res.json();
      setAddone(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching addone');
    }
  };

  const handleEdit = (addoneItem) => {
    setFormData({
      name: addoneItem.name,
      price: addoneItem.price,
    });
    setEditingId(addoneItem._id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/addone/delete/${id}`, {
        method: 'DELETE',
      });
      const resData = await res.json();

      if (res.ok) {
        alert(resData.message);
        fetchAddone();  // Fetch addone again after delete
      } else {
        throw new Error(resData.message || 'Error during delete');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting addone');
    }
  };

  useEffect(() => {
    fetchAddone(); // Fetch data when the component mounts
  }, []);

  return (
    <div className="addone">
      <div className="container">
        <h1>Admin Panel - Add One</h1>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    name="name"
    placeholder="Add One Name"
    value={formData.name}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="price"
    placeholder="Add One Price"
    value={formData.price}
    onChange={handleChange}
    required
  />

  <input type="file" onChange={(e) => handleImageChange(e, 0)} />
  <input type="file" onChange={(e) => handleImageChange(e, 1)} />
  <input type="file" onChange={(e) => handleImageChange(e, 2)} />

  <button type="submit">{editingId ? 'Update Add One' : 'Add Add One'}</button>
</form>

        <h2>Add One List</h2>
        <ul>
          {addone.map((addoneItem) => (
            <li key={addoneItem._id}>
              <p>Name: {addoneItem.name}</p>
              <p>Price: {addoneItem.price}</p>

              <div className="addone-images">
                {addoneItem.images && addoneItem.images.length > 0 ? (
                  addoneItem.images.map((image, index) => (
                    <img
                      key={index}
                      src={`https://backend-nodejs-partymowa.onrender.com/${image}`}
                      alt={`${addoneItem.name} - Image ${index + 1}`}
                      style={{ width: '100px' }}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>

              <button onClick={() => handleEdit(addoneItem)}>Edit</button>
              <button onClick={() => handleDelete(addoneItem._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddOne;
