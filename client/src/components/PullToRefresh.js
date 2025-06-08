import React, { useState, useEffect, useRef } from 'react';

const PullToRefresh = ({ onRefresh, children, threshold = 70 }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (containerRef.current.scrollTop === 0) {
      setStartY(e.touches[0].clientY);
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    
    if (diff > 0) {
      setCurrentY(Math.min(diff, threshold));
    }
  };

  const handleTouchEnd = async () => {
    if (!isDragging) return;
    
    if (currentY >= threshold) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
    
    setIsDragging(false);
    setCurrentY(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="absolute left-0 right-0 flex items-center justify-center"
        style={{
          transform: `translateY(${currentY}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        {isRefreshing ? (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        ) : (
          <div className="text-gray-500">
            {currentY >= threshold ? 'Release to refresh' : 'Pull to refresh'}
          </div>
        )}
      </div>
      <div style={{ transform: `translateY(${currentY}px)` }}>{children}</div>
    </div>
  );
};

export default PullToRefresh; 