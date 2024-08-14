import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: ''
    });

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3011/api/employees/${id}`);
                setEmployee(response.data);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleUpdate = async () => {
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('designation', employee.designation);
        formData.append('gender', employee.gender);
        formData.append('courses', employee.courses.join(', '));


        if (employee.image instanceof File) {
            formData.append('image', employee.image);
        }

        try {
            await axios.put(`http://localhost:3011/api/employees/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div>
            <h2>Employee Edit</h2>
            <form>
                <label>Name: </label>
                <input type="text" value={employee.name} onChange={(e) => setEmployee({ ...employee, name: e.target.value })} />

                <label>Email: </label>
                <input type="email" value={employee.email} onChange={(e) => setEmployee({ ...employee, email: e.target.value })} />

                <label>Mobile No: </label>
                <input type="text" value={employee.mobile} onChange={(e) => setEmployee({ ...employee, mobile: e.target.value })} />

                <label>Designation: </label>
                <select value={employee.designation} onChange={(e) => setEmployee({ ...employee, designation: e.target.value })}>
                    <option value="">Select a designation</option>
                    <option value="Hr">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Sales">Sales</option>
                </select>

                <label>Gender: </label>
                <input type="radio" value="Male" checked={employee.gender === 'Male'} onChange={(e) => setEmployee({ ...employee, gender: 'Male' })} /> Male
                <input type="radio" value="Female" checked={employee.gender === 'Female'} onChange={(e) => setEmployee({ ...employee, gender: 'Female' })} /> Female

                <label>Courses: </label>
                <input type="checkbox" value="MCA" checked={employee.courses.includes('MCA')} onChange={(e) => setEmployee({ ...employee, courses: e.target.checked ? [...employee.courses, 'MCA'] : employee.courses.filter(c => c !== 'MCA') })} /> MCA
                <input type="checkbox" value="BCA" checked={employee.courses.includes('BCA')} onChange={(e) => setEmployee({ ...employee, courses: e.target.checked ? [...employee.courses, 'BCA'] : employee.courses.filter(c => c !== 'BCA') })} /> BCA
                <input type="checkbox" value="BSC" checked={employee.courses.includes('BSC')} onChange={(e) => setEmployee({ ...employee, courses: e.target.checked ? [...employee.courses, 'BSC'] : employee.courses.filter(c => c !== 'BSC') })} /> BSC

                <label>Img Upload: </label>
                <input type="file" onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })} />

                <button type="button" onClick={handleUpdate}>Update</button>
            </form>
        </div>
    );
};

export default EditEmployee;
