import React from "react";
import { Card, CardHeader, CardContent, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const CompanyDetailsCard = () => {
  const { company } = useSelector((state) => state.view);
  if (!company)
    return (
      <p className="text-center mt-4 text-gray-600">No company selected</p>
    );

  const details = [
    { label: "Contact Person", value: company.contact_person },
    { label: "Email", value: company.company_email },
    { label: "Phone", value: company.company_phone },
    { label: "Address", value: company.address },
    { label: "Country", value: company.country },
    { label: "Support Email", value: company.support_email },
    { label: "Status", value: company.status },
    { label: "Technical Details", value: company.technical_details },
    { label: "Priority", value: company.priority },
    { label: "User Type", value: company.user_type },
  ];

  return (
    <Card
      component={Paper}
      className="max-w-2xl mx-auto p-6 shadow-md rounded-lg"
    >
      <CardHeader
        title={company.company_name}
        className="text-2xl font-semibold text-center mb-4"
      />
      <CardContent className="space-y-3">
        {details.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="font-medium text-gray-700">{item.label}:</span>
            <span className="text-gray-900">{item.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;
