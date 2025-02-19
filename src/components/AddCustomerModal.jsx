import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineMail, AiOutlinePhone, AiOutlineGlobal, AiOutlineBuild } from "react-icons/ai";
import { FiUser, FiMapPin } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";

const statusOptions = ["Active", "Inactive", "Junk", "Hot", "New"];
const technicalDetailsOptions = ["Test Passed", "Test Initiated", "Test Fail", "Pending"];
const priorityOptions = ["High", "Medium", "Low"];
const userTypeOptions = ["Client", "Vendor"];

const schema = yup.object().shape({
  company_name: yup.string().required("Company name is required"),
  contact_person: yup.string().required("Contact person is required"),
  company_email: yup.string().email("Invalid email").required("Email is required"),
  country: yup.string().required("Country is required"),
  company_phone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  support_email: yup.string().email("Invalid email").required("Support email is required"),
  status: yup.string().oneOf(statusOptions).required("Status is required"),
  technical_details: yup.string().oneOf(technicalDetailsOptions).required("Technical details are required"),
  priority: yup.string().oneOf(priorityOptions).required("Priority is required"),
  user_type: yup.string().oneOf(userTypeOptions).required("User type is required"),
});

const AddCustomerModal = ({ open, handleClose, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fields = [
    { name: "company_name", label: "Company Name", icon: <BsBuilding color="#1565C0" size={20} /> },
    { name: "contact_person", label: "Contact Person", icon: <FiUser color="#1565C0" size={20} /> },
    { name: "company_email", label: "Company Email", icon: <AiOutlineMail color="#1565C0" size={20} /> },
    { name: "country", label: "Country", icon: <AiOutlineGlobal color="#1565C0" size={20} /> },
    { name: "company_phone", label: "Company Phone", icon: <AiOutlinePhone color="#1565C0" size={20} /> },
    { name: "address", label: "Address", icon: <FiMapPin color="#1565C0" size={20} /> },
    { name: "support_email", label: "Support Email", icon: <AiOutlineMail color="#1565C0" size={20} /> },
    { name: "company_website", label: "company_website", icon: <AiOutlineBuild color="#1565C0" size={20} /> },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      {/* Header */}
      <DialogTitle className="bg-white text-black text-center text-lg font-semibold flex items-center gap-2 shadow-sm px-4 py-2">
        <AiOutlineGlobal color="#1565C0" size={24} /> Add Customer
      </DialogTitle>

      <DialogContent className="p-6 bg-gray-50">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Fields with Icons */}
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ name, label, icon }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    fullWidth
                    margin="dense"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                    }}
                  />
                )}
              />
            ))}
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            {[{ name: "status", options: statusOptions },
              { name: "technical_details", options: technicalDetailsOptions },
              { name: "priority", options: priorityOptions },
              { name: "user_type", options: userTypeOptions }
            ].map(({ name, options }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label={name.replace("_", " ").toUpperCase()}
                    fullWidth
                    margin="dense"
                    error={!!errors[name]}
                    helperText={errors[name]?.message}
                    className="bg-white rounded-md"
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            ))}
          </div>

          {/* Buttons */}
          <DialogActions className="mt-4 flex justify-between px-6">
            <Button
              onClick={handleClose}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-md transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all shadow-md"
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
