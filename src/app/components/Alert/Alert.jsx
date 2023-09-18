// Alert.jsx
import React from 'react';

const styles = {
  success: { backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' },
  error: { backgroundColor: 'red', color: 'white', padding: '10px', borderRadius: '5px' },
  info: { backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px' },
};

const Alert = ({ message, type = 'info' }) => {
  return <div style={styles[type]}>{message}</div>;
};

export default Alert;
