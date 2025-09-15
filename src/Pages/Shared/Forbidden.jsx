import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <FaLock className="text-red-500 text-6xl mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sorry, you don’t have permission to access this page.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Home
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
