import React, { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';

const ProgressiveImage = ({
  src,
  alt,
  className = '',
  placeholderSrc,
  width,
  height,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  if (!isInView) {
    return (
      <div ref={imageRef} style={{ width, height }}>
        <Skeleton variant="rectangular" className="w-full h-full" />
      </div>
    );
  }

  return (
    <div
      ref={imageRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder/Blur-up image */}
      {!isLoaded && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt={`${alt} (placeholder)`}
          className="absolute inset-0 w-full h-full object-cover filter blur-lg scale-110"
        />
      )}

      {/* Main image */}
      <img
        src={src}
        alt={alt}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-300
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        onLoad={handleLoad}
        loading="lazy"
      />

      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0">
          <Skeleton variant="rectangular" className="w-full h-full" />
        </div>
      )}
    </div>
  );
};

export default ProgressiveImage; 