import React from 'react';

const getColorStops = progress => {
  // Define the color stops based on progress
  if (progress <= 50) {
    return ['#f2c94b', '#f2f2f2'];
  }
  if (progress <= 70) {
    return ['#f2c94b', '#ff8c00']; // Change color for the 70% threshold
  }
  return ['#f2c94b', '#00ff00']; // Change color for the 100% threshold
};

const DynamicColorCircle = ({ progress }) => {
  const colorStops = getColorStops(progress);

  return (
    <svg width="52" height="52" xmlns="https://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="colorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: `${colorStops[0]}` }} />
          <stop offset="100%" style={{ stopColor: `${colorStops[1]}` }} />
        </linearGradient>
      </defs>
      <g>
        <circle r="22" cy="26" cx="26" strokeWidth="8" stroke="#f2f2f2" fill="none" />
        <circle
          id="circle_animation"
          r="22"
          cy="26"
          cx="26"
          strokeWidth="8"
          stroke="url(#colorGradient)"
          fill="none"
          style={{ strokeDashoffset: 37.26 }}
        />
        <text fill="#283e50" x="50%" y="50%" dominantBaseline="middle" textAnchor="middle">
          {progress}
        </text>
      </g>
    </svg>
  );
};

export default DynamicColorCircle;
