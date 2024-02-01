import { useDispatch } from 'react-redux';
import { loginUser } from '../utils/slices/userSlice'; // Replace './userSlice' with the actual path to your userSlice file
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import car from '../car.png'
function LoginUser() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        userEmail: '',
        userPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form)).then((res) => {
            navigate('/bookcar');
            toast.success('Login successful');
        }).catch((error) => {

        });
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='login'>
            <ToastContainer />
            <div className='form-div'>
                <h3>Login</h3>
                <form onSubmit={handleSubmit} className='login-form'>
                    <input type="email" name="userEmail" value={form.userEmail} onChange={handleChange} required placeholder='Email' className='hundred' />
                    <br />
                    <div>
                        <input type={showPassword ? "text" : "password"} name="userPassword" value={form.userPassword} onChange={handleChange} placeholder="Password" required className='seventy' />
                        <input type="button" onClick={handleShowPassword} className='thirty' value={showPassword ? "Hide Password" : "Show Password"} />
                    </div>
                    <br />
                    <button type="submit" className='btn'>Login</button>
                </form>
                <p>Don't have an account? <Link to="/">Register</Link></p> {/* Use Link component to navigate to / */}
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

export default LoginUser;