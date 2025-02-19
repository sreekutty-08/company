import { createSlice } from "@reduxjs/toolkit";
import { fetchFollowUps, fetchSwitchIPDetails } from "./viewThunk";
import { fetchCustomerDetail } from "../customerTable/customerTableThunk";

const viewSlice = createSlice({
  name: "view",
  initialState: {
    switchIPData: [],
    followUps: [],
    company: {},
    followupModal: false,
    switchIPModal: false,
  },
  reducers: {
    setFollowupModalOn: (state) => {
      state.followupModal = true;
    },
    setFollowupModalOff: (state) => {
      state.followupModal = false;
    },
    setSwitchIPModalOn: (state) => {
      state.switchIPModal = true;
    },
    setSwitchIPModalOff: (state) => {
      state.switchIPModal = false;
    },
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
      });
  },
});

export const {
  setFollowupModalOn,
  setFollowupModalOff,
  setSwitchIPModalOn,
  setSwitchIPModalOff,
} = viewSlice.actions;
export default viewSlice.reducer;
