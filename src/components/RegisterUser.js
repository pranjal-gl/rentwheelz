import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Add this line
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { registerUser } from '../utils/slices/userSlice'; // Import registerUser from userSlice
import { useNavigate } from 'react-router-dom';
import car from '../car.png'
import { toast } from 'react-toastify';
function RegisterUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        confirmPassword: '',
        userLicense: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.userPassword !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Here you can handle the form submission. For example, send the form data to the server.
        console.log(form);
        const { confirmPassword, ...userData } = form; // Exclude confirmPassword from form data
        dispatch(registerUser(userData)) // Dispatch registerUser with userData
            .then(() => {
                // Handle successful registration here
                navigate('/login');
                toast.success('Registration successful');
            })
            .catch((error) => {
                // Handle failed registration here
            });
    };

    return (
        <div className='register'>
            <div className='form-div'>
                <h3>Register</h3>
                <form onSubmit={handleSubmit} className='registration-form' >
                    <input type="text" name="userName" value={form.userName} onChange={handleChange} required placeholder='Full Name' className='hundred' />
                    <br />
                    <input type="email" name="userEmail" value={form.userEmail} onChange={handleChange} required placeholder='Email' className='hundred' />
                    <br />
                    <div>
                        <input type="password" name="userPassword" value={form.userPassword} onChange={handleChange} required placeholder='Password' className='fifty' />
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required placeholder='Confirm Password' className='fifty' />
                    </div>
                    <br />
                    <input type="text" name="userLicense" value={form.userLicense} onChange={handleChange} required placeholder='License Number' className='hundred' />
                    <br />
                    <button type="submit" value="Register" className='btn'>Register</button>
                </form>
                <p>Already have an account? <Link to="/login">Login</Link></p> {/* Use Link component to navigate to /login */}
            </div>
            <div className='image-div'>
                <div className='headings'>
                    <h1>Self-Drive Car Rentals</h1>
                    <h3>Drive yourself to an adventure</h3>
                    <h3>Wide Range of Cars</h3>
                    <h3>Starting at ₹60/hr</h3>
                    <h3>Easy Booking</h3>
                    <h3>Doorstep Delivery</h3>
                </div>
                <img src={car} alt="background-image" className='bg-image' />
            </div>
        </div>
    );
}

export default RegisterUser;