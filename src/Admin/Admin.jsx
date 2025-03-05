import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css'

const Admin = () => {
    const [formData, setFormData] = useState({
        theme_name: '',
        base_price: '',
        base_hr: '',
        base_extra_person_price: '',
        price: '',
        hours: '',
        extra_person_price: '',
        theme_img: '',
    });

    const [file, setFile] = useState(null);
    const [themes, setThemes] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentThemeId, setCurrentThemeId] = useState(null);
    const fetchThemes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/themes');
            setThemes(response.data);
        } catch (err) {
            console.error('Error fetching themes:', err.response?.data || err.message);
        }
    };
    
    useEffect(() => {
        // Fetch existing themes
        fetchThemes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('theme_name', formData.theme_name);
        data.append('base_price', formData.base_price);
        data.append('base_hr', formData.base_hr);
        data.append('base_extra_person_price', formData.base_extra_person_price);
        data.append('price', formData.price);
        data.append('hours', formData.hours);
        data.append('extra_person_price', formData.extra_person_price);
        data.append('theme_img', file);

        try {
            let response;
            if (isUpdating) {
                // Update theme if updating
                response = await axios.put(
                    `http://localhost:5000/api/themes/${currentThemeId}`,
                    data,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                alert('Theme updated successfully!');
            } else {
                // Add new theme if not updating
                response = await axios.post(
                    'http://localhost:5000/api/themes',
                    data,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
                alert('Theme added successfully!');
            }
        
            console.log(response.data);
            // Reset form after successful operation
            setIsUpdating(false);
            setCurrentThemeId(null);
            setFormData({
                theme_name: '',
                base_price: '',
                base_hr: '',
                base_extra_person_price: '',
                price: '',
                hours: '',
                extra_person_price: '',
                theme_img: '',
            });
            setFile(null);
        
            // Refresh themes list after add or update
            fetchThemes();
        } catch (err) {
            console.error(err);
            alert('Error saving theme');
        }
        
    };

    const handleEdit = (themeId) => {
        const theme = themes.find((t) => t._id === themeId);
        setFormData({
            theme_name: theme.theme_name,
            base_price: theme.base_price,
            base_hr: theme.base_hr,
            base_extra_person_price: theme.base_extra_person_price,
            price: theme.price,
            hours: theme.hours,
            extra_person_price: theme.extra_person_price,
            theme_img: theme.theme_img,
        });
        setCurrentThemeId(themeId);
        setIsUpdating(true);
    };

    const handleDelete = async (themeId) => {
        try {
            await axios.delete(`http://localhost:5000/api/themes/${themeId}`);
            alert('Theme deleted successfully!');

            // Refresh themes list after deletion
            const fetchThemes = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/themes');
                    setThemes(response.data);
                } catch (err) {
                    console.error(err);
                }
            };

            fetchThemes();
        } catch (err) {
            console.error(err);
            alert('Error deleting theme');
        }
    };

    return (
        <div className='admin'>
            <h1>Add Themes</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label> Theme Name:
                <input
                    type="text"
                    name="theme_name"
                    placeholder="Theme Name"
                    onChange={handleChange}
                    value={formData.theme_name}
                    required
                />
                </label>
                <label htmlFor="">Base Price:
                <input
                    type="number"
                    name="base_price"
                    placeholder="Base Price"
                    onChange={handleChange}
                    value={formData.base_price}
                    required
                />
                </label>
                <label htmlFor="">1.5hr Hours:
                <input
                    type="text"
                    name="base_hr"
                    placeholder="Base Hours"
                    onChange={handleChange}
                    value={formData.base_hr}
                    required
                />
                </label>
                <label htmlFor="">Extra Persons Price:
                <input
                    type="number"
                    name="base_extra_person_price"
                    placeholder="Base Extra Person Price"
                    onChange={handleChange}
                    value={formData.base_extra_person_price}
                    required
                />
                </label>
                <label htmlFor=""> 3hrs price:
                <input
                    type="number"
                    name="price"
                    placeholder="Price for Extended Hours"
                    onChange={handleChange}
                    value={formData.price}
                />
                </label>
                <label htmlFor="">Extended Hours
                <input
                    type="text"
                    name="hours"
                    placeholder="Extended Hours"
                    onChange={handleChange}
                    value={formData.hours}
                />
                </label>
                <label htmlFor=""> Extra Persons Price:
                <input
                    type="number"
                    name="extra_person_price"
                    placeholder="Extra Person Price for Extended Hours"
                    onChange={handleChange}
                    value={formData.extra_person_price}
                />
                </label>
                <label htmlFor=""> Theme Image:
                <input type="file" name="theme_img" onChange={handleFileChange} />
                </label>
                <button type="submit">{isUpdating ? 'Update Theme' : 'Add Theme'}</button>
            </form>

            <div>
                <h3>Existing Themes</h3>
                <ul>
                    {themes.map((theme) => (
                        <li key={theme._id}>
                            <span>{theme.theme_name}</span>
                            <button onClick={() => handleEdit(theme._id)}>Edit</button>
                            <button onClick={() => handleDelete(theme._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
