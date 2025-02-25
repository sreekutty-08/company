import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFollowUps, fetchSwitchIPDetails } from "../redux/view/viewThunk";
import { fetchCustomerDetail } from "../redux/customerTable/customerTableThunk";

import CompanyDetailsCard from "../components/CompanyDetailsCard";
import Followups from "../components/Followups";
import { Tab, Box, Paper, Container } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import AssignmentIcon from "@mui/icons-material/Assignment";

const ViewPage = () => {
  const { company_id } = useParams();
  const dispatch = useDispatch();
  const { reRender } = useSelector((state) => state.view);

  // State to control tab selection
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(fetchCustomerDetail(company_id));
    dispatch(fetchSwitchIPDetails(company_id));
    dispatch(fetchFollowUps(company_id));

  }, [company_id, reRender]);

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      {/* Split Tabs Section */}
      <Paper elevation={3} className="rounded-lg overflow-hidden">
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
          <Tab
            icon={<BusinessIcon />}
            iconPosition="start"
            label="Company Details"
            sx={{
              width: "50%",
              fontWeight: "bold",
              color: "#000",
              textTransform: "none",
              backgroundColor: activeTab === 0 ? "#f5f5f5" : "#fff",
              borderRight: "2px solid #ddd",
              transition: "0.3s",
            }}
            onClick={() => setActiveTab(0)}
          />
          <Tab
            icon={<AssignmentIcon />}
            iconPosition="start"
            label="Follow-ups"
            sx={{
              width: "50%",
              fontWeight: "bold",
              color: "#000",
              textTransform: "none",
              backgroundColor: activeTab === 1 ? "#f5f5f5" : "#fff",
              transition: "0.3s",
            }}
            onClick={() => setActiveTab(1)}
          />
        </Box>
      </Paper>

      {/* Company Details Section */}
      {activeTab === 0 && (
        <Box sx={{ mt: 6 }}>
          <CompanyDetailsCard company_id={company_id} />
        </Box>
      )}

      {/* Follow-ups Section (Increased Width) */}
      {activeTab === 1 && (
        <Box sx={{ mt: 6, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Paper
            elevation={3}
            sx={{
              width: "90%", // Increased width to cover more space
              maxWidth: "1200px", // Ensures responsiveness
              padding: "24px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            <Followups company_id={company_id} />
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default ViewPage;