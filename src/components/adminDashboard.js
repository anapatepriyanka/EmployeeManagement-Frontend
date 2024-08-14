
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import EmployeeList from './employees/employeeList'; // Import the EmployeeList component

// export default function AdminDashboard() {
//     const { user, handleLogout } = useAuth();

//     return (
//         <div className="container mt-5">
//             <div className="mt-3">
//                 <Link to="/home" className="btn btn-primary">Home</Link>
//             </div>
//             <div className="col-md-6 text-end">
//                 <span>Welcome, {user ? user.username : 'Guest'}</span>
//                 <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
//             </div>
//             <div className="row justify-content-between">
//                 <div className="col-md-6">
//                     <h1>Welcome Admin Panel</h1>
//                 </div>
//             </div>
//             <div className="mt-4">
//                 {/* Render the EmployeeList component here */}
//                 <EmployeeList />
//             </div>
//         </div>
//     );
// }
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import EmployeeList from './employees/employeeList'; 

export default function AdminDashboard() {
    const { user, handleLogout } = useAuth();
    const [showEmployeeList, setShowEmployeeList] = useState(false); 

    const handleShowEmployeeList = () => {
        setShowEmployeeList(true); 
    };

    return (
        <div className="container mt-5">
            <div className="mt-3">
                <Link to="/home" className="btn btn-primary">Home</Link>
            </div>
            <div className="col-md-6 text-end">
                <span>Welcome, {user ? user.username : 'Guest'}</span>
                <button className="btn btn-danger ms-3" onClick={handleLogout}>Logout</button>
            </div>
            <div className="row justify-content-between">
                <div className="col-md-6">
                    <h1>Welcome to the Admin Panel</h1>
                </div>
            </div>
            <div className="mt-4">
                {!showEmployeeList && (
                    <button className="btn btn-info" onClick={handleShowEmployeeList}>
                        View Employee List
                    </button>
                )}

                {showEmployeeList && <EmployeeList />}
            </div>
        </div>
    );
}