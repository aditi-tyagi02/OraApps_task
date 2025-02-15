import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          &copy; {new Date().getFullYear()} OraApps Solutions. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/about" className="text-purple-600 dark:text-purple-400 hover:underline">
            About Us
          </Link>
          <Link to="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">
            Contact
          </Link>
          <Link to="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">
            Privacy Policy
          </Link>
        </div>
        <h2 className="text-gray-500 dark:text-gray-400">
          Developed by Aditi Tyagi for OraApps Solutions
        </h2>
      </div>
    </footer>
  );
}