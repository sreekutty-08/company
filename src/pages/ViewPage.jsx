import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowUps, fetchSwitchIPDetails } from "../redux/view/viewThunk";
import { fetchCustomerDetail } from "../redux/customerTable/customerTableThunk";

import CompanyDetailsCard from "../components/CompanyDetailsCard";
import Followups from "../components/Followups";
import { Box, Paper, Container, Button } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FollowUp from "./Followups";

const ViewPage = () => {
  const { company_id } = useParams();
  const dispatch = useDispatch();
  const { reRender } = useSelector((state) => state.view);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomerDetail(company_id));
    dispatch(fetchSwitchIPDetails(company_id));
    dispatch(fetchFollowUps(company_id));
  }, [company_id, reRender]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Custom Styled Tab Buttons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
        <Button
          onClick={() => setActiveTab(0)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            height: "120px",
            backgroundColor: activeTab === 0 ? "#E3F2FD" : "#FFFFFF",
            border: "2px solid #E0E0E0",
            borderRadius: "12px",
            boxShadow: activeTab === 0 ? "0px 4px 10px rgba(0,0,0,0.2)" : "0px 2px 5px rgba(0,0,0,0.1)",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#E3F2FD",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          <BusinessIcon sx={{ fontSize: "40px", color: "#007BFF" }} />
          Company Details
        </Button>

        <Button
          onClick={() => setActiveTab(1)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            height: "120px",
            backgroundColor: activeTab === 1 ? "#E3F2FD" : "#FFFFFF",
            border: "2px solid #E0E0E0",
            borderRadius: "12px",
            boxShadow: activeTab === 1 ? "0px 4px 10px rgba(0,0,0,0.2)" : "0px 2px 5px rgba(0,0,0,0.1)",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#E3F2FD",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          <AssignmentIcon sx={{ fontSize: "40px", color: "#007BFF" }} />
          Follow-ups
        </Button>

        <Button
          onClick={() => setActiveTab(2)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "250px",
            height: "120px",
            backgroundColor: activeTab === 2 ? "#E3F2FD" : "#FFFFFF",
            border: "2px solid #E0E0E0",
            borderRadius: "12px",
            boxShadow: activeTab === 2 ? "0px 4px 10px rgba(0,0,0,0.2)" : "0px 2px 5px rgba(0,0,0,0.1)",
            color: "#000",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#E3F2FD",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            },
          }}
        >
          <AssignmentIcon sx={{ fontSize: "40px", color: "#007BFF" }} />
          All Follow-ups
        </Button>
      </Box>

      {/* Company Details Section */}
      {activeTab === 0 && (
        <Box sx={{ mt: 6 }}>
          <CompanyDetailsCard company_id={company_id} />
        </Box>
      )}

      {/* Follow-ups Section */}
      {activeTab === 1 && (
        <Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Paper
            elevation={3}
            sx={{
              width: "90%",
              maxWidth: "1200px",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Followups company_id={company_id} />
          </Paper>
        </Box>
      )}

      {activeTab === 2 && (
        <Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Paper
            elevation={3}
            sx={{
              width: "90%",
              maxWidth: "1200px",
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <FollowUp company_id={company_id} />
          </Paper>
        </Box>
      )}
      
    </Container>
  );
};

export default ViewPage;
