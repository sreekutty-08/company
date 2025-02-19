import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { X } from "lucide-react"; // Close icon
import { useDispatch, useSelector } from "react-redux";
import { setFollowupModalOff } from "../redux/view/viewSlice";
import { addFollowUp } from "../redux/view/viewThunk";

const FollowUpFormModal = ({ company_id }) => {
  const [message, setMessage] = useState("");
  const { followupModal } = useSelector((state) => state.view);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFollowUp({ company_id: 1, data: { message: message } }));

    dispatch(setFollowupModalOff());
  };
  const dispatch = useDispatch();
  return (
    <Dialog
      open={followupModal}
      onClose={() => dispatch(setFollowupModalOff())}
      className="max-w-lg mx-auto"
    >
      <DialogTitle className="flex items-center justify-between">
        Follow Up Message
        <button
          onClick={() => dispatch(setFollowupModalOff())}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <X size={24} />
        </button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextareaAutosize
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your follow-up message here..."
            minRows={5}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <DialogActions className="flex justify-end mt-4">
            <Button
              onClick={() => dispatch(setFollowupModalOff())}
              className="mr-2 text-gray-700 bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpFormModal;
