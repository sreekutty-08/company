import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import instance from "../axios/axiosConfiguration";

const CustomerTable = ({ customerData }) => {
  const navigate = useNavigate();

  // Filter out the customer with userEmail "amal@gmail.com"
  const filteredData = customerData.filter(customer => customer.userEmail !== "amal@gmail.com");

  const handleView = (id) => {
    navigate(`/view/${id}`);
  };

  const handleDelete = async (id) => {
    await instance.delete(`api/customer/${id}`);
    window.location.reload();
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
            {filteredData.map((row, index) => (
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
      </TableContainer>
    </div>
  );
};

export default CustomerTable;
