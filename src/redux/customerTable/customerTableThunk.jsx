import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosConfiguration"

export const fetchCustomerDetails = createAsyncThunk(
    "customers/fetchCustomerDetails",
    async ( _, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("api/company/")
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const fetchCustomerDetail = createAsyncThunk(
    "customers/fetchCustomerDetail",
    async ( id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`api/company/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async(data, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post("api/company/", data)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)