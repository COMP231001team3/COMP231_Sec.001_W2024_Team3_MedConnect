

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 
import { useAuth } from "../Contexts/authContext";
import './auth.css';

function LoginForm({ handleLogin }) {
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            login({email: formData.email, token: response.data.token });
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password'); // Display error message
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>LOGIN</h3>
                
                <div className="mb-4">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        {...register("email")}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p>Email is required and must be valid</p>}
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        {...register("password")}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p>Password is required</p>}
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
                <button type="submit">LOGIN</button>
                <p className="register">
                    Don't have an account yet? <a href="/sign-up">Register</a> now!
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
