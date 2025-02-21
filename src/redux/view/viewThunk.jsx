import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axiosConfiguration";

export const fetchSwitchIPDetails = createAsyncThunk(
  "customers/fetchSwitchIPs",
  async (company_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/switchips/${company_id}`);
      console.log(response.data.ips);
      
      return response.data.ips.switchIps;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);   


export const addSwitchIP = createAsyncThunk(
  "customers/addSwitchIP",
  async ({company_id, data}, { rejectWithValue }) => {
    console.log(data);
    
    try {
      const response = await axiosInstance.put(
        `api/switchips/${company_id}`,
        data
      );
      return response.data;
    } catch (error) {
        console.log(error);  
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFollowUps = createAsyncThunk(
  "customers/fetchFollowUp",
  async (company_id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/followups/${company_id}`);      
      return response.data.followups;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFollowUp = createAsyncThunk(
  "customers/addFollowUp",
  async ({company_id, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `api/followups/${company_id}`,
        data
      );
      return response.data.followups;
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const editFollowUp = createAsyncThunk(
  "customers/editFollowUp",
  async ({followUpId, data}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `api/followup/${followUpId}`,
        data
      );
      return response.data;
    } catch (error) {
        console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

