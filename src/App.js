// // import React from 'react'
// // import { Routes, Route } from 'react-router-dom';
// // import {useAuth} from './context/AuthContext'
// // import { useEffect } from 'react';
// // import axios from 'axios'

// // import Register from './pages/register';
// // import Login from './pages/login';

// // function App() {
// //   const { handleLogin } = useAuth();
// //     useEffect(() => {
// //         if(localStorage.getItem('token'))  {
// //           (async () => {
// //             const response = await axios.get('http://localhost:3011/api/user/account', {
// //               headers: {
// //                 Authorization: localStorage.getItem('token')
// //               }
// //             })
// //             handleLogin(response.data)
// //           })();
// //         }
// //       }, [])
// //   return (
// //     <div>
// //       <Routes>
// //             <Route path="register" element={<Register />} />
// //             <Route path="/login" element={<Login />} />
// //       </Routes>
// //     </div>
// //   )
// // }

// // export default App
// // import React from 'react';
// // import { Route, Routes, Navigate } from 'react-router-dom';
// // import { useAuth } from './context/AuthContext';
// // import AdminDashboard from './components/adminDashboard';
// // import Login from './pages/login';
// // import Register from './pages/register';
// // import ProtectedRoute from './routes/ProtectedRoute'; // Import the ProtectedRoute component

// // export default function App() {
// //   return (
// //       <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route
// //               path="/admin-dashboard"
// //               element={
// //                   <ProtectedRoute>
// //                       <AdminDashboard />
// //                   </ProtectedRoute>
// //               }
// //           />
// //       </Routes>
// //   );
// //             }
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import AdminDashboard from './components/adminDashboard';
import Home from './pages/home';
import Header from './Header'
import CreateEmployee from './components/employees/CreateEmployee';
import EmployeeList from './components/employees/employeeList';
import EditEmployee from './components/employees/EditEmployee';
// import ProtectedRoute from './routes/ProtectedRoute';

function App() {
    return (
        <div>
            <Header />

            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route
                    path="admin-dashboard"
                    element={<AdminDashboard />}
                />
                <Route
                    path="home"
                    element={<Home />}
                />
                <Route
                    path="create-employee"
                    element={<CreateEmployee />}
                />
                <Route path="/" element={<EmployeeList />} />
                <Route path="/edit-employee/:id" element={<EditEmployee />} />
                {/* Add other routes here */}
            </Routes>
            {/* </ProtectedRoute> */}
        </div>
    );
}
export default App
