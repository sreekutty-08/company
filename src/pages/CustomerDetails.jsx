import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import FilterBy from "../components/FilterBy";
import { Typography, Box, Button, Paper, Grid2 } from "@mui/material";
import { UserCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedFilters,
  setCustomerModalOff,
  setCustomerModalOn,
  setSelectedPriority,
  setSelectedStatus,
  setSelectedTechDetails,
  setSelectedUserType,
} from "../redux/customerTable/customerTableSlice";
import {
  addCustomer,
  fetchCustomerDetails,
} from "../redux/customerTable/customerTableThunk";
import AddCustomerModal from "../components/AddCustomerModal";
import SearchComponent from "../components/SearchComponent";

const CustomerDetails = () => {
  const dispatch = useDispatch();
  const { reRender } = useSelector((state) => state.view);
  const {
    selectedStatus,
    selectedPriority,
    selectedUserType,
    selectedTechDetails,
    customerData,
    customerModal,
  } = useSelector((state) => state.customers);

  const [filteredData, setFilteredData] = useState(customerData);

  useEffect(() => {
    dispatch(fetchCustomerDetails()).unwrap();
  }, [reRender]);

  useEffect(() => {
    const filtered = customerData.filter((customer) => {
      return (
        (!selectedStatus || customer.status === selectedStatus) &&
        (!selectedPriority || customer.priority === selectedPriority) &&
        (!selectedUserType || customer.user_type === selectedUserType) &&
        (!selectedTechDetails ||
          customer.technical_details === selectedTechDetails)
      );
    });
    setFilteredData(filtered);
  }, [
    selectedStatus,
    selectedPriority,
    selectedUserType,
    selectedTechDetails,
    customerData,
  ]);

  const onPriorityChange = (val) => dispatch(setSelectedPriority(val));
  const onStatusChange = (val) => dispatch(setSelectedStatus(val));
  const onUserTypeChange = (val) => dispatch(setSelectedUserType(val));
  const onTechnicalStatusChange = (val) =>
    dispatch(setSelectedTechDetails(val));

  const PRIORITIES = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];
  const STATUS = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Junk", value: "Junk" },
    { label: "Spam", value: "Spam" },
    { label: "Hot", value: "Hot" },
    { label: "New", value: "New" },
  ];
  const TECHDETAILS = [
    { label: "Pending", value: "Pending" },
    { label: "Test Passed", value: "Test Passed" },
    { label: "Test Fail", value: "Test Fail" },
    { label: "Test Initiated", value: "Test Initiated" },
  ];
  const USERTYPE = [
    { label: "Client", value: "Client" },
    { label: "Vendor", value: "Vendor" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "30px",
      }}
    >
      {/* Container for Heading & Filters */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1400px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "24px",
          marginBottom: "24px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: "0px", // Squared corners
        }}
      >
        {/* Heading with Icon */}
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <UserCircle size={36} color="#ff6600" /> {/* Orange Icon */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#333",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Customer Details
          </Typography>
        </Box>

        {/* Filters & Button in One Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
          }}
        >
          <Grid2 container spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
            <Grid2 item xs={12} sm={6} md={2.5}>
              <FilterBy
                options={PRIORITIES}
                value={selectedPriority}
                onChange={onPriorityChange}
                label="Priority"
                placeholder="Select"
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={2.5}>
              <FilterBy
                options={STATUS}
                value={selectedStatus}
                onChange={onStatusChange}
                label="Status"
                placeholder="Select"
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={2.5}>
              <FilterBy
                options={USERTYPE}
                value={selectedUserType}
                onChange={onUserTypeChange}
                label="User Type"
                placeholder="Select"
              />
            </Grid2>
            <Grid2 item xs={12} sm={6} md={2.5}>
              <FilterBy
                options={TECHDETAILS}
                value={selectedTechDetails}
                onChange={onTechnicalStatusChange}
                label="Tech Status"
                placeholder="Select"
              />
            </Grid2>

            {/* Remove Filter Button */}
            <Grid2 item xs={12} sm={6} md={2}>
              <Button
                onClick={() => dispatch(removeSelectedFilters())}
                fullWidth
                variant="contained"
                className="flex! items-center! justify-center! gap-2! rounded-lg! bg-orange-500! px-4! py-3! text-white! font-semibold! text-base! shadow-md! transition-all! duration-200! hover:bg-orange-600! hover:scale-105! active:scale-95!"
              >
                <XCircle className="w-5 h-5" />
                Remove Filters
              </Button>
            </Grid2>
            <Grid2 item xs={12} sm={6} md={2.5}>
              <SearchComponent />
            </Grid2>

            {/* Add Customer Button */}
            <Grid2 item xs={12} sm={6} md={2}>
              <Button
                fullWidth
                onClick={() => dispatch(setCustomerModalOn())}
                sx={{
                  backgroundColor: "#ff6600",
                  color: "#fff",
                  fontWeight: "bold",
                  padding: "12px",
                  fontSize: "16px",
                  textTransform: "none",
                  borderRadius: "8px",
                  height: "100%",
                  "&:hover": {
                    backgroundColor: "#e55b00",
                  },
                }}
              >
                + Add Customer
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Paper>

      {/* Container for Table */}
      <Paper
        elevation={3}
        sx={{
          maxWidth: "1400px",
          width: "100%",
          backgroundColor: "#fff",
          padding: "28px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: "0px", // Squared corners
        }}
      >
        {/* Table */}
        <CustomerTable customerData={filteredData} />

        {/* Add Customer Modal */}
        <AddCustomerModal
          open={customerModal}
          handleClose={() => dispatch(setCustomerModalOff())}
          onSubmit={(data) => dispatch(addCustomer(data))}
        />
      </Paper>
    </Box>
  );
};

export default CustomerDetails;
