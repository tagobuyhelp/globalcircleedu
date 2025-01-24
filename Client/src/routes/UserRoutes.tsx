import React from 'react';
import { Route } from 'react-router-dom';
import { UserDashboard } from '../pages/user/UserDashboard';
import { VisitorProfilePage } from '../pages/visitor/VisitorProfilePage';


export const UserRoutes = (
  <>
    <Route index element={<UserDashboard />} />
    <Route path="profile" element={<VisitorProfilePage />} />
  </>
);