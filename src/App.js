import React, { useState, useEffect } from 'react';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Details from './Details';
import axios from 'axios';
import { Name, removeData, updateData } from './features/data/dataSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [updateData, setUpdateData] = useState({
    FullName: '',
    Email: '',
    Number: '',
    Age: '',
    City: '',
    DOB: '',
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.alldata);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_BACKENDRURL}/api/v1/form/alldata`);
      dispatch(Name(result.data));
    };
    fetchData();
  }, [dispatch]);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKENDRURL}/api/v1/form/delete?_id=${_id}`);
      dispatch(removeData(_id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEdit = (_id) => {
    const rowData = data.datas.find((item) => item._id === _id);
    if (rowData) {
      setEditId(_id);
      setUpdateData(rowData);
      setIsEditing(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKENDRURL}/api/v1/form/edit?_id=${editId}`, updateData);
      const updatedDatas = data.datas.map((d) => (d._id === editId ? updateData : d));
      dispatch(updateData(updatedDatas));
      setEditId(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <>
      <h1>Table-Data</h1>
      <Link to={'/Details'} className="button" onClick={() => setShowModal(true)}>Add Details</Link>
      <Link to={"/"} className="button">Back</Link>
      <Routes>
        <Route path="/details" element={<Details />} />
      </Routes>
      <div>
        <table>
          <thead>
            <tr>
              <th>FullName</th>
              <th>Email</th>
              <th>Number</th>
              <th>Age</th>
              <th>City</th>
              <th>DOB</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.datas && data.datas.map((item) => (
              <tr key={item._id}>
                {isEditing && editId === item._id ? (
                  <>
                    <td><input type="text" name="FullName" value={updateData.FullName} onChange={handleChange} /></td>
                    <td><input type="text" name="Email" value={updateData.Email} onChange={handleChange} /></td>
                    <td><input type="text" name="Number" value={updateData.Number} onChange={handleChange} /></td>
                    <td><input type="text" name="Age" value={updateData.Age} onChange={handleChange} /></td>
                    <td><input type="text" name="City" value={updateData.City} onChange={handleChange} /></td>
                    <td><input type="text" name="DOB" value={updateData.DOB} onChange={handleChange} /></td>
                    <td>
                      <button className='update' onClick={handleUpdate}>Update</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.FullName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Number}</td>
                    <td>{item.Age}</td>
                    <td>{item.City}</td>
                    <td>{item.DOB}</td>
                    <td>
                      <button className='edit' onClick={() => handleEdit(item._id)}>Edit</button>
                      <button className='delete' onClick={() => handleDelete(item._id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
