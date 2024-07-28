'use client';

import React from 'react';
import Link from 'next/link';
import './globals.css';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-center">
      <h1 className="text-6xl font-extrabold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Welcome to JWT Demo
      </h1>
      <p className="text-xl text-white mb-8" style={{ fontFamily: 'Roboto, sans-serif' }}>
        This is a demo application to showcase JWT authentication specially built for the no scrubs assignment.
      </p>
      <Link href="/login" legacyBehavior>
        <a className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 hover:shadow-lg transition-transform transform hover:-translate-y-1">
          Go to Login
        </a>
      </Link>
    </div>
  );
};

export default HomePage;
