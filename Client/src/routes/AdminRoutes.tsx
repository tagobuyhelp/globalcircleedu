import React from 'react';
import { Route } from 'react-router-dom';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminUniversities } from '../pages/admin/AdminUniversities';
import { AdminApplications } from '../pages/admin/AdminApplications';
import { VisitorStats } from '../pages/admin/VisitorStats';

export const AdminRoutes = (
  <>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="services" element={<AdminServices />} />
    <Route path="universities" element={<AdminUniversities />} />
    <Route path="applications" element={<AdminApplications />} />
    <Route path="stats" element={<VisitorStats />} />
  </>
);