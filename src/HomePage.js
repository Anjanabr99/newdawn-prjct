import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = ({ token, userType }) => {
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5242/api/user/data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        setError('Failed to fetch user data.');
      }
    };

    fetchData();
  }, [token]);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>Welcome {userType === 'admin' ? 'Admin' : 'User'}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userType === 'admin' ? (
        <div>
          <h3>All User Details:</h3>
          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.email}</td>
                  <td>{user.userType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3>Your Details:</h3>
          <p><strong>User ID:</strong> {userData.userId}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>User Type:</strong> {userData.userType}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

