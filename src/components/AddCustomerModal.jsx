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
import { AiOutlineMail, AiOutlinePhone, AiOutlineGlobal, AiOutlineLock } from "react-icons/ai";
import { FiUser, FiMapPin } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { IoGlobeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addCustomer, editCustomer } from "../redux/customerTable/customerTableThunk";

const statusOptions = ["Active", "Inactive", "Junk", "Hot", "New"];
const technicalDetailsOptions = ["Test Passed", "Test Initiated", "Test Fail", "Pending", "Live", "Commercial"];
const priorityOptions = ["High", "Medium", "Low"];
const userTypeOptions = ["Client", "Vendor"];

const schema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  contactPerson: yup.string().required("Contact person is required"),
  companyEmail: yup.string().email("Invalid email").required("Email is required"),
  companyWebsite: yup.string().url("Invalid website URL").required("Company website is required"),
  country: yup.string().required("Country is required"),
  companyPhone: yup.string().required("Phone number is required"),
  address: yup.string().required("Address is required"),
  supportEmail: yup.string().email("Invalid email").required("Support email is required"),
  username: yup.string().required("Username is required"),
  userEmail: yup.string().email("Invalid email").required("User Email is required"),
  customerId: yup.string().required("Password is required"),
  accountManager: yup.string().required("Account Manager is required"),
  customerStatus: yup.string().oneOf(statusOptions).required("Status is required"),
  technical_details: yup.string().oneOf(technicalDetailsOptions).required("Technical details are required"),
  priority: yup.string().oneOf(priorityOptions).required("Priority is required"),
  user_type: yup.string().oneOf(userTypeOptions).required("User type is required"),
});

const AddCustomerModal = ({ open, handleClose, onSubmit, editData, isEdit }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}, 
  });

  React.useEffect(() => {
    if (editData) {
      Object.keys(editData).forEach((key) => {
        setValue(key, editData[key]);
      });
    }
  }, [editData, setValue]);

const handleFormSubmit = async (data) => {
  if(isEdit){
    let result = await dispatch(editCustomer(data));

    if (editCustomer.rejected.match(result)) {
      console.log("Duplicate error response:", result.payload);
      if (result.payload) {
        alert(`Duplicate fields: ${Object.keys(result.payload).join(", ")}`);
      }
    } else {
      onSubmit(data);
      reset();
      handleClose();
      result=''
    }
  }else{
    let result = await dispatch(addCustomer(data));

    if (addCustomer.rejected.match(result)) {
      console.log("Duplicate error response:", result.payload);
      if (result.payload) {
        alert(`Duplicate fields: ${Object.keys(result.payload).join(", ")}`);
      }
    } else {
      onSubmit(data);
      reset();
      handleClose();
      result=''
    }
 }

};

  const fields = [
    { name: "companyName", label: "Company Name", icon: <BsBuilding color="#1565C0" size={20} /> },
    { name: "contactPerson", label: "Contact Person", icon: <FiUser color="#1565C0" size={20} /> },
    { name: "companyEmail", label: "Company Email", icon: <AiOutlineMail color="#1565C0" size={20} /> },
    { name: "companyWebsite", label: "Company Website", icon: <IoGlobeOutline color="#1565C0" size={20} /> },
    { name: "country", label: "Country", icon: <AiOutlineGlobal color="#1565C0" size={20} /> },
    { name: "companyPhone", label: "Company Phone", icon: <AiOutlinePhone color="#1565C0" size={20} /> },
    { name: "address", label: "Address", icon: <FiMapPin color="#1565C0" size={20} /> },
    { name: "supportEmail", label: "Support Email", icon: <AiOutlineMail color="#1565C0" size={20} /> },
    { name: "username", label: "Username", icon: <FiUser color="#1565C0" size={20} /> },
    { name: "userEmail", label: "User Email", icon: <AiOutlineMail color="#1565C0" size={20} /> },
    { name: "customerId", label: "Customer Id", icon: <FiUser color="#1565C0" size={20} /> },
    { name: "accountManager", label: "Account Manager", icon: <FiUser color="#1565C0" size={20} /> },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-white text-black text-center text-lg font-semibold flex items-center gap-2 shadow-sm px-4 py-2">
        <AiOutlineGlobal color="#1565C0" size={24} /> Add Customer
      </DialogTitle>

      <DialogContent className="p-6 bg-gray-50">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {fields.map(({ name, label, icon, type = "text" }) => (
              <Controller
                key={name}
                name={name}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={label}
                    type={type}
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

          <div className="grid grid-cols-2 gap-4">
            {[{ name: "customerStatus", options: statusOptions },
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
