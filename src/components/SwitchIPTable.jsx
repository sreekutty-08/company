import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Tabs,
  Tab,
  TableContainer,
} from "@mui/material";
import { useSelector } from "react-redux";
import { AiOutlineCloudServer } from "react-icons/ai";
import SwitchIpFormModal from "./SwitchIpFormModal";

const SwitchIPTable = ({ company_id }) => {
  
  const { switchIPData } = useSelector((state) => state.view);  
  const [openModal, setOpenModal] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={10}>
        <Paper
          elevation={6}
          sx={{
            border: "1px solid #ccc",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              backgroundColor: "#002B5B",
              color: "white",
              py: 2,
              px: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <AiOutlineCloudServer size={24} className="text-blue-400" />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Switch I.P. List
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
              sx={{
                backgroundColor: "#007BFF",
                "&:hover": { backgroundColor: "#0056b3" },
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "14px",
                padding: "6px 12px",
                borderRadius: "4px",
              }}
            >
              + Add Switch IP
            </Button>
          </Box>

          {/* Tabs for Active/Inactive IPs */}
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{ backgroundColor: "#f5f5f5", borderBottom: "1px solid #ccc" }}
          >
            <Tab label="Active" sx={{ color: "green", fontWeight: "bold" }} />
            <Tab label="Inactive" sx={{ color: "red", fontWeight: "bold" }} />
          </Tabs>

          {/* Table Section */}
          <TableContainer>
            <Table size="medium" aria-label="switch IP table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#e3e3e3", borderBottom: "1px solid #ccc" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", width: "250px", borderRight: "1px solid #ccc" }}>
                    IP Address
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#333", width: "150px", textAlign: "center" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {switchIPData && switchIPData.length > 0 ? (
                  switchIPData
                    .filter((row) => (activeTab === 0 ? row.status === "Active" : row.status === "Inactive"))
                    .map((row, index) => (
                      <TableRow
                        key={row.id}
                        sx={{
                          backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                          "&:hover": { backgroundColor: "#e0f2fe" },
                          borderBottom: "1px solid #ccc",
                        }}
                      >
                        <TableCell sx={{ fontSize: "16px", fontWeight: "bold", color: "#333", width: "250px", borderRight: "1px solid #ccc" }}>
                          {row.ip}
                        </TableCell>
                        <TableCell sx={{ textAlign: "center", fontWeight: "bold", color: row.status === "Active" ? "green" : "red" }}>
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} sx={{ textAlign: "center", color: "#777", py: 2 }}>
                      No IP addresses available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      <SwitchIpFormModal company_id={company_id} open={openModal} closeModal={() => setOpenModal(false)} />
    </Grid>
  );
};

export default SwitchIPTable;