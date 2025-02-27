import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axiosConfiguration";
import { useDispatch, useSelector } from "react-redux";
import { setEditCustomerModalOff, setEditCustomerModalOn, setSelectedCustomer } from "../redux/customerTable/customerTableSlice";
import AddCustomerModal from "./AddCustomerModal";
import { editCustomer } from "../redux/customerTable/customerTableThunk";


const CustomerTable = ({ customerData }) => {
  const { editCustomerModal } = useSelector((state) => state.customers);
  const selectedCustomer = useSelector((state) => state.customers.selectedCustomer);
  const isEdit = Boolean(selectedCustomer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customer, setCustomer] = useState([]);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2); // Change this number as needed

  useEffect(() => {
    const filteredData = customerData.filter(customer => customer.userEmail !== "amal@gmail.com");
    setCustomer(filteredData);
  }, [customerData]);

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this customer?");
    if (confirmDelete) {
      try {
        await instance.delete(`api/customer/${id}`);
        
        // Remove the deleted customer from the local state
        setCustomer((prevCustomers) => prevCustomers.filter(customer => customer.id !== id));
        
        alert("Customer deleted successfully");
      } catch (error) {
        console.error("Error deleting customer:", error);
        alert("Failed to delete customer. Please try again.");
      }
    }
  };
  
  const handleEditCustomer = async (updatedData) => {
    try {
      const result = await dispatch(editCustomer(updatedData));
  
      if (editCustomer.fulfilled.match(result)) {
        setCustomer((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.id === updatedData.id ? { ...customer, ...updatedData } : customer
          )
        );
  
        alert("Customer updated successfully");
      } else {
        console.error("Error updating customer:", result.error);
        alert("Failed to update customer. Please check for duplicate data.");
      }
    } catch (error) {
      console.error("Unexpected error updating customer:", error);
      alert("An unexpected error occurred.");
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-6">
      <TableContainer
        component={Paper}
        className="shadow-lg overflow-hidden"
        sx={{
          borderRadius: 0,
          borderLeft: "none",
          borderRight: "none",
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customer details table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#002B5B" }}>
              {[
                "Company Name",
                "Contact Person",
                "Country",
                "Priority",
                "Status",
                "User Type",
                "Account Status",
                "Actions",
              ].map((header, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "#fff",
                    padding: "12px",
                    borderBottom: "2px solid #ddd",
                    textAlign: header === "Actions" ? "center" : "left",
                    width: header === "Actions" ? "120px" : "auto",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {customer
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Apply pagination
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#FFFFFF",
                    "&:hover": { backgroundColor: "#E3E3E3" },
                    height: "50px",
                  }}
                >
                  <TableCell sx={{ padding: "12px" }}>{row.companyName}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{row.contactPerson}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{row.country}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{row.priority}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{row.customerStatus}</TableCell>
                  <TableCell sx={{ padding: "12px" }}>{row.user_type}</TableCell>
                  <TableCell sx={{ padding: "12px", width: "150px" }}>
                    {row.technical_details}
                  </TableCell>

                  <TableCell sx={{ padding: "12px", textAlign: "center", width: "120px" }}>
                    <div className="flex justify-center gap-6">
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#007BFF",
                          color: "#fff",
                          fontSize: "12px",
                          textTransform: "none",
                          borderRadius: "4px",
                          "&:hover": { backgroundColor: "#0056b3" },
                        }}
                        onClick={() => handleView(row.id)}
                      >
                        View
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#ff6600",
                          color: "#fff",
                          fontSize: "12px",
                          textTransform: "none",
                          borderRadius: "4px",
                          "&:hover": { backgroundColor: "#B71C1C" },
                        }}
                        onClick={() => {
                          dispatch(setSelectedCustomer(row)); // Pass the selected row data
                          dispatch(setEditCustomerModalOn()); // Open the modal
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "#D32F2F",
                          color: "#fff",
                          fontSize: "12px",
                          textTransform: "none",
                          borderRadius: "4px",
                          "&:hover": { backgroundColor: "#B71C1C" },
                        }}
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination Component */}
        <TablePagination
          rowsPerPageOptions={[2, 5, 10]}
          component="div"
          count={customer.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddCustomerModal
          open={editCustomerModal}
          handleClose={() => {
            dispatch(setEditCustomerModalOff());
            dispatch(setSelectedCustomer(null));
          }}
          onSubmit={handleEditCustomer}
          isEdit={isEdit}
          editData={selectedCustomer}
        />
      </TableContainer>
    </div>
  );
};

export default CustomerTable;
