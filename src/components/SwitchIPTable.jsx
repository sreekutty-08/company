import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AiOutlineCloudServer } from 'react-icons/ai';

const SwitchIPTable = () => {
  const { switchIPData } = useSelector((state) => state.view);

  return (
    <Box className="p-6 flex justify-center">
      <Paper elevation={6} className="rounded-lg overflow-hidden w-[500px]">
        {/* Header Section */}
        <Box className="bg-gray-800 text-white py-3 px-6 flex items-center gap-2">
          <AiOutlineCloudServer size={22} className="text-blue-400" />
          <Typography variant="h6" className="font-semibold text-lg">
            Switch I.P. List
          </Typography>
        </Box>

        {/* Table Section */}
        <TableContainer className="rounded-lg">
          <Table size="small" aria-label="switch IP table">
            <TableHead>
              <TableRow className="bg-gray-200">
                <TableCell className="font-medium text-sm text-gray-800">
                  IP Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {switchIPData.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`transition-all ${
                    index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                  } hover:bg-blue-50`}
                >
                  <TableCell className="text-sm font-medium text-gray-700">
                    {row.ip}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default SwitchIPTable;
