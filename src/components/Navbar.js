import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../utils/slices/userSlice';
import { useState } from 'react';

function Navbar() {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.user.value);
    const [isOpen, setIsOpen] = useState(false);

    const setLogut = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="navbar">
            <span>RentWheelz</span>
            {
                isLoggedIn ? isOpen ?
                    <div>
                        <div className="burger-menu">
                            <button onClick={() => setIsOpen(false)} className="burger">X</button>
                            <div>
                                <ul>
                                    <li className='list'>
                                        <p><Link className='nav-links' to='/myBookings'>MY BOOKINGS</Link></p>
                                    </li>
                                    <li className='list'>
                                        <p><Link className='nav-links' to='/bookcar'>AVAILABLE CARS</Link></p>
                                    </li>
                                    <li className='list'>
                                        <p className='nav-links' onClick={setLogut}>LOGOUT</p>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </div> :
                    <button onClick={() => setIsOpen(true)} className="burger">☰</button>
                    : <Link className='login-btn' to='/login'>Login</Link>
            }

        </div>
    )
}

export default Navbar;