import React, { useState, useEffect } from "react";

const Loader = ({ children, duration = 2000 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50 overflow-hidden">
        {/* Main content container */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          
          {/* Loader circle */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            
            {/* Outer rotating circle */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-300 border-t-black opacity-70 animate-spin" style={{ animationDuration: '2.5s' }} />
            
            {/* Inner slower circle */}
            <div className="absolute inset-4 rounded-full border-2 border-gray-400 opacity-50 animate-spin" style={{ animationDuration: '3.5s', animationDirection: 'reverse' }} />
            
            {/* Center glow circle */}
            <div className="absolute inset-8 rounded-full bg-gray-200/20 blur-sm" />
            
            {/* Text in center */}
            <div className="relative flex flex-col items-center justify-center">
              <h1 className="text-2xl font-black tracking-tight text-black">
                JWD
              </h1>
            </div>
          </div>

          {/* CODING Text below */}
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold tracking-widest text-black">
              CODING
            </h2>
            <p className="text-gray-600 text-xs tracking-widest uppercase mt-1">
              Professional Learning
            </p>
            <p className="text-gray-400 text-xs tracking-wider uppercase font-light pt-1">
              Loading content...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loader;