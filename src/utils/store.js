import { configureStore } from "@reduxjs/toolkit"
import userReducer from '../utils/slices/userSlice'

const store = configureStore({
    reducer:{
        user: userReducer
    }
})

export default store