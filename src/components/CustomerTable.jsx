import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Eye, Edit3, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CustomerTable = ({ customerData }) => {
  const navigate = useNavigate();
  const handleView = (id) => {
    console.log("View: ", id);
    navigate(`/view/${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete pop up
    console.log("Delete: ", id);
  };

  return (
    <div className="p-6">
      <TableContainer component={Paper} className="shadow-card">
        <Table sx={{ minWidth: 650 }} aria-label="customer details table">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell>Company Name</TableCell>
              <TableCell>Contact Person</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Technical Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                className="hover:bg-gray-200/50 transition-colors"
              >
                <TableCell>{row.company_name}</TableCell>
                <TableCell>{row.contact_person}</TableCell>
                <TableCell>{row.company_phone}</TableCell>
                <TableCell>{row.priority}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.user_type}</TableCell>
                <TableCell>{row.technical_details}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Tooltip title="View">
                      <IconButton
                        className="text-blue-500! hover!:bg-blue-500/10"
                        onClick={() => handleView(row.id)}
                      >
                        <Eye className="w-5 h-5" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        className="text-red-500! hover!:bg-red-500/10"
                        onClick={() => handleDelete(row.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </IconButton>
                    </Tooltip>
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
