import {configureStore} from '@reduxjs/toolkit'
import authSliceReducer from "../Redux/Slices/AuthSlice.js"



const store = configureStore({
    reducer: {
        auth:authSliceReducer

    },
    
})
export default store