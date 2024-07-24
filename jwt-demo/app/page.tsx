"use client";

import React from 'react';
import Link from 'next/link';
import './globals.css'; 
const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-black">Welcome to JWT Demo</h1>
        <p className="text-lg mb-6 text-black">This is a demo application to showcase JWT authentication specially built for no scrubs assignment.</p>
        <Link href="/login" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
