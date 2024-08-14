import React, { useState } from 'react';
import axios from 'axios';
import './createEmployee.css';

const CreateEmployee = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: [],
        image: null,
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        courses: '',
        image: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, files, checked } = e.target;
        if (type === 'checkbox') {
            setFormData(prevData => ({
                ...prevData,
                courses: checked
                    ? [...prevData.courses, value]
                    : prevData.courses.filter(course => course !== value)
            }));
        } else if (type === 'file') {
            setFormData(prevData => ({
                ...prevData,
                image: files[0]
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        let valid = true;
        let newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Name is required';
            valid = false;
        }

        if (!formData.email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            valid = false;
        }

        if (!formData.mobile) {
            newErrors.mobile = 'Mobile number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits';
            valid = false;
        }

        if (!formData.designation) {
            newErrors.designation = 'Designation is required';
            valid = false;
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
            valid = false;
        }

        if (formData.courses.length === 0) {
            newErrors.courses = 'At least one course must be selected';
            valid = false;
        }

        if (!formData.image) {
            newErrors.image = 'Image is required';
            valid = false;
        } else if (!['image/jpeg', 'image/png'].includes(formData.image.type)) {
            newErrors.image = 'Only jpg/png files are allowed';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            setIsSubmitting(true);
            try {
                const formDataToSend = new FormData();
                Object.keys(formData).forEach(key => {
                    if (key === 'courses') {
                        formData.courses.forEach(course => formDataToSend.append('courses[]', course));
                    } else {
                        formDataToSend.append(key, formData[key]);
                    }
                });

                const response = await axios.post('http://localhost:3011/api/employees', formDataToSend);

                console.log('Employee created successfully:', response.data);
                alert('Employee created successfully!');
            } catch (error) {
                console.error('Error creating employee:', error.response ? error.response.data : error.message);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="create-employee">
            <h1>Create Employee</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile No:</label>
                    <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                    {errors.mobile && <span className="error-message">{errors.mobile}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="designation">Designation:</label>
                    <select
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Designation</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    {errors.designation && <span className="error-message">{errors.designation}</span>}
                </div>

                <fieldset className="form-group">
                    <legend>Gender:</legend>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={formData.gender === 'Male'}
                            onChange={handleChange}
                            required
                        /> Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={formData.gender === 'Female'}
                            onChange={handleChange}
                            required
                        /> Female
                    </label>
                    {errors.gender && <span className="error-message">{errors.gender}</span>}
                </fieldset>

                <fieldset className="form-group">
                    <legend>Course:</legend>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="MCA"
                            checked={formData.courses.includes('MCA')}
                            onChange={handleChange}
                        /> MCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BCA"
                            checked={formData.courses.includes('BCA')}
                            onChange={handleChange}
                        /> BCA
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="course"
                            value="BSC"
                            checked={formData.courses.includes('BSC')}
                            onChange={handleChange}
                        /> BSC
                    </label>
                    {errors.courses && <span className="error-message">{errors.courses}</span>}
                </fieldset>

                <div className="form-group">
                    <label htmlFor="image">Image Upload:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept=".jpg, .png"
                        onChange={handleChange}
                        required
                    />
                    {errors.image && <span className="error-message">{errors.image}</span>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default CreateEmployee;










// import React, { useState } from 'react';
// import axios from 'axios';
// import './createEmployee.css';

// const CreateEmployee = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         designation: '',
//         gender: '',
//         courses: [],
//         image: null,
//         // createDate: '',
//     });

//     const [errors, setErrors] = useState({
//         email: '',
//         mobile: '',
//         image: '',
//         // createDate: ''
//     });

//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleChange = (e) => {
//         const { name, value, type, files, checked } = e.target;
//         if (type === 'checkbox') {
//             setFormData(prevData => ({
//                 ...prevData,
//                 courses: checked
//                     ? [...prevData.courses, value]
//                     : prevData.courses.filter(course => course !== value)
//             }));
//         } else if (type === 'file') {
//             setFormData(prevData => ({
//                 ...prevData,
//                 image: files[0]
//             }));
//         } else if (type === 'date') {
//             setFormData(prevData => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         } else {
//             setFormData(prevData => ({
//                 ...prevData,
//                 [name]: value
//             }));
//         }
//     };

//     const validateForm = () => {
//         let valid = true;
//         let emailError = '';
//         let mobileError = '';
//         let imageError = '';
//         // let createDateError = '';

//         if (!formData.email) {
//             emailError = 'Email is required';
//             valid = false;
//         }

//         if (!formData.mobile) {
//             mobileError = 'Mobile number is required';
//             valid = false;
//         } else if (!/^\d+$/.test(formData.mobile)) {
//             mobileError = 'Mobile number must be numeric';
//             valid = false;
//         }

//         if (formData.image && !['image/jpeg', 'image/png'].includes(formData.image.type)) {
//             imageError = 'Only jpg/png files are allowed';
//             valid = false;
//         } else if (!formData.image) {
//             imageError = 'Image is required';
//             valid = false;
//         }

//         // if (!formData.createDate) {
//         //     createDateError = 'Create Date is required';
//         //     valid = false;
//         // }

//         setErrors({ email: emailError, mobile: mobileError, image: imageError,  });
//         return valid;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (validateForm()) {
//             setIsSubmitting(true);
//             try {
//                 const formDataToSend = new FormData();
//                 Object.keys(formData).forEach(key => {
//                     if (key === 'courses') {
//                         formData.courses.forEach(course => formDataToSend.append('courses[]', course));
//                     } else {
//                         formDataToSend.append(key, formData[key]);
//                     }
//                 });

//                 for (let pair of formDataToSend.entries()) {
//                     console.log(pair[0], pair[1]);
//                 }

//                 const response = await axios.post('http://localhost:3011/api/employees', formDataToSend);

//                 console.log('Employee created successfully:', response.data);
//                 alert('Employee created successfully!');
//             } catch (error) {
//                 console.error('Error creating employee:', error.response ? error.response.data : error.message);
//             } finally {
//                 setIsSubmitting(false);
//             }
//         }
//     };

//     return (
//         <div className="create-employee">
//             <h1>Create Employee</h1>
//             <form onSubmit={handleSubmit} encType="multipart/form-data">
//                 <label htmlFor="name">Name:</label>
//                 <input
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                 />
//                 {errors.email && <span className="error-message">{errors.email}</span>}

//                 <label htmlFor="mobile">Mobile No:</label>
//                 <input
//                     type="text"
//                     id="mobile"
//                     name="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     required
//                 />
//                 {errors.mobile && <span className="error-message">{errors.mobile}</span>}

//                 <label htmlFor="designation">Designation:</label>
//                 <select
//                     id="designation"
//                     name="designation"
//                     value={formData.designation}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="" disabled>Select Designation</option>
//                     <option value="HR">HR</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Sales">Sales</option>
//                 </select>

//                 <fieldset>
//                 <legend>Gender:</legend>
//     <label>
//         <input
//             type="radio"
//             name="gender"
//             value="Male"
//             checked={formData.gender === 'Male'}
//             onChange={handleChange}
//             required
//         /> Male
//     </label>
//     <label>
//         <input
//             type="radio"
//             name="gender"
//             value="Female"
//             checked={formData.gender === 'Female'}
//             onChange={handleChange}
//             required
//         /> Female
//     </label>
//                 </fieldset>

//                 <fieldset>
//                     <legend>Course:</legend>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="course"
//                             value="MCA"
//                             checked={formData.courses.includes('MCA')}
//                             onChange={handleChange}
//                         /> MCA
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="course"
//                             value="BCA"
//                             checked={formData.courses.includes('BCA')}
//                             onChange={handleChange}
//                         /> BCA
//                     </label>
//                     <label>
//                         <input
//                             type="checkbox"
//                             name="course"
//                             value="BSC"
//                             checked={formData.courses.includes('BSC')}
//                             onChange={handleChange}
//                         /> BSC
//                     </label>
//                 </fieldset>

//                 <label htmlFor="image">Image Upload:</label>
//                 <input
//                     type="file"
//                     id="image"
//                     name="image"
//                     accept=".jpg, .png"
//                     onChange={handleChange}
//                     required
//                 />
//                 {errors.image && <span className="error-message">{errors.image}</span>}

                
//                 {errors.createDate && <span className="error-message">{errors.createDate}</span>}

//                 <button type="submit" disabled={isSubmitting}>
//                     {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CreateEmployee;