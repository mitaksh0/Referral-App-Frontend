// src/components/RegisterLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from './api'; // Import API methods
import '../styles/RegisterLogin.css';

const RegisterLogin = (props) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        referred_by: '',
    });
    
    const [isRegistering, setIsRegistering] = useState(props.isRegister); // Toggle between Register and Login
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response;
            if (isRegistering) {
                response = await registerUser(formData);
                alert(response.message || 'Success');
                navigate('/login');
            } else {
                response = await loginUser(formData);
                // Store user info in state or localStorage
                props.setUser(response.user);  // Assuming user info is returned
                alert(response.message || 'Success');
                navigate('/home');
            }

        } catch (err) {
            alert(err.message || 'Something went wrong');
        }
    };

    const handleClick = async (e) => {
        setIsRegistering(!isRegistering)
        
        // redirect to /register, user clicked on button
        if (!isRegistering) {
            navigate('/register');
        } else { // redirect to /login
            navigate('/login');
        }
    }

    return (
        <div className="form-container">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                
                {isRegistering && (
                    <>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <label>Referred By</label>
                        <input
                            type="text"
                            name="referred_by"
                            value={formData.referred_by}
                            onChange={handleChange}
                        />
                    </>
                )}

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={handleClick}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
        </div>
    );
};

export default RegisterLogin;
