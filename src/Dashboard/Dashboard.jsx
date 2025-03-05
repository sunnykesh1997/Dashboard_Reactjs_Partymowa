import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const location = useLocation();
  const { bookingId } = location.state || {}; // Extract bookingId from location state

  // Fetch bookings data from the backend
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://backend-nodejs-partymowa.onrender.com/api/bookings/admin/bookings');
        setBookings(response.data);
        setFilteredBookings(response.data); // Initially, show all bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  // Handle date search input change
  const handleDateSearch = (e) => {
    const date = e.target.value;
    setSearchDate(date);

    if (date) {
      // Filter bookings by the selected date
      const filtered = bookings.filter((booking) => {
        return new Date(booking.date).toLocaleDateString() === new Date(date).toLocaleDateString();
      });
      setFilteredBookings(filtered);
    } else {
      // If no date is selected, show all bookings
      setFilteredBookings(bookings);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>
      <h2>Bookings</h2>

      {/* Search Input for Date */}
      <div className="mb-3">
        <label htmlFor="searchDate" className="form-label">Search by Date</label>
        <input
          type="date"
          id="searchDate"
          className="form-control"
          value={searchDate}
          onChange={handleDateSearch}
        />
      </div>

      <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time Slot</th>
            <th>Event</th>
            <th>Theme</th>
            <th>Persons</th>
            <th>Cake Name</th>
            <th>Cake Price</th>
            <th>Cake Quantity</th>
            <th>Cake Type</th>
            <th>Decoration Name</th>
            <th>Decoration Price</th>
            <th>Rose Name</th>
            <th>Rose Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.name}</td>
              <td>{booking.phone}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.timeSlot}</td>
              <td>{booking.event}</td>
              <td>{booking.theme}</td>
              <td>{booking.persons}</td>

              {/* Handle Cake Data */}
              {booking.cake.length > 0 ? (
                booking.cake.map((cake, index) => (
                  <React.Fragment key={index}>
                    <td>{cake.cakeName}</td>
                    <td>{cake.cakePrice}</td>
                    <td>{cake.cakeQuantity}</td>
                    <td>{cake.cakeType}</td>
                  </React.Fragment>
                ))
              ) : (
                <td colSpan="4">N/A</td>
              )}

              {/* Handle Decoration Data */}
              {booking.decoration.length > 0 ? (
                booking.decoration.map((decoration, index) => (
                  <React.Fragment key={index}>
                    <td>{decoration.decorationName}</td>
                    <td>{decoration.decorationPrice}</td>
                  </React.Fragment>
                ))
              ) : (
                <td colSpan="2">N/A</td>
              )}

              {/* Handle Rose Data */}
              {booking.rose.length > 0 ? (
                booking.rose.map((rose, index) => (
                  <React.Fragment key={index}>
                    <td>{rose.roseName}</td>
                    <td>{rose.rosePrice}</td>
                  </React.Fragment>
                ))
              ) : (
                <td colSpan="2">N/A</td>
              )}

              <td>{booking.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
