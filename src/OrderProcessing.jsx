import React, { useEffect, useState } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Chip, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as XLSX from 'xlsx'; // Import the xlsx library
import ExportIcon from '@mui/icons-material/Download'; // Import the export icon
import { CheckCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Fake data generator
const generateFakeOrder = () => {
    const orderId = Math.floor(Math.random() * 10000);
    const customerName = `Customer-${Math.floor(Math.random() * 100)}`;
    const totalAmount = (Math.random() * 100).toFixed(2);
    const statuses = ['Pending', 'Processing', 'Completed'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
        id: orderId,
        customer: customerName,
        total: totalAmount,
        status: status,
        placedAt: new Date().toLocaleString(),
    };
};

const OrderProcessing = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentRecords, setCurrentRecords] = useState(10); // To track how many records are displayed

    // Simulate placing new orders every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const newOrder = generateFakeOrder();
            setOrders((prevOrders) => [newOrder, ...prevOrders]);  // Push new order to the top
        }, 5000);

        // Cleanup interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    // Simulate processing an order
    const handleProcessOrder = (orderId) => {
        setIsProcessing(true);
        setTimeout(() => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === orderId ? { ...order, status: 'Processing' } : order
                )
            );
            setIsProcessing(false);
        }, 2000);
    };

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

        orders.forEach(order => {
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

    // Function to export data to Excel
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(orders); // Convert orders data to sheet
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
                {/* <Tooltip title="Export to Excel" arrow> */}
                    <Button
                        variant="contained"
                        title='Completed Orders'
                        color="primary"
                        onClick={() => navigate('/completed-orders')}
                        sx={{ padding: 1, borderRadius: '50%', minWidth: 44, marginRight: 4 }}
                    >

                        <CheckCircle sx={{ fontSize: 25 }} />

                    </Button>
                {/* </Tooltip> */}
                <Button
                    variant="contained"
                    color="primary"
                    title='Export to excel'
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
                                        <TableCell><strong>Customer</strong></TableCell>
                                        <TableCell><strong>Status</strong></TableCell>
                                        <TableCell><strong>Total</strong></TableCell>
                                        <TableCell><strong>Placed At</strong></TableCell>
                                        <TableCell><strong>Action</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.slice(0, currentRecords).map((order) => (
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
                                            <TableCell>
                                                {order.status === 'Pending' && (
                                                    <Button
                                                        variant="contained"
                                                        color="primary" // Primary color button
                                                        onClick={() => handleProcessOrder(order.id)}
                                                        disabled={isProcessing}
                                                        sx={{ backgroundColor: '#1976d2' }} // Light blue button color
                                                    >
                                                        {isProcessing ? 'Processing...' : 'Process Order'}
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Load More Button */}
                        {orders.length > currentRecords && (
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
