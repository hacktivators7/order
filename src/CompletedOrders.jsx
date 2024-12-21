import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Chip, Button, Grid } from '@mui/material';

const generateFakeOrder = (status) => {
  const orderId = Math.floor(Math.random() * 10000);
  const customerName = `Customer-${Math.floor(Math.random() * 100)}`;
  const totalAmount = (Math.random() * 100).toFixed(2);

  return {
    id: orderId,
    customer: customerName,
    total: totalAmount,
    status: status,
    placedAt: new Date().toLocaleString(),
  };
};

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);

  // Generate 500 completed orders
  useEffect(() => {
    const generatedOrders = [];
    for (let i = 0; i < 500; i++) {
      generatedOrders.push(generateFakeOrder('Completed'));
    }
    setOrders(generatedOrders);
  }, []);

  // Function to return appropriate color for status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'; // Green for Completed
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Completed Orders
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Completed Orders List
            </Typography>

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="completed orders table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Total</strong></TableCell>
                    <TableCell><strong>Placed At</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          color={getStatusColor(order.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>{order.placedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompletedOrders;
