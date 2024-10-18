import React from 'react';

const ProfessionalLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Main loading spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-16 h-16 border-4 border-gray-100 rounded-full animate-spin">
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
          
          {/* Inner dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">
            Preparing Your Order
          </h3>
          <div className="text-sm text-gray-500 animate-pulse">
            Please wait a moment...
          </div>
        </div>
        
        {/* Loading progress dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLoader;