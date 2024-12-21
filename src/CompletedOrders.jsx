import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TablePagination,
  IconButton,
  Tooltip,
  TableSortLabel,
  TextField,
  InputAdornment,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Number of records per page
  const [orderBy, setOrderBy] = useState('id'); // Column to sort by
  const [orderDirection, setOrderDirection] = useState('asc'); // Sort direction (ascending/descending)
  const [searchQuery, setSearchQuery] = useState(''); // Search query

  // Generate 500 completed orders
  useEffect(() => {
    const generatedOrders = [];
    for (let i = 0; i < 500; i++) {
      generatedOrders.push(generateFakeOrder('Completed'));
    }
    setOrders(generatedOrders);
  }, []);

  // Handle change of page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change of rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing the rows per page
  };

  // Sorting logic
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderBy(property);
    setOrderDirection(isAsc ? 'desc' : 'asc');
  };

  // Sort function to compare the values based on orderBy and orderDirection
  const sortData = (array) => {
    return array.sort((a, b) => {
      if (orderDirection === 'asc') {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    });
  };

  // Function to return appropriate color for status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success'; // Green for Completed
      default:
        return 'default';
    }
  };

  // Function to filter orders based on search query
  const filterOrders = (orders) => {
    return orders.filter((order) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return (
        order.id.toString().includes(lowerCaseQuery) || // Check order ID
        order.customer.toLowerCase().includes(lowerCaseQuery) || // Check customer name
        order.status.toLowerCase().includes(lowerCaseQuery) || // Check status
        order.total.toString().includes(lowerCaseQuery) // Check total amount
      );
    });
  };

  // Function for export (placeholder)
  const handleExport = () => {
    console.log("Exporting data...");
    // Implement actual export logic here
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
        Completed Orders
      </Typography>

      <Paper elevation={3} sx={{ padding: 2 }}>
        {/* Box to align label and search field on the same row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h5" gutterBottom>
            Completed Orders List
          </Typography>

          {/* Search Field with smaller height and search icon */}
          <TextField
            label="Search Orders"
            variant="outlined"
            placeholder='Search Order Id'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 250, // Set the width of the search box
              height: 40, // Set the height to 40px (smaller height)
              '& .MuiInputBase-root': {
                height: '40px', // Apply height directly to the input
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="completed orders table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'id'}
                    direction={orderBy === 'id' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('id')}
                  >
                    Order ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'customer'}
                    direction={orderBy === 'customer' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('customer')}
                  >
                    Customer
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'total'}
                    direction={orderBy === 'total' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('total')}
                  >
                    Total
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'placedAt'}
                    direction={orderBy === 'placedAt' ? orderDirection : 'asc'}
                    onClick={() => handleRequestSort('placedAt')}
                  >
                    Placed At
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortData(filterOrders(orders)) // Apply search filter and sorting
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Display only records for the current page
                .map((order) => (
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

        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10]} // Only 10 rows per page
          component="div"
          count={orders.length} // Total number of records
          rowsPerPage={rowsPerPage} // Rows per page
          page={page} // Current page
          onPageChange={handleChangePage} // Change page handler
          onRowsPerPageChange={handleChangeRowsPerPage} // Change rows per page handler
        />

        {/* Export Icon with Tooltip */}
        <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Tooltip title="Export to Excel" arrow>
            <IconButton onClick={() => navigate('/orders')} color="primary">
              <Home />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default CompletedOrders;
