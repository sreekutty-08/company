import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const statusOptions = ["Active", "Inactive", "Junk", "Hot", "New"];
const technicalDetailsOptions = [
  "Test Passed",
  "Test Initiated",
  "Test Fail",
  "Pending",
];
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

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {[
            { name: "company_name", label: "Company Name" },
            { name: "contact_person", label: "Contact Person" },
            { name: "company_email", label: "Company Email" },
            { name: "country", label: "Country" },
            { name: "company_phone", label: "Company Phone" },
            { name: "address", label: "Address" },
            { name: "support_email", label: "Support Email" },
          ].map(({ name, label }) => (
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
                />
              )}
            />
          ))}

          {[{ name: "status", options: statusOptions },
            { name: "technical_details", options: technicalDetailsOptions },
            { name: "priority", options: priorityOptions },
            { name: "user_type", options: userTypeOptions }].map(({ name, options }) => (
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
          
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerModal;
