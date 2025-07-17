import React from 'react';
import Lottie from 'lottie-react';
// You can replace this with your own animation JSON file
import animationData from '../../assets/placeholder-lottie.json';


const AuthLottiePanel = () => (
  <div className="flex flex-col items-center justify-center h-full w-full p-8">
    <Lottie 
      animationData={animationData} 
      loop 
      style={{ width: '600px', height: 'auto' }}
    />
    <h2 className="mt-6 text-2xl font-bold text-center text-blue-700">Welcome to City Pulse</h2>
    <p className="mt-2 text-center text-gray-600 text-base max-w-md">
      Join the smart city revolution! Stay connected, report issues, and get real-time updates with our platform.
    </p>
  </div>
);

export default AuthLottiePanel; 