import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const Show = () => {
  const { id, index } = useParams();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      axios.get(`http://localhost:3000/users/${id}`).then((res) => {
        setUser(res.data);
        setIsLoading(false);
      }).catch((err) => console.log(err));
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="card mx-auto" style={{ width: '250px' }}>
          <img className="card-img-top" src={`${user.image}${id}`} alt="Card image" />
          <div className="card-body">
            <h4 className="card-title">{user.name}</h4>
            <p className="card-text">{user.email}</p>
            <p className="card-text">{user.city}</p>
            <p className="card-text">{user.phone}</p>
            <Link to="/" className="btn btn-primary">BACK</Link>
          </div>
        </div>
      )
      }
    </>
  )
}

export default Show