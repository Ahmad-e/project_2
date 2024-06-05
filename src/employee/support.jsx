import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const EmployeePage = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [response, setResponse] = useState('');
  const [hoveredRowIndex, setHoveredRowIndex] = useState(-1);

  useEffect(() => {
    // Here, you can fetch the customer data from the server
    setCustomerData([
      {
        Name: 'John Doe',
        Email: 'john.doe@example.com',
        Subject: 'Product Issue',
        Message: 'I am having trouble with your product. Can you help?',
        Date: '2024-05-23',
      },
      {
        Name: 'Jane Smith',
        Email: 'jane.smith@example.com',
        Subject: 'Billing Question',
        Message: 'I have a question about my billing. Can you assist me?',
        Date: '2024-05-22',
      },
      {
        Name: 'Ahmad Alhomsi',
        Email: 'ahmad.homsi@example.com',
        Subject: 'Billing Question',
        Message: 'I have a question about my billing. Can you assist me?',
        Date: '2024-05-24',
      },
      {
        Name: 'Ahmad Alhomsi',
        Email: 'ahmad.homsi@example.com',
        Subject: 'Billing Question',
        Message: 'I have a question about my billing. Can you assist me?',
        Date: '2024-05-24',
      },
    ]);
  }, []);

  const handleResponse = (e) => {
    setResponse(e.target.value);
  };

  const sendResponse = () => {
    // Here, you can add the logic to send the response to the customer
    console.log('Sending response:', response, 'to', selectedCustomer.Name);
    setSelectedCustomer(null);
    setResponse('');
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleRowHover = (index) => {
    setHoveredRowIndex(index);
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(-1);
  };

  return (
    <div>
      <h1>Messages From Customers</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData.map((customer, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(customer)}
                onMouseEnter={() => handleRowHover(index)}
                onMouseLeave={handleRowLeave}
                style={{
                  backgroundColor: hoveredRowIndex === index ? '#0d6efd' : 'transparent',
                  cursor: 'pointer',
                }}
              >
                <TableCell>{customer.Name}</TableCell>
                <TableCell>{customer.Subject}</TableCell>
                <TableCell>{customer.Date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedCustomer && (
        <Dialog open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)}>
          <DialogTitle>{selectedCustomer.Name}</DialogTitle>
          <DialogContent>
            <Typography>Email: {selectedCustomer.Email}</Typography>
            <Typography>Subject: {selectedCustomer.Subject}</Typography>
            <Typography>Message: {selectedCustomer.Message}</Typography>
            <Typography>Date: {selectedCustomer.Date}</Typography>
            <TextField
              label="Response"
              value={response}
              onChange={handleResponse}
              multiline
              rows={4}
              style={{ marginTop: '16px' }}
            />
            <br />
            <Button variant="contained" onClick={sendResponse} style={{ marginTop: '16px' }}>
              Send Response
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EmployeePage;