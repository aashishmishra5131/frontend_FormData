import React, { useState,useEffect } from 'react';
import './App.css';
import { Link,Route,Routes } from 'react-router-dom'
import Details from './Details';
import axios from 'axios';
import { Name } from './features/data/dataSlice';
import { store } from './app/store';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  // const data=useSelector((state)=>{
  //   state.alldata
  // });
  // if(data){
  // console.log(data,"getalldata");
  // }
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
  };
  const handleDelete = (row) => {
    console.log('Delete row:', row);
  };
 const dispatch=useDispatch();
// useEffect(()=>{
//   const Alldata=async()=>{
//   const result=await axios.get(`${process.env.REACT_APP_BACKENDRURL}/api/v1/form/alldata`)
//   console.log(result);

// store.dispatch(Name(result.data))
//   }
//   Alldata();
// },[])



  return (
    <>
    <h1>Table-Data</h1>
    <Link to={'/Details'} className="button" onClick={() => setShowModal(true)}>Add Details</Link>
    <Link to={"/"} className="button">Back</Link>
    <Routes>
      <Route path="/details" element={<Details/>}/>
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
          <tr>
            <td>John Doe</td>
            <td>a@gmail.com</td>
            <td>1234567890</td>
            <td>30</td>
            <td>New York</td>
            <td>12/12/2000</td>
            <td>
              <button className='edit' onClick={() => handleEdit(1)}>Edit</button>
              <button className='delete' onClick={() => handleDelete(1)}>Delete</button>
            </td>
          </tr>
          <tr>
            <td>John </td>
            <td>a@gmail.com</td>
            <td>1234567890</td>
            <td>30</td>
            <td>New York</td>
            <td>12/12/2000</td>
            <td>
              <button className='edit' onClick={() => handleEdit(1)}>Edit</button>
              <button className='delete' onClick={() => handleDelete(1)}>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>a@gmail.com</td>
            <td>1234567890</td>
            <td>25</td>
            <td>San Francisco</td>
            <td>12/12/2000</td>
            <td>
              <button className='edit' onClick={() => handleEdit(1)}>Edit</button>
              <button className='delete' onClick={() => handleDelete(1)}>Delete</button>
            </td>
          </tr>
          <tr>
            <td>Mike Johnson</td>
            <td>a@gmail.com</td>
            <td>1234567890</td>
            <td>35</td>
            <td>Chicago</td>
            <td>12/12/2000</td>
            <td>
              <button className='edit' onClick={() => handleEdit(1)}>Edit</button>
              <button className='delete' onClick={() => handleDelete(1)}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
    </>
  )
     
  
}

export default App;
