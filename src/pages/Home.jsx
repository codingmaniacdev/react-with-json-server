import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import users from '../data/users.json';
import axios from 'axios';
import Loader from '../components/Loader';

const Home = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = () => {
    const timer = setTimeout(() => {
      axios.get('http://localhost:3000/users')
        .then(res => {
          setUsers(res.data);
          setIsLoading(false);
        })
        .catch(err => console.error(err));
    }, 1000);

    return () => clearTimeout(timer);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete')) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
          if (res.status === 200) {
            fetchUsers();
            setIsLoading(false);
          }
        }).catch((err) => console.error(err));
      }, 500);

      return () => clearTimeout(timer);
    }
  }

  return (
    <>
      <div className="clearfix">
        <Link to={`/create`} className="btn btn-success btn-sm float-end">CREATE</Link>
      </div>
      {isLoading ? <Loader /> : (
        <div className='table-responsive'>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">City</th>
                <th scope="col">Phone</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td><img src={`${user.image}${index + 1}`} className='img-fluid mx-auto rounded-circle' width={30} /></td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.city}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/users/show/${user.id}`} className="btn btn-dark btn-sm mx-1">SHOW</Link>
                    <Link to={`/users/edit/${user.id}`} className="btn btn-success btn-sm mx-1">EDIT</Link>
                    <button onClick={(e) => handleDelete(user.id)} className="btn btn-danger btn-sm">DELETE</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export default Home