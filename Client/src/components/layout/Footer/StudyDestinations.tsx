import React from 'react';
import { Link } from 'react-router-dom';

export const StudyDestinations = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Study Destinations</h3>
      <ul className="space-y-2">
        <li>
          <Link to="/study/usa" className="hover:text-[#f37021]">USA</Link>
        </li>
        <li>
          <Link to="/study/uk" className="hover:text-[#f37021]">UK</Link>
        </li>
        <li>
          <Link to="/study/canada" className="hover:text-[#f37021]">Canada</Link>
        </li>
        <li>
          <Link to="/study/australia" className="hover:text-[#f37021]">Australia</Link>
        </li>
      </ul>
    </div>
  );
};