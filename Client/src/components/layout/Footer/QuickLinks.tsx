import React from 'react';
import { Link } from 'react-router-dom';

export const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/courses" className="hover:text-[#f37021]">Courses</Link>
        </li>
        <li>
          <Link to="/universities" className="hover:text-[#f37021]">Universities</Link>
        </li>
        <li>
          <Link to="/jobs" className="hover:text-[#f37021]">Jobs</Link>
        </li>
        <li>
          <Link to="/news" className="hover:text-[#f37021]">News</Link>
        </li>
      </ul>
    </div>
  );
};