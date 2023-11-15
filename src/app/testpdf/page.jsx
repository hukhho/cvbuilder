'use client';

import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ScreenshotComponent = () => {
  const captureRef = useRef();

  const captureScreenshot = () => {
    html2canvas(captureRef.current, {
    
    }).then(canvas => {
      //   document.body.appendChild(canvas);
      // You can now handle the canvas as needed, for example:
      console.log('canvas', canvas);
      const imgData = canvas.toDataURL('image/png');
      // const pdf = new jsPDF();
      // pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.save(`${new Date().toISOString()}.pdf`);      
        window.open(imgData);
    });
  };

  return (
    <div ref={captureRef} className="App">
      <h1>Hello Next.js</h1>
      <h2 style={{ color: 'pink' }}>Start editing to see some magic happen!</h2>
      <h2 style={{ color: 'red' }}>Start editing to see some magic happen!</h2>
      <h2 style={{ color: 'blue' }}>Start editing to see some magic happen!</h2>
      <h2 style={{ color: 'black' }}>Start editing to see some magic happen!</h2>
      <h2 style={{ color: 'yellow' }}>Start editing to see some magic happen!</h2>

      <button onClick={captureScreenshot}>Screenshot</button>
    </div>
  );
};

export default ScreenshotComponent;
