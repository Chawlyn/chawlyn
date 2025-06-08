// src/pages/FoodItemDetail.js
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import GestureHandler from '../components/GestureHandler';
import ProgressiveImage from '../components/ProgressiveImage';
import Skeleton from '../components/Skeleton';

// Image compression configuration
const IMAGE_CONFIG = {
  thumbnail: {
    width: 80,
    height: 80,
    quality: 0.7,
  },
  preview: {
    width: 400,
    height: 400,
    quality: 0.8,
  },
  full: {
    width: 1200,
    height: 1200,
    quality: 0.9,
  },
};

// Cache configuration
const CACHE_CONFIG = {
  maxSize: 50 * 1024 * 1024, // 50MB
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
};

const FoodItemDetail = () => {
  const { itemId } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [lastTapTime, setLastTapTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleImages, setVisibleImages] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [imageCache, setImageCache] = useState(new Map());
  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const loadingTimeoutRef = useRef(null);

  // Example item data (replace with API data)
  const item = {
    id: itemId,
    name: 'Jollof Rice',
    description: 'Delicious, spicy rice cooked with a blend of African spices.',
    ingredients: ['Rice', 'Tomatoes', 'Peppers', 'Onions', 'Spices'],
    price: 4500,
    sizes: ['Small', 'Medium', 'Large'],
    toppings: [
      { id: 1, name: 'Extra Chicken', price: 750 },
      { id: 2, name: 'Fried Plantains', price: 500 },
      { id: 3, name: 'Salad', price: 400 },
    ],
    images: [
      '/images/jollof-rice-1.jpg',
      '/images/jollof-rice-2.jpg',
      '/images/jollof-rice-3.jpg',
    ],
  };

  // State for selected options
  const [selectedSize, setSelectedSize] = useState(item.sizes[1]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scale, setScale] = useState(1);

  // Image compression utility
  const compressImage = async (src, config) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = config.width;
        canvas.height = config.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, config.width, config.height);
        canvas.toBlob(
          (blob) => {
            resolve(URL.createObjectURL(blob));
          },
          'image/jpeg',
          config.quality
        );
      };
      img.onerror = reject;
      img.src = src;
    });
  };

  // Cache management
  const getCachedImage = async (src, config) => {
    const cacheKey = `${src}-${config.width}-${config.height}`;
    const cached = imageCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_CONFIG.maxAge) {
      return cached.url;
    }

    const compressedUrl = await compressImage(src, config);
    const newCache = new Map(imageCache);
    newCache.set(cacheKey, { url: compressedUrl, timestamp: Date.now() });
    setImageCache(newCache);

    // Clean up old cache entries if size exceeds limit
    let totalSize = 0;
    const entries = Array.from(newCache.entries());
    for (let i = entries.length - 1; i >= 0; i--) {
      totalSize += entries[i][1].url.length;
      if (totalSize > CACHE_CONFIG.maxSize) {
        newCache.delete(entries[i][0]);
      }
    }
    setImageCache(newCache);

    return compressedUrl;
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isFullscreen) {
        switch (e.key) {
          case 'ArrowLeft':
            handleSwipeRight();
            break;
          case 'ArrowRight':
            handleSwipeLeft();
            break;
          case 'Escape':
            if (isFullscreen) {
              toggleFullscreen();
            } else if (isZoomed) {
              setIsZoomed(false);
              setScale(1);
            }
            break;
          case ' ':
            e.preventDefault();
            handleDoubleTap();
            break;
          case 'z':
            e.preventDefault();
            setIsZoomed(!isZoomed);
            setScale(isZoomed ? 1 : 2);
            break;
          case '0':
            e.preventDefault();
            setScale(1);
            setIsZoomed(false);
            break;
          case '+':
            e.preventDefault();
            setScale(Math.min(3, scale + 0.5));
            break;
          case '-':
            e.preventDefault();
            setScale(Math.max(1, scale - 0.5));
            break;
          case 'f':
            e.preventDefault();
            toggleFullscreen();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, isZoomed, scale]);

  // Enhanced lazy loading with loading progress
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleImages((prev) => [...new Set([...prev, index])]);
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Enhanced image preloading with progress
  useEffect(() => {
    const preloadImages = async () => {
      setIsLoading(true);
      setLoadingProgress(0);
      try {
        const totalImages = item.images.length;
        const loadedImages = await Promise.all(
          item.images.map(async (src, index) => {
            const compressedUrl = await getCachedImage(src, IMAGE_CONFIG.preview);
            setLoadingProgress((index + 1) / totalImages * 100);
            return compressedUrl;
          })
        );
        setPreloadedImages(loadedImages);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
          setLoadingProgress(100);
        }, 500); // Minimum loading time for smooth transition
      }
    };

    preloadImages();
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [item.images]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Add topping to the selectedToppings array
  const addTopping = (topping) => {
    if (!selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings((prevToppings) => [...prevToppings, topping]);
    }
  };

  // Remove topping from the selectedToppings array
  const removeTopping = (topping) => {
    setSelectedToppings((prevToppings) => prevToppings.filter((t) => t.id !== topping.id));
  };

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    const toppingsCost = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return item.price + toppingsCost;
  };

  const addToCart = () => {
    console.log(`Added ${item.name} to cart with size ${selectedSize} and toppings`, selectedToppings);
    // Implement actual add to cart functionality here
  };

  // Image gallery handlers
  const handleSwipeLeft = () => {
    setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
  };

  const handleSwipeRight = () => {
    setCurrentImageIndex((prev) => (prev - 1 + item.images.length) % item.images.length);
  };

  const handlePinchIn = (newScale) => {
    setScale(Math.max(1, Math.min(3, scale * newScale)));
  };

  const handlePinchOut = (newScale) => {
    setScale(Math.max(1, Math.min(3, scale / newScale)));
  };

  const handleDoubleTap = () => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;
    if (tapLength < 500 && tapLength > 0) {
      setIsZoomed(!isZoomed);
      setScale(isZoomed ? 1 : 2);
    }
    setLastTapTime(currentTime);
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error('Error attempting to exit fullscreen:', err);
      }
    }
  };

  const handleThumbnailHover = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      {/* Image Gallery Section */}
      <div className="mb-6">
        <GestureHandler
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onPinchIn={handlePinchIn}
          onPinchOut={handlePinchOut}
          onTap={handleDoubleTap}
          className="relative"
        >
          <div
            ref={containerRef}
            className={`relative aspect-square w-full overflow-hidden rounded-lg ${
              isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''
            }`}
          >
            {isLoading ? (
              <div className="relative w-full h-full">
                <Skeleton className="w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24">
                    <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-primary"></div>
                    <div className="mt-2 text-center text-sm text-gray-600">
                      {Math.round(loadingProgress)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <ProgressiveImage
                src={preloadedImages[currentImageIndex]}
                alt={`${item.name} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full object-contain transition-transform duration-300 ${
                  isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
                }`}
                style={{ transform: `scale(${scale})` }}
              />
            )}
            <button
              onClick={toggleFullscreen}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
            {isFullscreen && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                <div className="flex items-center space-x-4">
                  <span>← → to navigate</span>
                  <span>Space/Z to zoom</span>
                  <span>+/- to adjust zoom</span>
                  <span>0 to reset zoom</span>
                  <span>F to toggle fullscreen</span>
                  <span>ESC to exit</span>
                </div>
              </div>
            )}
          </div>
        </GestureHandler>

        {/* Enhanced Thumbnail Gallery */}
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-200">
          {item.images.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el && !visibleImages.includes(index)) {
                  observerRef.current.observe(el);
                }
              }}
              data-index={index}
              className="flex-shrink-0"
            >
              <button
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsZoomed(false);
                  setScale(1);
                }}
                onMouseEnter={() => handleThumbnailHover(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  currentImageIndex === index
                    ? 'ring-2 ring-primary transform scale-105'
                    : 'hover:ring-2 hover:ring-gray-300'
                }`}
              >
                {visibleImages.includes(index) ? (
                  <ProgressiveImage
                    src={preloadedImages[index]}
                    alt={`${item.name} thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Skeleton className="w-full h-full" />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity duration-300" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Food Item Information */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">{item.name}</h1>
        <p className="text-gray-700">{item.description}</p>
        <p className="text-primary font-semibold mt-4">Base Price: ₦{item.price.toFixed(2)}</p>
      </div>

      {/* Ingredients */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-700">
          {item.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Size Options */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Select Size</h2>
        <div className="flex space-x-4">
          {item.sizes.map((size) => (
            <label key={size} className="flex items-center space-x-2">
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={() => setSelectedSize(size)}
                className="text-primary focus:ring-primary"
              />
              <span className="text-gray-700">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Toppings Options */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-primary mb-2">Choose Toppings</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {item.toppings.map((topping) => (
            <div key={topping.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <span className="text-gray-700">{topping.name} (+₦{topping.price.toFixed(2)})</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => removeTopping(topping)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  disabled={!selectedToppings.some((t) => t.id === topping.id)}
                >
                  -
                </button>
                <button
                  onClick={() => addTopping(topping)}
                  className="bg-primary text-white px-2 py-1 rounded hover:bg-secondary transition"
                  disabled={selectedToppings.some((t) => t.id === topping.id)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Display Selected Toppings */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-primary mb-2">Added Toppings:</h2>
        <ul className="list-disc list-inside text-gray-700">
          {selectedToppings.length > 0 ? (
            selectedToppings.map((topping) => <li key={topping.id}>+ {topping.name}</li>)
          ) : (
            <p className="text-gray-500">No toppings added.</p>
          )}
        </ul>
      </div>

      {/* Total Price and Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <p className="text-2xl font-semibold text-secondary mb-4">Total: ₦{calculateTotalPrice().toFixed(2)}</p>
        <button
          onClick={addToCart}
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default FoodItemDetail;
