import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { useAuth } from '../context/AuthContext';
import validator from 'validator';

export default function Login() {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();
    const [form, setForm] = useState({
        username: '',
        password: '',
        clientErrors: {}
    });

    const runValidations = () => {
        const errors = {};
        if (form.username.trim().length === 0) {
            errors.username = 'Username is required';
        }

        if (form.password.trim().length === 0) {
            errors.password = 'Password is required';
        } else if (form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'Password should be between 8 - 128 characters';
        }
        setForm({ ...form, clientErrors: errors });

        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = _.pick(form, ['username', 'password']);
        const isValid = runValidations();

        if (isValid) {
            try {
                const response = await axios.post('http://localhost:3011/api/user/login', formData);
                localStorage.setItem('token', response.data.token);

                const userResponse = await axios.get('http://localhost:3011/api/user/account', {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });

                const user = userResponse.data;
                console.log(user);
                handleLogin(user);
                navigate('/admin-dashboard');

            } catch (err) {
                console.error('Error during login', err);
            }
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Enter username</label>
                            <input
                                type="text"
                                value={form.username}
                                onChange={handleChange}
                                name="username"
                                id="username"
                                className={`form-control ${form.clientErrors.username ? 'is-invalid' : ''}`}
                            />
                            {form.clientErrors.username && <div className="invalid-feedback">{form.clientErrors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Enter password</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                name="password"
                                id="password"
                                className={`form-control ${form.clientErrors.password ? 'is-invalid' : ''}`}
                            />
                            {form.clientErrors.password && <div className="invalid-feedback">{form.clientErrors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                    <div className="mt-3">
                        <Link to="/register">Create an account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
