import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addSwitchIP } from "../redux/view/viewThunk";

const SwitchIpFormModal = ({ company_id, open, closeModal }) => {
  
  const [ip, setIp] = useState("");
  const [status, setStatus] = useState("Active"); // Default status is Active
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSwitchIP({ company_id, data: { ip, status } })); // Save IP with Status
    setIp("")
    closeModal(); // Close modal after adding IP
  };

  return (
    <Dialog open={open} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Add Switch IP</DialogTitle>
      <DialogContent>
        {/* IP Address Input */}
        <TextField
          fullWidth
          label="IP Address"
          variant="outlined"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          sx={{ marginTop: "10px" }}
        />

        {/* Status Dropdown (Active/Inactive) */}
        <FormControl fullWidth sx={{ marginTop: "16px" }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
          >
            <MenuItem value="Active" sx={{ color: "green" }}>Active</MenuItem>
            <MenuItem value="Inactive" sx={{ color: "red" }}>Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button onClick={closeModal} sx={{ color: "gray" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "#007BFF", color: "#fff" }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SwitchIpFormModal;