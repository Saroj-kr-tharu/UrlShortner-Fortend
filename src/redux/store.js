import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from '../redux/slice/authenticationSlice';
import urlShortnerReducer from '../redux/slice/urlshortnerSlice';


const store = configureStore({
    reducer: {
        authenticationReducer,
        urlShortnerReducer
    }
});


export default store;