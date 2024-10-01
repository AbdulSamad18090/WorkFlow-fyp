import Link from 'next/link';
import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-fit mt-32">
      <div className="bg-blue-50 w-[600px] p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-semibold text-blue-600 mb-4">Access Denied</h1>
        <p className="text-lg text-blue-500 mb-6">Please login to your account first.</p>
        <Link href={'http://localhost:3000/Auth'} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Login Now
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
