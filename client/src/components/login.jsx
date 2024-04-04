import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { useAuth } from "../Contexts/authContext";
import './auth.css';

function LoginForm(){
     const {
        handleSubmit,
        formState: { errors },
      } = useForm();

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const { login } = useAuth();
      const navigate = useNavigate();

      const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            login({ ...response.data });
            // Redirect to home page
            console.log('Redirecting to home page');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password');
        }
      };

    return (
        <div className="container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>LOGIN</h3>
                    {error && <p>{error}</p>}
                    <div className="mb-4">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            //{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                        />
                        {errors.email && (<p>Email is required and must be valid</p>)}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            //{...register("password", { required: true })}
                        />
                        
                    </div>
                    <div className="mb-4">
                        <div className="containerAlign">
                            <div className="custom-control custom-checkbox">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="customCheck1"
                                />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    Remember me
                                </label>
                            </div>
                            <p>Forgot password?</p>
                        </div>
                    </div>
                    <div className="d-grid">
                        <button type="submit">
                            LOGIN
                        </button>
                    </div>
                    <p className="register">Don't have an account yet? <a href="/sign-up">Register</a> now!</p>
                </form>
            </div>
    )
}

export default LoginForm;


/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };
  
  return (
    <div className="container">
            <form onSubmit={handleLogin}>
                <h3>LOGIN</h3>
                {error && <p>{error}</p>}
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error.email && (<p>Email is required and must be valid</p>)}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                </div>
                <div className="mb-4">
                    <div className="containerAlign">
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                            />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Remember me
                            </label>
                        </div>
                        <p>Forgot password?</p>
                    </div>
                </div>
                <div className="d-grid">
                    <button type="submit">
                        LOGIN
                    </button>
                </div>
                <p className="register">Don't have an account yet? <a href="/sign-up">Register</a> now!</p>
            </form>
        </div>
)
};

export default Login;
*/
