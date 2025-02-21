import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosConfiguration"

export const fetchCustomerDetails = createAsyncThunk(
    "customers/fetchCustomerDetails",
    async ( _, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get("api/customers")
            return response.data.customer
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)


export const fetchCustomerDetail = createAsyncThunk(
    "customers/fetchCustomerDetail",
    async ( id, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`api/customer/${id}`)
            return response.data.customer
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addCustomer = createAsyncThunk(
    "customers/addCustomer",
    async(data, {rejectWithValue}) => {
        try {            
            const response = await axiosInstance.post("api/customer", data)
            return response.data.customer
        } catch (error) {
            console.log(error.response.data.duplicateFields);
            if (error.response && error.response.data.duplicateFields) {
                // Map duplicate fields to user-friendly messages
                const duplicateFields = error.response.data.duplicateFields;
                const newServerErrors = {};
                duplicateFields.forEach((field) => {
                    if (field === "companyName") newServerErrors.companyName = "Company Name is already taken.";
                    if (field === "companyEmail") newServerErrors.companyEmail = "Email is already in use.";
                    if (field === "companyWebsite") newServerErrors.companyWebsite = "Company Website is already in use.";
                    if (field === "username") newServerErrors.username = "Username is already in use.";
                    if (field === "userEmail") newServerErrors.userEmail = "User Email is already in use.";
                });
                setDuplicatedData(newServerErrors);
                alert(`Duplicate fields: ${duplicateFields.join(", ")}`);
            } else {
                console.error("Error submitting form:", error.message);
                console.log(error);
                
                alert("An unexpected error occurred. Please try again.");
            }
            return rejectWithValue(error.response.data)
        }
    }
)



// export const addCustomer = createAsyncThunk(
//   "customers/addCustomer",
//   async (data, { rejectWithValue }) => {
//     console.log(data);
    
//     try {
//       const response = await axiosInstance.post("api/customer", data);
//       return response.data; // Ensure frontend gets the correct data format
//     } catch (error) {
//       console.error("Error adding customer:", error);
//       return rejectWithValue(error.response?.data || { error: "Something went wrong" });
//     }
//   }
// );
