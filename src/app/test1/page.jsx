"use client";

import { useEffect } from 'react';
import html2canvas from 'html2canvas';
import './canvas.css';

const Home = () => {
  useEffect(() => {
    const handleCapture = () => {
      html2canvas(document.getElementById('capture'), {
        allowTaint: true,
        onrendered: function (canvas) {
          document.querySelector('.paste').prepend(canvas);
          var dataURL = canvas.toDataURL();
          console.log("dataURL", dataURL);
        },
      });
    };

    document.querySelector('.text').addEventListener('click', handleCapture);

    return () => {
      document.querySelector('.text').removeEventListener('click', handleCapture);
    };
  }, []);

  const handleChange = (event) => {
    console.log(event.target.value);
    document.querySelector('#test').style.left = event.target.value + 'px';
  };

  return (
    <div className="wrap" style={{ color: 'red', backgroundColor: 'blue'}}>
      <p>Click "capture" to run html2canvas</p>
      <div id="capture" className="box">
        <span className="text">Capture</span>
        <div id="test">
          <svg height="100" width="100">
            <circle cx="50" cy="50" r="40" stroke="none" strokeWidth="3" fill="green" />
          </svg>
        </div>
      </div>
      <div className="box paste"></div>
      <div>
        <input type="range" onChange={handleChange} />
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Home;
