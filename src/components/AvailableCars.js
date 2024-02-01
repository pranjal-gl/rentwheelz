import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { bookCar } from '../utils/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
Modal.setAppElement('#root'); // This line is needed for accessibility reasons

function AvailableCars() {
    const dispatch = useDispatch();
    const [cars, setCars] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentCar, setCurrentCar] = useState({});
    const initialFormState = { fromDate: '', toDate: '', passengers: '' };
    const [form, setForm] = useState(initialFormState);
    const { currentUser } = useSelector((state) => state.user.value);

    useEffect(() => {
        axios.get('http://localhost:3000/getPackages')
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const openModal = (car) => {
        let booking = {};
        booking.carName = car.carName;
        booking.status = 'Confirmed'
        booking.image = car.image;
        booking.hourlyRent = car.hourlyRent;
        setCurrentCar(booking)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        resetForm();
        setModalIsOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'toDate') {
            const fromDate = new Date(form.fromDate);
            const toDate = new Date(value);

            if (toDate <= fromDate) {
                alert('To date cannot be less or equal than From date');
                return;
            }
        }
        if (name === 'fromDate') {
            const fromDate = new Date(value);
            const toDate = new Date(form.toDate);

            if (toDate <= fromDate) {
                alert('From date cannot be greater or equal than To date');
                return;
            }
        }
        if (name === 'passengers') {
            if (!Number.isInteger(+value) || +value <= 0) {
                alert('Number of passengers must be a positive integer');
                return;
            }
        }

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        let totalDays = calculateDays();
        let total = totalDays * parseInt(currentCar.hourlyRent) * 24;
        let booking = { ...currentCar, ...form, total, userEmail: currentUser };
        console.log(booking);

        dispatch(bookCar(booking)) // Dispatch bookCar with booking
            .then(() => {
                toast.success('Booking successful');
            })
            .catch((error) => {
                toast.error('Booking failed');
            });

        resetForm();
        closeModal();
    };

    const resetForm = () => {
        setForm(initialFormState);
    };

    const calculateDays = () => {
        const fromDate = new Date(form.fromDate);
        const toDate = new Date(form.toDate);
        const differenceInTime = toDate.getTime() - fromDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays;
    };

    return (
        <div>
            <ToastContainer />
            <div className='cards'>
                {cars.map((car, index) => (
                    <div className='card' key={index} style={{ margin: '10px', padding: '10px' }}>
                        <img src={car.image} alt={car.name} style={{ width: '100%', height: '200px' }} />
                        <h2>{car.carName}</h2>
                        <p>Hourly Price: ₹{car.hourlyRent}</p>
                        <button onClick={() => openModal(car)} className='btn'>Reserve</button>
                    </div>
                ))}
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            textAlign: 'center',
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            width: '50%',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px',
                            height: '50%'
                        }
                    }}
                >
                    <h2>Reserve Car</h2>
                    <form onSubmit={handleSubmit}>
                        <label className='reserve-label'>From date</label>
                        <br />
                        <input type="date" name="fromDate" value={form.fromDate} onChange={handleChange} className='reserve-input' />
                        <br />
                        <label className='reserve-label'>To date</label>
                        <br />
                        <input type="date" name="toDate" value={form.toDate} onChange={handleChange} className='reserve-input' />
                        <br />
                        <label className='reserve-label'>Number of passengers</label>
                        <br />
                        <input type="number" name="passengers" min="1" value={form.passengers} onChange={handleChange} className='reserve-input' />
                        <br />
                        <button type="submit" className='btn modal-btn'>Reserve</button>
                        <button type="button" onClick={closeModal} className='btn modal-btn'>Cancel</button>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
export default AvailableCars;