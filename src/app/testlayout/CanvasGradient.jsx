// components/CanvasGradient.js
import { useEffect, useRef } from 'react';

const CanvasGradient = (props) => {
  const canvasRef = useRef();

  const locals = useRef({
    angle: 0,
    stops: [],
    animated: false,
    animation: {
      progress: 0.35,
      stopDelta: 0,
      stops: [],
    },
  });

  locals.current.angle = props.angle;
  locals.current.stops = props.stops;
  locals.current.animated = props.animated;

  useEffect(() => {
    let frameId;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const scale = window.devicePixelRatio;
    const { offsetWidth, offsetHeight } = canvas;
    const width = offsetWidth * scale;
    const height = offsetHeight * scale;
    canvas.width = width;
    canvas.height = height;

    const [firstStop, secondStop] = locals.current.stops;
    locals.current.animation.stopDelta = secondStop.offset - firstStop.offset;
    locals.current.animation.stops = [...locals.current.stops];

    function draw() {
      ctx.clearRect(0, 0, width, height);

      if (!props.animated) {
        drawGradient(0, 0);
      } else {
        const frameIncrement = 0.01;
        const stops = locals.current.animation.stops;

        for (let i = 0; i < stops.length; i++) {
          const stop = stops[i];

          stop.offset += frameIncrement;
          if (stop.offset > 1.0) {
            stop.offset = 1.0;
          }
        }

        const [firstStop, lastStop] = stops;
        if (firstStop.offset === 1.0) {
          locals.current.animation.stops = [
            { ...lastStop, offset: -0.8991 },
            { ...firstStop, offset: 0.0 },
          ];
        }

        drawGradient();
      }

      if (props.animated) {
        frameId = requestAnimationFrame(draw);
      }
    }

    function drawGradient() {
      ctx.fillStyle = getLinearGradient();
      ctx.fillRect(0, 0, width, height);
    }

    function getLinearGradient() {
      const gradientLine = getGradientLine(locals.current.angle, {
        width,
        height,
      });
      const gradient = ctx.createLinearGradient(...gradientLine.points);

      locals.current.animation.stops.forEach((stop) => {
        const offset = Math.max(0, stop.offset);
        gradient.addColorStop(offset, stop.color);
      });

      return gradient;
    }

    frameId = requestAnimationFrame(draw);

    return function cleanup() {
      cancelAnimationFrame(frameId);
    };
  }, [props.animated]);

  return <canvas ref={canvasRef} style={styles.canvasFill} />;
};

const styles = {
  canvasFill: {
    width: '100%',
    height: '100%',
  },
};

function radiansFromDegrees(degrees) {
  return (degrees * Math.PI) / 180;
}

function getGradientLine(angleDegrees, bounds, reversed) {
  const radian = radiansFromDegrees(angleDegrees) + Math.PI;

  const gradientLineLength =
    Math.abs(bounds.width * Math.sin(radian)) +
    Math.abs(bounds.height * Math.cos(radian));

  const center = {
    x: bounds.width / 2,
    y: bounds.height / 2,
  };

  const direction = reversed ? -1 : +1;
  const yDiff = (direction * (Math.cos(radian) * gradientLineLength)) / 2;
  const xDiff = (direction * (Math.sin(radian) * gradientLineLength)) / 2;

  const start = {
    x: center.x + xDiff,
    y: center.y + yDiff,
  };
  const end = {
    x: center.x - xDiff,
    y: center.y - yDiff,
  };

  return {
    length: gradientLineLength,
    center: center,
    line: { start, end },
    points: [start.x, start.y, end.x, end.y],
  };
}

export default CanvasGradient;