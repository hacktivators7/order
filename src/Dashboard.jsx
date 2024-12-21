// src/components/Dashboard.js

import React from "react";
import { Box, Paper, Typography, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from "@mui/material";
import { orders, chartData } from "./data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { LineChart, Line, CartesianGrid as LineCartesianGrid, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend } from "recharts";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
        {/* Order List Table */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Order List
            </Typography>

            {/* Order List Table */}
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="order list table">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Order ID</strong></TableCell>
                    <TableCell><strong>Customer</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Total</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        {/* <Button variant="contained" color="primary">
                          View Details
                        </Button> */}
                        <IconButton color="primary" aria-label="view order details" onClick={() => {}}>
                            <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>

        {/* Graphs Section */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            {/* Sales Bar Chart */}
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Sales Overview
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData.salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>

            {/* User Growth Line Chart */}
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                User Growth
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={chartData.userGrowthData}>
                  <LineCartesianGrid strokeDasharray="3 3" />
                  <LineXAxis dataKey="name" />
                  <LineYAxis />
                  <LineTooltip />
                  <LineLegend />
                  <Line type="monotone" dataKey="users" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Dashboard;


// src/components/Dashboard.js

// import React from "react";
// import { Grid, Paper, Typography, Box, Button } from "@mui/material";
// import { orders, chartData } from "./data";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import { LineChart, Line, CartesianGrid as LineCartesianGrid, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend } from "recharts";

// const Dashboard = () => {
//   return (
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Dashboard Overview
//       </Typography>

//       <Grid container spacing={3}>
//         {/* Order List Grid */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Typography variant="h5" gutterBottom>
//               Order List
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <Box>
//                   {orders.map((order) => (
//                     <Box key={order.id} sx={{ marginBottom: 2 }}>
//                       <Typography variant="body1">
//                         <strong>Order #{order.id}</strong>
//                       </Typography>
//                       <Typography variant="body2">Customer: {order.customer}</Typography>
//                       <Typography variant="body2">Status: {order.status}</Typography>
//                       <Typography variant="body2">Total: ${order.total.toFixed(2)}</Typography>
//                       <Typography variant="body2">Date: {order.date}</Typography>
//                       <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
//                         View Details
//                       </Button>
//                     </Box>
//                   ))}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//         </Grid>

//         {/* Graphs Grid */}
//         <Grid item xs={12} md={4}>
//           <Grid container spacing={2}>
//             {/* Sales Bar Chart */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ padding: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   Sales Overview
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <BarChart data={chartData.salesData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Bar dataKey="sales" fill="#8884d8" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>

//             {/* User Growth Line Chart */}
//             <Grid item xs={12}>
//               <Paper elevation={3} sx={{ padding: 2 }}>
//                 <Typography variant="h6" gutterBottom>
//                   User Growth
//                 </Typography>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <LineChart data={chartData.userGrowthData}>
//                     <LineCartesianGrid strokeDasharray="3 3" />
//                     <LineXAxis dataKey="name" />
//                     <LineYAxis />
//                     <LineTooltip />
//                     <LineLegend />
//                     <Line type="monotone" dataKey="users" stroke="#82ca9d" />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;


// src/components/Dashboard.js

// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { LineChart, Line, CartesianGrid as LineCartesianGrid, XAxis as LineXAxis, YAxis as LineYAxis, Tooltip as LineTooltip, Legend as LineLegend } from 'recharts';
// import { chartData } from './data'; // Import your mock data

// const Dashboard = () => {
//   return (
//     <div>
//       <h2>Dashboard Overview</h2>
      
//       {/* Sales BarChart */}
//       <div style={{ width: '100%', height: 300, marginBottom: '40px' }}>
//         <h3>Sales Overview</h3>
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={chartData.salesData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="sales" fill="#8884d8" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* User Growth LineChart */}
//       <div style={{ width: '100%', height: 300 }}>
//         <h3>User Growth</h3>
//         <ResponsiveContainer width="100%" height="100%">
//           <LineChart data={chartData.userGrowthData}>
//             <LineCartesianGrid strokeDasharray="3 3" />
//             <LineXAxis dataKey="name" />
//             <LineYAxis />
//             <LineTooltip />
//             <LineLegend />
//             <Line type="monotone" dataKey="users" stroke="#82ca9d" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import React, { useState } from "react";

// import { Button, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const orders = [
//     { id: 1, customer: "John Doe", status: "Completed", total: 120.5, date: "2024-12-21" },
//     { id: 2, customer: "Jane Smith", status: "Pending", total: 80.0, date: "2024-12-20" },
//     { id: 3, customer: "Samuel Lee", status: "Shipped", total: 150.0, date: "2024-12-19" },
//     { id: 4, customer: "Anna Kim", status: "Cancelled", total: 45.75, date: "2024-12-18" },
//     { id: 5, customer: "Mark Johnson", status: "Completed", total: 200.0, date: "2024-12-17" }
//   ];
  

// function Dashboard() {
//     const [orderData, setOrderData] = useState(orders);

//     // Handle delete order
//     const handleDelete = (id) => {
//         const updatedOrders = orderData.filter((order) => order.id !== id);
//         setOrderData(updatedOrders);
//     };

//     // Handle edit order (just a placeholder for now)
//     const handleEdit = (id) => {
//         alert(`Edit order with ID: ${id}`);
//     };

//     return (
//         <Container maxWidth="lg" sx={{ paddingTop: 2 }}>
//             <Typography variant="h4" gutterBottom>
//                 Order Dashboard
//             </Typography>

//             <TableContainer component={Paper}>
//                 <Table aria-label="order table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell><strong>Order ID</strong></TableCell>
//                             <TableCell><strong>Customer</strong></TableCell>
//                             <TableCell><strong>Status</strong></TableCell>
//                             <TableCell><strong>Total</strong></TableCell>
//                             <TableCell><strong>Date</strong></TableCell>
//                             <TableCell><strong>Actions</strong></TableCell>
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {orderData.map((order) => (
//                             <TableRow key={order.id}>
//                                 <TableCell>{order.id}</TableCell>
//                                 <TableCell>{order.customer}</TableCell>
//                                 <TableCell>{order.status}</TableCell>
//                                 <TableCell>${order.total.toFixed(2)}</TableCell>
//                                 <TableCell>{order.date}</TableCell>
//                                 <TableCell>
//                                     <IconButton color="primary" onClick={() => handleEdit(order.id)}>
//                                         <EditIcon />
//                                     </IconButton>
//                                     <IconButton color="secondary" onClick={() => handleDelete(order.id)}>
//                                         <DeleteIcon />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
//                 Add New Order
//             </Button>
//         </Container>
//     );
// }

// export default Dashboard;
