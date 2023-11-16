/* eslint-disable */

import { useEffect, useRef } from 'react';

export function AnimatedCanvasGradient(props) {
  const canvasRef = useRef();

  useEffect(() => {
    let frameId;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // account for retina display pixel density
    const scale = window.devicePixelRatio;
    const { offsetWidth, offsetHeight } = canvas;
    canvas.width = offsetWidth * scale;
    canvas.height = offsetHeight * scale;

    const w = canvas.width;
    const h = canvas.height;

    function draw() {
      // do drawing
      const cssAng = radiansFromDegrees(props.angle);
      const dir = getDir(cssAng, w, h);
      const gr = ctx.createLinearGradient(dir.x0, dir.y0, dir.x1, dir.y1);
      props.stops.forEach(stop => {
        gr.addColorStop(stop.offset, stop.color);
      });

      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, w, h);

      function getDir(radian, width, height) {
        radian += Math.PI;
        const HALF_WIDTH = width * 0.5;
        const HALF_HEIGHT = height * 0.5;
        const lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
        const HALF_LINE_LENGTH = lineLength / 2;

        const x0 = HALF_WIDTH + Math.sin(radian) * HALF_LINE_LENGTH;
        const y0 = HALF_HEIGHT - Math.cos(radian) * HALF_LINE_LENGTH;
        const x1 = width - x0;
        const y1 = height - y0;

        return { x0, x1, y0, y1 };
      }

      // 60fps continuous drawing
      frameId = requestAnimationFrame(draw);
    }

    // kickoff drawing
    frameId = requestAnimationFrame(draw);

    return function cleanup() {
      cancelAnimationFrame(frameId);
    };
  }, [props]);

  return <canvas ref={canvasRef} style={styles.canvasFill} />;
}

const styles = {
  canvasFill: {
    width: '100%',
    height: '100%',
  },
};

function radiansFromDegrees(degrees) {
  return (degrees * Math.PI) / 180;
}
