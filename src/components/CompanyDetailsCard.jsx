import React from "react";
import { Card, CardHeader, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const CompanyDetailsCard = () => {
  const { company } = useSelector((state) => state.view);

  if (!company)
    return (
      <Typography className="text-center mt-4 text-gray-600">
        No company selected
      </Typography>
    );

  const details = [
    { label: "Contact Person", value: company.contact_person },
    { label: "Email", value: company.company_email },
    { label: "Country", value: company.country },
    { label: "Phone", value: company.company_phone },
    { label: "Address", value: company.address },
    { label: "Support Email", value: company.support_email },
    { label: "Company_Website", value: company.company_website },
    { label: "Status", value: company.status },
    { label: "Account Status", value: company.technical_details },
    { label: "Priority", value: company.priority },
    { label: "User Type", value: company.user_type },
  ];

  return (
    <Card component={Paper} className="max-w-3xl mx-auto shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <CardHeader
        title={
          <Typography variant="h6" className="text-center font-semibold text-gray-800">
            {company.company_name}
          </Typography>
        }
        className="bg-gray-200 py-3"
      />

      {/* Table Content */}
      <CardContent className="p-4">
        <TableContainer>
          <Table size="small" aria-label="Company Details Table">
            <TableHead>
              <TableRow className="bg-gray-300">
                <TableCell className="font-semibold text-gray-800">Field</TableCell>
                <TableCell className="font-semibold text-gray-800">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((item, index) => (
                <TableRow
                  key={index}
                  className={`transition-all ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-blue-50`}
                >
                  <TableCell className="text-gray-700 font-medium">{item.label}</TableCell>
                  <TableCell className="text-gray-900">{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CompanyDetailsCard;
