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

const CustomerTable = ({ customerData }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    console.log("View: ", id);
    navigate(`/view/${id}`);
  };

  const handleDelete = (id) => {
    console.log("Delete: ", id);
  };

  return (
    <div className="p-6">
      <TableContainer
        component={Paper}
        className="shadow-lg overflow-hidden"
        sx={{
          borderRadius: 0, // Square corners
          borderLeft: "none", // Remove left border
          borderRight: "none", // Remove right border
          borderTop: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="customer details table">
          {/* Table Header */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#002B5B" }}>
              {[
                "Company Name",
                "Contact Person",
                "country",
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
                    width: header === "Actions" ? "120px" : "auto", // **Reduce "Actions" column width**
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {customerData.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#F9F9F9" : "#FFFFFF",
                  "&:hover": { backgroundColor: "#E3E3E3" },
                  height: "50px",
                }}
              >
                <TableCell sx={{ padding: "12px" }}>{row.company_name}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.contact_person}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.country}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.priority}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.status}</TableCell>
                <TableCell sx={{ padding: "12px" }}>{row.user_type}</TableCell>
                <TableCell sx={{ padding: "12px", width: "150px" }}> {/* **Reduce width of "Technical Details"** */}
                  {row.technical_details}
                </TableCell>

                {/* Action Buttons */}
                <TableCell sx={{ padding: "12px", textAlign: "center", width: "120px" }}> {/* **Reduce width of "Actions"** */}
                  <div className="flex justify-center gap-6"> {/* Decreased gap between buttons */}
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
