// app/protected/page.tsx
"use client";

import React, { useEffect, useState } from 'react';

const ProtectedPage = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/login'; 
        return;
      }

      try {
        const response = await fetch('/api/protected', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          throw new Error('Failed to fetch protected data');
        }
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-black">Protected Page</h1>
        {loading ? (
          <p className="text-lg text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-lg text-red-600">Error: {error}</p>
        ) : data ? (
          <div className="text-left text-gray-800">
            <h2 className="text-xl font-semibold mb-2">Your Data:</h2>
            <pre className="bg-gray-200 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-lg text-gray-600">No data available</p>
        )}
      </div>
    </div>
  );
};

export default ProtectedPage;
