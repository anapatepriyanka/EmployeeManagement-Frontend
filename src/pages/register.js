import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [clientErrors, setClientErrors] = useState({});
    const [serverError, setServerError] = useState('');

    const runValidations = () => {
        const errors = {};
        if (username.trim().length === 0) {
            errors.username = 'Username is required';
        }
        if (password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (password.trim().length < 8 || password.trim().length > 128) {
            errors.password = 'Password should be between 8 - 128 characters';
        }
        setClientErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = runValidations();

        if (isValid) {
            const formData = {
                username,
                password

            };
            try {
                await axios.post('http://localhost:3011/api/user/register', formData);
                setUsername("");
                setPassword("");
                navigate("/success");
                navigate("/login");
            } catch (error) {
                setServerError('Registration failed. Please try again.');
                console.error('Registration error:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Register</h2>
                    {serverError && <p className="text-danger">{serverError}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`form-control ${clientErrors.username ? 'is-invalid' : ''}`}
                            />
                            {clientErrors.username && <div className="invalid-feedback">{clientErrors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`form-control ${clientErrors.password ? 'is-invalid' : ''}`}
                            />
                            {clientErrors.password && <div className="invalid-feedback">{clientErrors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

