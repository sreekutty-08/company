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
} from '@mui/material';
import { useSelector } from 'react-redux';

const SwitchIPTable = () => {
  const { switchIPData } = useSelector((state) => state.view); 

  return (
    <div className="p-4">
      <Typography variant="h6" className="mb-3 text-center font-semibold">
        Switch I.P.
      </Typography>
      <TableContainer component={Paper} className="shadow-lg w-[450px] mx-auto">
        <Table size="small" aria-label="small switch IP table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-medium text-sm">IP Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {switchIPData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                className="hover:bg-gray-100 transition-colors"
              >
                <TableCell className="text-sm">{row.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SwitchIPTable;
