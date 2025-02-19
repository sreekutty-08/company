import React, { useEffect, useState } from "react";
import CustomerTable from "../components/CustomerTable";
import FilterBy from "../components/FilterBy";
import { Typography, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerModalOff, setCustomerModalOn, setSelectedPriority, setSelectedStatus, setSelectedTechDetails, setSelectedUserType } from "../redux/customerTable/customerTableSlice";
import { addCustomer, fetchCustomerDetails } from "../redux/customerTable/customerTableThunk";
import AddCustomerModal from "../components/AddCustomerModal";
import { data } from "react-router-dom";

const CustomerDetails = () => {
  const {selectedStatus, selectedPriority, selectedUserType, selectedTechDetails, customerData, customerModal} = useSelector(state => state.customers)
  const [filteredData, setFilteredData] = useState(customerData)
    
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCustomerDetails()).unwrap()
    
  }, [])
  useEffect(() => {
    const filtered = customerData.filter((customer) => {
      return (
        (!selectedStatus || customer.status === selectedStatus) &&
        (!selectedPriority || customer.priority === selectedPriority) &&
        (!selectedUserType || customer.user_type === selectedUserType) &&
        (!selectedTechDetails || customer.technical_details === selectedTechDetails)
      );
    });
  
    setFilteredData(filtered);
    
  }, [selectedStatus, selectedPriority, selectedUserType, selectedTechDetails])

  const onPriorityChange = (val) => {
    dispatch(setSelectedPriority(val))
  }
  const onStatusChange = (val) => {
    dispatch(setSelectedStatus(val))
  }
  const onUserTypeChange = (val) => {
    dispatch(setSelectedUserType(val))
  }
  const onTechnicalStatusChange = (val) => {
    dispatch(setSelectedTechDetails(val))
  }
  const PRIORITIES = [{label:"High", value:"High"}, {label:"Medium", value:"Medium"},{label:"Low", value:"Low"}, ]
  const STATUS = [{label:"Active", value:"Active"}, {label:"Inactive", value:"Inactive"}, {label:"Junk", value:"Junk"}, {label:"Spam", value:"Spam"}, {label:"Hot", value:"Hot"}, {label:"New", value:"New"}, ]
  const TECHDETAILS = [{label:"Pending", value:"Pending"}, {label:"Test Passed", value:"Test Passed"}, {label:"Test Fail", value:"Test Fail"}, {label:"Test Initiated", value:"Test Initiated"},  ]
  const USERTYPE = [{label:"Client", value:"Client"}, {label:"Vendor", value:"Vendor"}, ]
  
  return (
    <>
      <Typography
        variant="h5"
        className="flex justify-center font-poppins text-black-500"
      >
        Customer Details
      </Typography>
      
      <Box className="flex flex-row gap-4 pl-10">
        <FilterBy
          options={PRIORITIES}
          value={selectedPriority}
          onChange={onPriorityChange}
          label="Filter by Priority"
          placeholder={"Select an option"}
        />
        <FilterBy
          options={STATUS}
          value={selectedStatus}
          onChange={onStatusChange}
          label="Filter by Status"
          placeholder={"Select an option"}
        />
        <FilterBy
          options={USERTYPE}
          value={selectedUserType}
          onChange={onUserTypeChange}
          label="Filter by User Type"
          placeholder={"Select an option"}
        />
        <FilterBy
          options={TECHDETAILS}
          value={selectedTechDetails}
          onChange={onTechnicalStatusChange}
          label="Filter by Technical Status"
          placeholder={"Select an option"}
        />
        <Button onClick={() => dispatch(setCustomerModalOn())}>Add Customer</Button>
      </Box>

      <CustomerTable customerData={filteredData} />
      <AddCustomerModal open={customerModal} handleClose={() => dispatch(setCustomerModalOff())} onSubmit={(data) => dispatch(addCustomer(data))}/>
    </>
  );
};

export default CustomerDetails;
