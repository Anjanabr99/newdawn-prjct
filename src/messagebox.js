import React, { useState } from 'react'

const Messagebox = () => {


    // const [message, setMessage] = useState('');
    // const [reply, setReply] = useState('');
  
    // const handleChange = (e) => {
    //   setMessage(e.target.value);
    // };
  
    // const sendMessage = async () => {
    //   try {
    //     const response = await fetch('http://localhost:5000/api/messages', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json', // ✅ Corrected casing
    //       },
    //       body: JSON.stringify({ message }),
    //     });
  
    //     const data = await response.json();
    //     console.log(data);
    //     setReply(data.reply); // ✅ Corrected function name
    //   } catch (error) {
    //     console.error('Error sending message:', error);
    //   }
    const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Both fields are required.');
      return;
    }

    // Add login logic here
    console.log('Logging in:', formData);
    setError('');
  };


  fetch("http://localhost:5242/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        console.log("Login successful. Token:", data.token);
        // store token in localStorage/sessionStorage
      } else {
        setError(data.message || "Login failed");
      }
    })
    .catch(() => setError("Server error"));
    // };
  return (
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-title">Login</h2>

      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
          required
        />
      </div>

      <button type="submit" className="login-button">Login</button>
      <p className="signup-link">
        Don't have an account? <a href="#">Sign up</a>
      </p>
    </form>
  </div>
    // <div>
    //   <h2>Type something:</h2>
    //   <textarea
    //     rows="5"
    //     cols="40"
    //     value={message}
    //     onChange={handleChange}
    //     placeholder="Write here..."
    //   />
    //  <button onClick={sendMessage}>Send to Server</button>
    //  <p>Server says: {reply}</p>
    // </div>
  )
}

export default Messagebox
