import React from "react";
import { Card, CardContent, Typography, Paper, Avatar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { FiMessageCircle, FiPenTool } from "react-icons/fi";
import {setFollowupModalOn, setIsEditingOn, setSelectedFollowUp} from "../redux/view/viewSlice"

const Followups = () => {
  const { followUps } = useSelector((state) => state.view);

  const dispatch = useDispatch()

  if (!followUps || followUps.length === 0) {
    return (
      <Typography className="text-center mt-4 text-gray-600">
        No follow-ups available
      </Typography>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Title Section */}
      <div className="flex items-center justify-center mb-6">
        <FiMessageCircle size={24} className="text-blue-600 mr-2" />
        <Typography variant="h5" className="font-semibold text-gray-800">
          Follow-Ups
        </Typography>
      </div>

      {/* Follow-ups List */}
      <div className="space-y-4">
        {followUps.map((followup, index) => (
          <Card
            key={followup.id}
            component={Paper}
            className={`p-4 shadow-md rounded-lg transition-all ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            } hover:bg-blue-50`}
          >
            <CardContent className="flex items-start space-x-4">
              {/* User Avatar */}
              <Avatar className="bg-blue-600 text-white font-semibold">
                {followup.user?.charAt(0) || "U"}
              </Avatar>

              {/* Follow-up Details */}
              <div className="flex-1">
                <Typography className="font-semibold text-gray-900">
                  {followup.user || "Unknown User"}
                </Typography>
                <Typography className="text-gray-700 text-sm flex">
                  {followup.message}
                  <FiPenTool className="text-blue-600 mr-2" onClick={() => {
                    dispatch(setSelectedFollowUp(followup))
                    dispatch(setIsEditingOn())
                    dispatch(setFollowupModalOn())
                    
                  }}/> 
                </Typography>
                <Typography className="text-xs text-gray-500 mt-1">
                  {new Date(followup.date).toLocaleString()} 
                </Typography>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Followups;
