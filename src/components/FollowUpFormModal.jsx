import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowupModalOff } from "../redux/view/viewSlice";
import { addFollowUp, editFollowUp } from "../redux/view/viewThunk";

const FollowUpFormModal = ({ company_id }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { followupModal, selectedFollowUp, isEditing } = useSelector(
    (state) => state.view
  );

  useEffect(() => {
    if (isEditing && selectedFollowUp) {
      setMessage(selectedFollowUp.followupDescription);
      console.log(selectedFollowUp);
      
    } else {
      setMessage("");
    }
  }, [isEditing, selectedFollowUp]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (isEditing) {
      dispatch(
        editFollowUp({
          followUpId: selectedFollowUp.followupId,
          data: { message: message },
        })
      );
    } else {
      dispatch(addFollowUp({ company_id, data: { message: message } }));
    }
    dispatch(setFollowupModalOff());
  };

  return (
    <Dialog
      open={followupModal}
      onClose={() => dispatch(setFollowupModalOff())}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0px 6px 14px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "1.2rem",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <Typography variant="h6" className="text-gray-800 font-semibold">
          Follow-Up Message
        </Typography>
        <IconButton
          onClick={() => dispatch(setFollowupModalOff())}
          sx={{
            color: "#666",
            transition: "color 0.2s ease-in-out",
            "&:hover": { color: "#000" },
          }}
        >
          <X size={24} />
        </IconButton>
      </DialogTitle>

      {/* Form */}
      <DialogContent className="mt-3">
        <form onSubmit={handleSubmit} className="space-y-5">
          <TextareaAutosize
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your follow-up message..."
            minRows={5}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              fontSize: "1rem",
              backgroundColor: "#f9f9f9",
              transition: "border-color 0.2s ease-in-out",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#007bff")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />

          {/* Buttons */}
          <DialogActions sx={{ justifyContent: "flex-end", gap: "12px" }}>
            <Button
              onClick={() => dispatch(setFollowupModalOff())}
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#555",
                borderRadius: "8px",
                padding: "8px 16px",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!message.trim()}
              sx={{
                backgroundColor: message.trim() ? "#007bff" : "#ccc",
                color: "#fff",
                borderRadius: "8px",
                padding: "8px 16px",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: message.trim() ? "#0056b3" : "#ccc",
                },
              }}
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
