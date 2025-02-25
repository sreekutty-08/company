import React from "react";
import {
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import SwitchIPTable from "./SwitchIPTable";
import SwitchIpFormModal from "./SwitchIpFormModal";
import { setSwitchIPModalOff } from "../redux/view/viewSlice";

const CompanyDetailsCard = ({ company_id }) => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.view); // Fetching from Redux state

  if (!company) {
    return (
      <Typography className="text-center mt-4 text-gray-600">
        No company data available
      </Typography>
    );
  }

  const details = [
    { label: "Contact Person", value: company.contactPerson, icon: <BusinessIcon /> },
    { label: "Email", value: company.companyEmail, icon: <EmailIcon /> },
    { label: "Country", value: company.country, icon: <PublicIcon /> },
    { label: "Phone", value: company.companyPhone, icon: <PhoneIcon /> },
    { label: "Address", value: company.address, icon: <LocationOnIcon /> },
    { label: "Support Email", value: company.supportEmail, icon: <EmailIcon /> },
    { label: "Company Website", value: company.companyWebsite, icon: <VerifiedUserIcon /> },
    { label: "Status", value: company.customerStatus, icon: <VerifiedUserIcon /> },
    { label: "Account Status", value: company.technical_details, icon: <VerifiedUserIcon /> },
    { label: "Priority", value: company.priority, icon: <PriorityHighIcon /> },
    { label: "User Type", value: company.user_type, icon: <VerifiedUserIcon /> },
  ];

  return (
    <Card component={Paper} className="w-full shadow-lg overflow-hidden p-6">
      <CardContent>
        <Grid container spacing={4}>
          {/* Company Details Table */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 2,
                color: "#002B5B",
                borderBottom: "2px solid #0056b3",
                paddingBottom: "8px",
              }}
            >
              Company Information
            </Typography>
            <TableContainer
              sx={{
                maxWidth: 600,
                margin: "auto",
                border: "1px solid #ccc", // Square border
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <Table size="small" aria-label="Company Details Table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#0056b3", height: "65px", borderBottom: "1px solid #ccc" }}>
                    <TableCell sx={{ fontSize: "18px", fontWeight: "bold", color: "#fff", padding: "16px", borderRight: "1px solid #ccc" }}>
                      Field
                    </TableCell>
                    <TableCell sx={{ fontSize: "18px", fontWeight: "bold", color: "#fff", padding: "16px", textAlign: "right" }}>
                      Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                        "&:hover": { backgroundColor: "#e3f2fd" },
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {/* Field Name with Icon */}
                      <TableCell
                        sx={{
                          fontWeight: "medium",
                          color: "#333",
                          padding: "10px",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          borderRight: "1px solid #ccc",
                        }}
                      >
                        {item.icon} {item.label}
                      </TableCell>

                      {/* Detail Value inside a Box on Right */}
                      <TableCell sx={{ textAlign: "right", padding: "10px" }}>
                        <Box
                          sx={{
                            backgroundColor: "#F3F4F6",
                            padding: "8px",
                            borderRadius: "4px",
                            boxShadow: "0px 3px 8px rgba(0,0,0,0.1)",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#222",
                            display: "inline-block",
                            textAlign: "center",
                            "&:hover": { backgroundColor: "#B3E5FC" },
                            transition: "0.3s ease-in-out",
                          }}
                        >
                          {item.value || "N/A"}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Switch IP Table */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 2,
                color: "#002B5B",
                borderBottom: "2px solid #0056b3",
                paddingBottom: "8px",
              }}
            >
              Switch IPs
            </Typography>
            <SwitchIPTable company_id={company_id}/>
            <SwitchIpFormModal closeModal={() => dispatch(setSwitchIPModalOff())} company_id={company_id} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;