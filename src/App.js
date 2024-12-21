import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import OrderProcessing from './OrderProcessing';
import CompletedOrders from './CompletedOrders';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/orders' element={<OrderProcessing />} />
          <Route path="/completed-orders" element={<CompletedOrders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
