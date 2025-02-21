import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addSwitchIP } from "../redux/view/viewThunk";

const SwitchIpFormModal = ({  closeModal, company_id }) => {
  const [ip, setIp] = useState("");
  const {switchIPModal} = useSelector(state => state.view)
const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSwitchIP({company_id: company_id, data:{ip:ip}}))
    closeModal(); // Close modal after submission
  };

  return (
    <Dialog open={switchIPModal} onClose={closeModal} fullWidth maxWidth="sm">
      <DialogTitle className="text-lg font-semibold">Add Switch IP</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="IP Address"
          variant="outlined"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="mt-2"
        />
      </DialogContent>
      <DialogActions className="p-4">
        <Button onClick={closeModal} className="text-gray-600">Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" className="bg-blue-600 text-white">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SwitchIpFormModal;
