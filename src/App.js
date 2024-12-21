// src/App.js
import React from 'react';
import LoginForm from './LoginForm';  // Import the LoginForm component

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f4f4f4' }}>
      <LoginForm />  {/* Use the LoginForm component */}
    </div>
  );
};

export default App;
