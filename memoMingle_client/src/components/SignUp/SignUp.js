import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = [];
    if (!username.trim()) {
      newErrors.push({ msg: 'Username is required' });
    } else if (!/^[a-zA-Z\s]+$/.test(username)) {
      newErrors.push({ msg: 'Enter a valid name' });
    }
    if (!email.trim()) {
      newErrors.push({ msg: 'Email is required' });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push({ msg: 'Enter a valid email address' });
    }
    if (password.length < 5) {
      newErrors.push({ msg: 'Password must be at least 5 characters long' });
    }
    if (password !== confirmPassword) {
      newErrors.push({ msg: 'Passwords do not match' });
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    //API CALL
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
      props.showAlert("Invalid Credentials", "warning");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "username":
        setUserName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "cpassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className="signup-container">
        <form onSubmit={handleSubmitClick} className="signup-form">
          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
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
              required
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
              required
              minLength={5}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              placeholder="Enter Password Again"
              value={confirmPassword}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          {errors.length > 0 && (
            <div className="alert alert-danger">
              {errors.map((error, index) => (
                <div key={index}>{error.msg}</div>
              ))}
            </div>
          )}
          <button
            disabled={!username || !email || !password || !confirmPassword || password !== confirmPassword}
            type="submit"
            className="btn btn-dark"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
