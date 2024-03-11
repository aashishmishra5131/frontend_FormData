import React, { useState } from 'react';
import './Details.css';
import {useDispatch} from  'react-redux';
import { Name } from './features/data/dataSlice';
import axios from 'axios';
function Details() {
  const [formData, setFormData] = useState({
    FullName: '',
    Email: '',
    Number: '',
    Age: '',
    City: '',
    DOB: '',
  });
  const [showDetails, setShowDetails] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch=useDispatch()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setShowDetails(false); 
      // dispatch(Name({
      //   FullName: formData.FullName,
      //   Email: formData.Email,
      //   Number: formData.Number,
      //   Age: formData.Age,
      //   City:formData.City,
      //   DOB:formData.DOB
      // }));
      // dispatch(sendDataToBackend());
      setShowMessage(true);
      const result=await axios.post("http://localhost:4000/api/v1/form/form",formData)
      console.log(result);
    }  catch (error) {
      console.log(error)
  }
  };

  return (
    <div className="form-container">
      {showMessage && (
        <div className="message">Details added successfully!</div>
      )}
      {showDetails && (
        
        <>
          <h1>Add Details</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">FullName:</label>
            <input
              type="text"
              id="FullName"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
            <label htmlFor="Number">Number:</label>
            <input
              type="text"
              id="Number"
              name="Number"
              value={formData.Number}
              onChange={handleChange}
              required
            />
            <label htmlFor="Number">Age:</label>
            <input
              type="text"
              id="Age"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              required
            />
            <label htmlFor="City">City:</label>
            <input
              type="text"
              placeholder="full address"
              id="City"
              name="City"
              value={formData.City}
              onChange={handleChange}
              required
            />
            <label htmlFor="DOB">DOB:</label>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              id="DOB"
              name="DOB"
              value={formData.DOB}
              onChange={handleChange}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Details;
