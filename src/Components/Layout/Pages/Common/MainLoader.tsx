import React from 'react';

function MainLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw', // Use 100vw for full viewport width
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: add background color
        zIndex: 9999 // Ensure the spinner is on top
      }}
    >
      <div
        className="spinner-border text-warning"
        style={{
          width: '5rem',
          height: '5rem'
        }}
      ></div>
    </div>
  );
}

export default MainLoader;
