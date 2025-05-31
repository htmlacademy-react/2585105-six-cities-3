import React, { useState, useEffect, useRef } from 'react';

interface LoaderProps {
  size?: number;
  color?: string;
  bgColor?: string;
  speed?: number;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = '#3498db',
  bgColor = '#f3f3f3',
  speed = 1.5
}) => {
  const [rotation, setRotation] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();

    const animate = (time: DOMHighResTimeStamp) => {
      const elapsed = (time - startTime) / 1000;
      setRotation(elapsed * 360 * speed);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);


  const loaderStyles = {
    container: {
      display: 'flex' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      height: '100%',
      width: '100%',
    },
    spinner: {
      border: `4px solid ${bgColor}`,
      borderTop: `4px solid ${color}`,
      borderRadius: '50%',
      width: size,
      height: size,
      transform: `rotate(${rotation}deg)`,
      transition: 'transform 0.1s linear',
    }
  };

  return (
    <div style={loaderStyles.container} role="status" aria-label="Loading">
      <div style={loaderStyles.spinner} />
    </div>
  );
};

export default Loader;
