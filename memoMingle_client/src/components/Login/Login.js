import React, { useState } from "react";
import "./Login.css"; // Assuming you create a separate CSS file for styling
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    // API CALL
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Successfully Logged in", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the event target

    if (name === 'email') {
      setEmail(value); // Update email state
    } else if (name === 'password') {
      setPassword(value); // Update password state
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmitClick} className="login-form">
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            placeholder="Enter Valid email address"
            value={email}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={onChange}
          />
        </div>
        <button disabled={!email || !password} type="submit" className="btn btn-dark">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;