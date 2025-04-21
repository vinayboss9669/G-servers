import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from '../util';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [logininfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handlechange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = logininfo;

        if (!email.trim() || !password.trim()) {
            return handleError('Email and password are required');
        }

        try {
            setIsLoading(true);
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logininfo)
            });

            const result = await response.json();
            const { success, message, error, jwtToken, name } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                navigate('/home');
            } else if (error) {
                const details = error?.details[0]?.message;
                handleError(details || 'Login failed');
            } else {
                handleError(message || 'Login failed');
            }
        } catch (error) {
            handleError('Network error occurred');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        onChange={handlechange}
                        type="email"
                        name='email'
                        placeholder='Enter your email...'
                        value={logininfo.email}
                        disabled={isLoading}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        onChange={handlechange}
                        type="password"
                        name='password'
                        placeholder='Enter your password...'
                        value={logininfo.password}
                        disabled={isLoading}
                        required
                    />
                </div>
                <button type='submit' disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <span>Don't have an account?{' '}
                    <Link to="/signup">Sign up</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Login;