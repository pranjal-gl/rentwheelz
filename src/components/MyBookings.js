import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useSelector, useDispatch } from 'react-redux';
import { cancelBooking, getBookings } from '../utils/slices/userSlice';
import { toast, ToastContainer } from 'react-toastify';
function MyBookings() {
    const dispatch = useDispatch();
    const { bookings, currentUser } = useSelector((state) => state.user.value);

    useEffect(() => {
        dispatch(getBookings(currentUser))
    }, []);

    const cancelHelper = (bookingId) => {
        dispatch(cancelBooking(bookingId)).then((res) => {
            toast.success('Booking Cancelled');
        })
        dispatch(getBookings(currentUser));
    }

    return (
        <div>
            <ToastContainer />
            <Tabs>
                <TabList>
                    <Tab>All</Tab>
                    <Tab>Confirmed</Tab>
                    <Tab>Completed</Tab>
                    <Tab>Cancelled</Tab>
                </TabList>

                <TabPanel>
                    <div className='cards'>
                        {bookings.length > 0 ? (bookings.map((booking, index) => (
                            <div className='card' key={index} style={{ margin: '10px', padding: '10px' }}>
                                <img src={booking.image} alt={booking.name} style={{ width: '100%', height: '200px' }} />
                                <h2>{booking.carName}</h2>
                                <p>From: {booking.fromDate} To: {booking.toDate}</p>
                                <p>Total Rent: ₹{booking.total}</p>
                                <p style={booking.status === 'Cancelled' ? { color: 'Red' } : booking.status === 'Confirmed' ? { color: 'green' } : { color: 'darkgoldenrod' }}>{booking.status.toUpperCase()}</p>
                                <button disabled={booking.status !== 'Confirmed'} onClick={() => cancelHelper(booking._id)} className='btn'>Cancel Ride</button>
                            </div>
                        ))) : <h1>No Bookings to show</h1>}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='cards'>
                        {bookings.filter(booking => booking.status === 'Confirmed').length > 0 ? (bookings.filter(booking => booking.status === 'Confirmed').map((booking, index) => (
                            <div className='card' key={index} style={{ margin: '10px', padding: '10px' }}>
                                <img src={booking.image} alt={booking.name} style={{ width: '100%', height: '200px' }} />
                                <h2>{booking.carName}</h2>
                                <p>From: {booking.fromDate} To: {booking.toDate}</p>
                                <p>Total Rent: ₹{booking.total}</p>
                                <p style={{ color: 'green' }}>{booking.status.toUpperCase()}</p>
                                <button onClick={() => cancelHelper(booking._id)} className='btn'>Cancel Ride</button>
                            </div>
                        ))) : <h1>No Confirmed Bookings to show</h1>}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='cards'>
                        {bookings.filter(booking => booking.status === 'Completed').length > 0 ? (bookings.filter(booking => booking.status === 'Completed').map((booking, index) => (
                            <div className='card' key={index} style={{ margin: '10px', padding: '10px' }}>
                                <img src={booking.image} alt={booking.name} style={{ width: '100%', height: '200px' }} />
                                <h2>{booking.carName}</h2>
                                <p>From: {booking.fromDate} To: {booking.toDate}</p>
                                <p>Total Rent: ₹{booking.total}</p>
                                <p style={{ color: 'darkgoldenrod' }}>{booking.status}</p>
                            </div>
                        ))) : <h1>No Completed Bookings to show</h1>}
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className='cards'>
                        {bookings.filter(booking => booking.status === 'Cancelled').length > 0 ? (bookings.filter(booking => booking.status === 'Cancelled').map((booking, index) => (
                            <div className='card' key={index} style={{ margin: '10px', padding: '10px' }}>
                                <img src={booking.image} alt={booking.name} style={{ width: '100%', height: '200px' }} />
                                <h2>{booking.carName}</h2>
                                <p>From: {booking.fromDate} To: {booking.toDate}</p>
                                <p>Total Rent: ₹{booking.total}</p>
                                <p style={{ color: 'red' }}>{booking.status}</p>
                            </div>
                        ))) : <h1>No Cancelled Bookings to show</h1>}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default MyBookings;