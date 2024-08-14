import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3011/api/employees');
                console.log('API Response:', response.data);
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(employee => {
        const keyword = searchQuery.toLowerCase();
        const name = employee.name ? employee.name.toLowerCase() : '';
        const email = employee.email ? employee.email.toLowerCase() : '';
        const mobile = employee.mobile ? employee.mobile.toString().toLowerCase() : '';
        const designation = employee.designation ? employee.designation.toLowerCase() : '';
        const gender = employee.gender ? employee.gender.toLowerCase() : '';
        const courses = (employee.course && Array.isArray(employee.course)) ? employee.course.join(', ').toLowerCase() : '';

        return (
            name.includes(keyword) ||
            email.includes(keyword) ||
            mobile.includes(keyword) ||
            designation.includes(keyword) ||
            gender.includes(keyword) ||
            courses.includes(keyword)
        );
    });

    const handleEdit = (id) => {
        navigate(`/edit-employee/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                await axios.delete(`http://localhost:3011/api/employees/${id}`);
                setEmployees(employees.filter(employee => employee._id !== id));
            } catch (error) {
                console.error('Error deleting employee:', error);
            }
        }
    };

    if (filteredEmployees.length === 0) {
        return (
            <div className="employee-list">
                <h2>No employees found</h2>
                <Link to="/create-employee" className="create-employee-link">
                    Create Employee
                </Link>
            </div>
        );
    }

    return (
        <div className="employee-list">
            <h1>Employee List</h1>
            <h2>Total Employees: {filteredEmployees.length}</h2>

            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="table-view">
                <h2>Table View</h2>
                <table border="1">
                    <thead>
                        <tr>
                            <th>UniqueId</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Courses</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((employee) => (
                            <tr key={employee._id}>
                                <td>{employee._id}</td>
                                <td>
                                    <img
                                        src={`/uploads/${employee.imageFilename}`}
                                        alt={`${employee.name}'s profile`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.designation}</td>
                                <td>{employee.gender}</td>
                                <td>
                                    {employee.course && Array.isArray(employee.course) && employee.course.length > 0
                                        ? employee.course.join(', ')
                                        : 'No Courses Selected'}
                                </td>

                                <td>
                                    {employee.createdAt
                                        ? new Date(employee.createdAt).toLocaleDateString()
                                        : new Date().toLocaleDateString()
                                    }
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(employee._id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(employee._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
