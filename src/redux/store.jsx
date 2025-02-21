import { configureStore } from "@reduxjs/toolkit";
import customerTableReducer from './customerTable/customerTableSlice'
import viewReducer from './view/viewSlice'

export const store = configureStore({
    reducer: {
        customers: customerTableReducer,
        view: viewReducer
    }
})