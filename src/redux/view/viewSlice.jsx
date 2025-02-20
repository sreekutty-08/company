import { createSlice } from "@reduxjs/toolkit";
import { addFollowUp, addSwitchIP, editFollowUp, fetchFollowUps, fetchSwitchIPDetails } from "./viewThunk";
import { addCustomer, fetchCustomerDetail } from "../customerTable/customerTableThunk";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    switchIPData: [],
    followUps: [],
    company: {},
    followupModal: false,
    switchIPModal: false,
    reRender: true,
    isEditing: false,
    selectedFollowUp: {}
  },
  reducers: {
    setFollowupModalOn: (state) => {
      state.followupModal = true;
    },
    setFollowupModalOff: (state) => {
      state.followupModal = false;
      state.isEditing = false
      state.selectedFollowUp = {}
    },
    setSwitchIPModalOn: (state) => {
      state.switchIPModal = true;
    },
    setSwitchIPModalOff: (state) => {
      state.switchIPModal = false;
    },
    setIsEditingOn: (state) => {
      state.isEditing = true
    },
    setIsEditingOff: (state) => {
      state.isEditing = false
    },
    setSelectedFollowUp: (state, action) => {
      state.selectedFollowUp = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSwitchIPDetails.fulfilled, (state, action) => {
        state.switchIPData = action.payload;
      })
      .addCase(fetchCustomerDetail.fulfilled, (state, action) => {
        state.company = action.payload;
      })
      .addCase(fetchFollowUps.fulfilled, (state, action) => {
        state.followUps = action.payload;
      })
      .addCase(editFollowUp.fulfilled, (state) => {
        state.reRender = !state.reRender;
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.reRender = !state.reRender
      })
      .addCase(addFollowUp.fulfilled, (state) => {
        state.reRender = !state.reRender
      })
      .addCase(addSwitchIP.fulfilled, (state) => {
        state.reRender = !state.reRender
      })
  },
});

export const {
  setFollowupModalOn,
  setFollowupModalOff,
  setSwitchIPModalOn,
  setSwitchIPModalOff,
  setIsEditingOff,
  setIsEditingOn,
  setSelectedFollowUp
} = viewSlice.actions;
export default viewSlice.reducer;
