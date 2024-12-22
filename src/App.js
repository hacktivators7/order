import React from 'react';
import './App.css'
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import OrderProcessing from './OrderProcessing';
import CompletedOrders from './CompletedOrders';
import QueueExample from './Que';
import MyPage from './MyPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/orders' element={<MyPage />} />
          <Route path="/completed-orders" element={<CompletedOrders />} />
          <Route path="/queue" element={<QueueExample /> } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
