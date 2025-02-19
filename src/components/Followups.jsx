import React from "react";
import { Card, CardContent, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const Followups = () => {
  const {followUps} = useSelector(state => state.view)
  if (!followUps || followUps.length === 0) {
    return <Typography className="text-center mt-4 text-gray-600">No follow-ups available</Typography>;
  }

  return (
    <div className="p-6">
      <Typography variant="h5" className="mb-4 text-center font-semibold">
        Follow Ups
      </Typography>
      <div className="grid grid-cols-1 gap-4">
        {followUps.map((followup) => (
          <Card key={followup.id} component={Paper} className="shadow-md p-4">
            <CardContent>
              <Typography variant="body1" className="text-lg font-medium">
                {followup.message}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Followups;
