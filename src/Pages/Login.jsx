import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3003/login', { email:email, password:password })
            .then((response) => {
                const { valid, role } = response.data;
                if (valid) {
                    if (response.data.role === "student") {
                        
                        navigate('/studentdashboard');
                    } else if (role === "faculty") {
                        navigate('/faculty1');
                    } else if (role === "admin") {
                        navigate('/admin1');
                    }
                } else {
                    // Handle invalid login
                    console.log("Invalid username or password");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;