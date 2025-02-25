import { createSlice } from "@reduxjs/toolkit";
import { fetchCustomerDetails } from "./customerTableThunk";

const customerTableSlice = createSlice({
  name: "customers",
  initialState: {
    customerData: [],
    selectedStatus: "",
    selectedPriority: "",
    selectedUserType: "",
    selectedTechDetails: "",
    search:"",
    customerModal: false,
  },
  reducers: {
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
    },
    setSelectedPriority: (state, action) => {
      state.selectedPriority = action.payload;
    },
    setSelectedUserType: (state, action) => {
      state.selectedUserType = action.payload;
    },
    setSelectedTechDetails: (state, action) => {
      state.selectedTechDetails = action.payload;
    },
    setCustomerModalOn: (state) => {
      state.customerModal = true;
    },
    setCustomerModalOff: (state) => {
      state.customerModal = false;
    },
    removeSelectedFilters: (state) => {
      state.selectedStatus = "";
      state.selectedPriority = "";
      state.selectedUserType = "";
      state.selectedTechDetails = "";
    },
    setSearch: (state, action) => {
      state.search = action.payload;      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCustomerDetails.fulfilled, (state, action) => {
      state.customerData = action.payload;
    });
  },
});

export const {
  setSelectedStatus,
  setSelectedPriority,
  setSelectedTechDetails,
  setSelectedUserType,
  setCustomerModalOn,
  setCustomerModalOff,
  removeSelectedFilters,
  setSearch
} = customerTableSlice.actions;
export default customerTableSlice.reducer;
