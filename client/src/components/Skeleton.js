import React from 'react';

const Skeleton = ({ type }) => {
  const classes = {
    text: 'h-4 bg-gray-200 rounded animate-pulse',
    title: 'h-6 bg-gray-200 rounded animate-pulse',
    avatar: 'h-12 w-12 bg-gray-200 rounded-full animate-pulse',
    thumbnail: 'h-32 bg-gray-200 rounded animate-pulse',
    card: 'h-48 bg-gray-200 rounded-lg animate-pulse',
    button: 'h-10 bg-gray-200 rounded animate-pulse',
  };

  return (
    <div className={classes[type] || classes.text} />
  );
};

export const FoodItemSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3 mb-4" />
        <div className="flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );
};

export const VendorCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-32 bg-gray-200 animate-pulse" />
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1">
            <div className="h-5 bg-gray-200 rounded animate-pulse mb-2" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          </div>
        </div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
      </div>
    </div>
  );
};

export const OrderCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/4" />
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
};

export default Skeleton; 