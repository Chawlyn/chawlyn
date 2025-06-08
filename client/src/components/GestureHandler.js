import React, { useRef, useEffect } from 'react';

const GestureHandler = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinchIn,
  onPinchOut,
  onRotate,
  onPan,
  className = '',
}) => {
  const containerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchStartTimeRef = useRef(null);
  const initialDistanceRef = useRef(null);
  const initialAngleRef = useRef(null);

  const getDistance = (touch1, touch2) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getAngle = (touch1, touch2) => {
    return Math.atan2(
      touch2.clientY - touch1.clientY,
      touch2.clientX - touch1.clientX
    );
  };

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches;
    touchStartTimeRef.current = Date.now();

    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches[0], e.touches[1]);
      initialAngleRef.current = getAngle(e.touches[0], e.touches[1]);
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStartRef.current) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - touchStartTimeRef.current;

    // Handle pan gesture
    if (e.touches.length === 1 && onPan) {
      const touch = e.touches[0];
      const startTouch = touchStartRef.current[0];
      const deltaX = touch.clientX - startTouch.clientX;
      const deltaY = touch.clientY - startTouch.clientY;

      onPan({ deltaX, deltaY });
    }

    // Handle pinch gesture
    if (e.touches.length === 2 && initialDistanceRef.current) {
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistanceRef.current;

      if (scale > 1.1 && onPinchOut) {
        onPinchOut(scale);
      } else if (scale < 0.9 && onPinchIn) {
        onPinchIn(scale);
      }

      // Handle rotate gesture
      if (initialAngleRef.current && onRotate) {
        const currentAngle = getAngle(e.touches[0], e.touches[1]);
        const rotation = currentAngle - initialAngleRef.current;
        onRotate(rotation);
      }
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchStartRef.current) return;

    const currentTime = Date.now();
    const timeDiff = currentTime - touchStartTimeRef.current;

    // Only process swipe if touch duration is less than 300ms
    if (timeDiff < 300 && e.changedTouches.length === 1) {
      const touch = e.changedTouches[0];
      const startTouch = touchStartRef.current[0];
      const deltaX = touch.clientX - startTouch.clientX;
      const deltaY = touch.clientY - startTouch.clientY;

      // Minimum swipe distance threshold
      const minSwipeDistance = 50;

      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0 && onSwipeRight) {
          onSwipeRight();
        } else if (deltaX < 0 && onSwipeLeft) {
          onSwipeLeft();
        }
      }

      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0 && onSwipeDown) {
          onSwipeDown();
        } else if (deltaY < 0 && onSwipeUp) {
          onSwipeUp();
        }
      }
    }

    // Reset refs
    touchStartRef.current = null;
    touchStartTimeRef.current = null;
    initialDistanceRef.current = null;
    initialAngleRef.current = null;
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd);
    container.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onPinchIn, onPinchOut, onRotate, onPan]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default GestureHandler; 