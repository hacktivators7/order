import React, { useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Chip, Grid, MenuItem, Select, FormControl, InputLabel, CircularProgress } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ExportIcon from '@mui/icons-material/Download'; // Import the export icon
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Importing the xlsx library

// OrderProcessing component where orders are received via props
const OrderProcessing = (props) => {
    const { orders } = props; // Accessing the orders passed as props
    const navigate = useNavigate();
    const [currentRecords, setCurrentRecords] = useState(10); // To track how many records are displayed
    const [editedOrders, setEditedOrders] = useState(orders); // Track the updated orders
    const [isLoading, setIsLoading] = useState(false); // Loading state to show loader

    // Function to return appropriate color for status
    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'warning'; // Yellow for Pending
            case 'Processing':
                return 'info'; // Blue for Processing
            case 'Completed':
                return 'success'; // Green for Completed
            default:
                return 'default';
        }
    };

    // Function to get order count by status
    const getOrderStatusCount = () => {
        const statusCount = {
            Pending: 0,
            Processing: 0,
            Completed: 0,
        };

        editedOrders.forEach(order => {
            statusCount[order.status]++;
        });

        return [
            { name: 'Pending', count: statusCount.Pending, color: '#FFB74D' }, // Orange for Pending
            { name: 'Processing', count: statusCount.Processing, color: '#64B5F6' }, // Blue for Processing
            { name: 'Completed', count: statusCount.Completed, color: '#81C784' }, // Green for Completed
        ];
    };

    // Load more records function
    const loadMoreRecords = () => {
        setCurrentRecords((prev) => prev + 10); // Increase the number of records shown by 10
    };

    // Handle urgency level change
    const handleUrgencyChange = (orderID, newUrgencyLevel) => {
        setIsLoading(true); // Set loading state to true

        // Simulate a delay (e.g., API call or processing time)
        setTimeout(() => {
            const updatedOrders = editedOrders.map(order => {
                if (order.orderID === orderID) {
                    return { ...order, urgencyLevel: newUrgencyLevel }; // Update the urgency level
                }
                return order;
            });
            setEditedOrders(updatedOrders); // Update the state with the new orders
            setIsLoading(false); // Set loading state to false after update
        }, 1000); // Simulate delay of 1 second
    };

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(editedOrders); // Convert orders data to sheet
        const workbook = XLSX.utils.book_new(); // Create a new workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders'); // Append worksheet to workbook
        const excelFile = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' }); // Convert workbook to binary array
        const blob = new Blob([excelFile], { type: 'application/octet-stream' }); // Create a Blob for the Excel file

        // Create a download link and trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'orders.xlsx'; // Set the filename for the download
        link.click(); // Trigger the download
    };

    return (
        <Box sx={{ flexGrow: 1, padding: 3 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ color: '#1976d2', fontWeight: 'bold' }} // Light blue color for typography
            >
                Customer Order Prioritization Dashboard
            </Typography>

            {/* Export to Excel button */}
            <Box sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 1
            }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/completed-orders')}
                    sx={{ padding: 1, borderRadius: '50%', minWidth: 44, marginRight: 4 }}
                >
                    <CheckCircle sx={{ fontSize: 25 }} />
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={exportToExcel}
                    sx={{ padding: 1, borderRadius: '50%', minWidth: 44 }}
                >
                    <ExportIcon sx={{ fontSize: 24 }} /> {/* Smaller icon with fontSize */}
                </Button>
            </Box>

            <Grid container spacing={3}>
                {/* Order List Section */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Order List
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="order list table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Order ID</strong></TableCell>
                                        <TableCell><strong>Customer ID</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Order Value</strong></TableCell>
                                        <TableCell><strong>Urgency Level</strong></TableCell>
                                        <TableCell><strong>Priority Score</strong></TableCell>
                                        <TableCell><strong>Order Date</strong></TableCell>
                                        <TableCell><strong>Update Priority</strong></TableCell> {/* New Edit Column */}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {editedOrders.slice(0, currentRecords).map((order) => (
                                        <TableRow key={order.orderID}>
                                            <TableCell>{order.orderID}</TableCell>
                                            <TableCell>{order.customerID}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={order.status}
                                                    color={getStatusColor(order.status)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>${order.orderValue}</TableCell>
                                            <TableCell>{order.urgencyLevel}</TableCell>
                                            <TableCell>{order.priorityScore}</TableCell>
                                            <TableCell>{order.orderDate}</TableCell>
                                            
                                            {/* Edit Dropdown */}
                                            <TableCell>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel></InputLabel>
                                                    <Select
                                                        value={order.urgencyLevel}
                                                        onChange={(e) => handleUrgencyChange(order.orderID, e.target.value)}
                                                    >
                                                        {[...Array(10).keys()].map((num) => (
                                                            <MenuItem key={num + 1} value={num + 1}>{num + 1}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                {isLoading && (
                                                    <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', marginLeft: '-12px', marginTop: '-12px' }} />
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Load More Button */}
                        {editedOrders.length > currentRecords && (
                            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                                <Button variant="outlined" color="primary" onClick={loadMoreRecords}>
                                    Load More
                                </Button>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                {/* Chart Section */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>
                            Order Status Overview
                        </Typography>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={getOrderStatusCount()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#8884d8" />
                                {getOrderStatusCount().map((statusData) => (
                                    <Bar
                                        key={statusData.name}
                                        dataKey="count"
                                        fill={statusData.color}
                                        stackId="a"
                                        name={statusData.name}
                                    />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OrderProcessing;
