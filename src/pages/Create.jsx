import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const Create = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('SUBMIT');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    phone: '',
    image: 'https://i.pravatar.cc/150?img='
  });

  useEffect(() => {
    if (id) {
      setButtonText('UPDATE');
      axios.get(`http://localhost:3000/users/${id}`).then((res) => {
        const user = res.data;
        setFormData((prevData) => ({
          ...prevData,
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
        }));
      }).catch((err) => console.log(err));
    }
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = () => {
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, formData).then((res) => {
        if (res.status === 200) {
          navigate('/');
        }
      }).catch((err) => console.error(err));
    } else {
      axios.post("http://localhost:3000/users", formData).then((res) => {
        if (res.status === 201) {
          setFormData({ name: '', email: '', phone: '', city: '' });
          navigate('/');
        }
      }).catch((err) => console.error(err));
    }
    // console.log('formdata', formData);
  }


  return (
    <>
      <div className="clearfix">
        <Link to={`/`} className="btn btn-success btn-sm float-end">BACK</Link>
      </div>
      <div className="card mx-auto" style={{ width: '500px' }}>
        <div className='card-body'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name <span className='text-danger'>*</span></label>
            <input type="text" name='name' onChange={handleChange} className="form-control" value={formData.name} id="name" />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email <span className='text-danger'>*</span></label>
            <input type="email" name='email' onChange={handleChange} className="form-control" value={formData.email} id="email" />
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City <span className='text-danger'>*</span></label>
            <input type="text" name='city' onChange={handleChange} className="form-control" id="city" value={formData.city} />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone <span className='text-danger'>*</span></label>
            <input type="text" name='phone' onChange={handleChange} maxLength={10} className="form-control" value={formData.phone} id="phone" />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">Profile <span className='text-danger'>*</span></label>
            <input type="file" name='image' onChange={handleChange} className="form-control" id="image" />
          </div>
          <div className='d-grid'>
            <button onClick={handleSubmit} className="btn btn-primary btn-block">{buttonText}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Create