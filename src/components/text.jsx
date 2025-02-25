import React, { useState } from "react";
import {
  Card,
  CardContent,
  Paper,
  Avatar,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { FiSend } from "react-icons/fi";

const Followups = () => {
  const [newMessage, setNewMessage] = useState("");
  const [followUps, setFollowUps] = useState([]); // Empty initial state

  const handleAddFollowUp = () => {
    if (newMessage.trim() === "") return;

    const newFollowUp = {
      id: followUps.length + 1,
      user: "You",
      message: newMessage,
      date: new Date(),
      align: followUps.length % 2 === 0 ? "right" : "left",
    };

    setFollowUps([...followUps, newFollowUp]);
    setNewMessage("");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#F3F4F6",
      }}
    >
      {/* Scrollable Messages */}
      <Box
        sx={{
          width: "80%",
          maxWidth: "1000px",
          height: "60vh",
          overflowY: "auto",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {followUps.length === 0 ? (
          <Typography
            sx={{ textAlign: "center", color: "#777", fontStyle: "italic" }}
          >
            No follow-ups yet.
          </Typography>
        ) : (
          followUps.slice(-4).map((followup) => (
            <Box
              key={followup.id}
              sx={{
                display: "flex",
                justifyContent:
                  followup.align === "right" ? "flex-end" : "flex-start",
                marginBottom: "12px",
              }}
            >
              <Card
                component={Paper}
                sx={{
                  maxWidth: "60%",
                  padding: "14px",
                  borderRadius: "12px",
                  backgroundColor:
                    followup.align === "right" ? "#D1E7FF" : "#F3F4F6",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar sx={{ bgcolor: "#007BFF", color: "white", fontSize: 14 }}>
                    {followup.user.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography sx={{ fontWeight: "bold", color: "#002B5B" }}>
                      {followup.user}
                    </Typography>
                    <Typography sx={{ color: "#333", fontSize: "14px" }}>
                      {followup.message}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "12px", color: "#777", marginTop: "4px" }}
                    >
                      {new Date(followup.date).toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))
        )}
      </Box>

      {/* Follow-Up Input Field */}
      <Box
        className="flex items-center gap-4 mt-4"
        sx={{ width: "80%", maxWidth: "1000px" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Write a follow-up note..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 1px 4px rgba(0,0,0,0.1)",
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddFollowUp}
          sx={{ textTransform: "none", padding: "10px 16px", borderRadius: "8px" }}
        >
          <FiSend size={20} />
        </Button>
      </Box>
    </Box>
  );
};

export default Followups;