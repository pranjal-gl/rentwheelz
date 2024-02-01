import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const loginUser = createAsyncThunk('/login', async (formData) => {
    try {
        let url = 'http://localhost:3000/login';
        const res = await axios.post(url, formData);
        return res.data;
    }
    catch (err) {
        console.log(err.response.data.error);
        alert(err.response.data.error);
    }
});

export const registerUser = createAsyncThunk('/register', async (formData) => {
    try {
        let url = 'http://localhost:3000/register';
        const res = await axios.post(url, formData);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
});

export const bookCar = createAsyncThunk('/bookCar', async (formData) => {
    try {
        const url = 'http://localhost:3000/reserve';
        const response = await axios.post(url, formData);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
});

export const cancelBooking = createAsyncThunk('cancel', async (bookingId) => {
    try {
        const url = `http://localhost:3000/cancel/${bookingId}`;
        const response = await axios.put(url);
        return response.data;
    }
    catch (err) {
        console.error(err);
    }
});

export const getBookings = createAsyncThunk('bookings', async (currentUser) => {
    try {
        const url = `http://localhost:3000/my-bookings`;
        const response = await axios.get(url);
        const filterData = response.data.filter(booking => booking.userEmail === currentUser)

        return filterData;
    }
    catch (err) {
        console.error(err);
    }
});

const initialValOfState = {
    isLoggedIn: false,
    currentUser: '',
    bookings: [],
    error: ''
}
const userSlice = createSlice(
    {
        name: 'user',
        initialState: {
            value: initialValOfState
        },
        reducers: {
            logoutUser: (state) => {
                state.value.isLoggedIn = false;
            },
        },
        extraReducers: (builder) => {
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.value.currentUser = action.payload.email;
                state.value.isLoggedIn = true;
            }).addCase(loginUser.rejected, (state, action) => {
                // Handle the rejected action
                console.error('Error in loginUser:', action.error.message);
                state.value.error = action.error.message;
            }).addCase(registerUser.rejected, (state, action) => {
                // Handle the rejected action
                console.error('Error in registerUser:', action.error.message);
                state.value.error = action.error.message;
            }).addCase(bookCar.fulfilled, (state, action) => {

            }).addCase(bookCar.rejected, (state, action) => {
                // Handle the rejected action
                console.error('Error in bookCar:', action.error.message);
                state.value.error = action.error.message;
            })
                .addCase(getBookings.fulfilled, (state, action) => {
                    state.value.bookings = action.payload;
                })
        }
    }
)
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
