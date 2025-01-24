import React from 'react';
import { Route } from 'react-router-dom';
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminUniversities } from '../pages/admin/AdminUniversities';
import { AdminApplications } from '../pages/admin/AdminApplications';
import { AdminChat } from '../pages/admin/AdminChat';
import { AdminNews } from '../pages/admin/AdminNews';
import { AdminVisitors } from '../pages/admin/AdminVisitors';
import { VisitorDetailsPage } from '../pages/admin/VisitorDetailsPage';
import { VisitorStats } from '../pages/admin/VisitorStats';
import { AdminPrograms } from '../pages/admin/AdminPrograms';
import { AdminJobs } from '../pages/admin/AdminJobs';
import { AdminDegrees } from '../pages/admin/AdminDegrees';
import { AdminCourses } from '../pages/admin/AdminCourses';
import { AdminPaymentHistory } from '../pages/admin/AdminPaymentHistory';

export const AdminRoutes = (
  <>
    <Route index element={<AdminDashboard />} />
    <Route path="users" element={<AdminUsers />} />
    <Route path="services" element={<AdminServices />} />
    <Route path="universities" element={<AdminUniversities />} />
    <Route path="applications" element={<AdminApplications />} />
    <Route path="chat" element={<AdminChat />} />
    <Route path="news" element={<AdminNews />} />
    <Route path="visitors" element={<AdminVisitors />} />
    <Route path="visitors/:id" element={<VisitorDetailsPage />} />
    <Route path="stats" element={<VisitorStats />} />
    <Route path="programs" element={<AdminPrograms />} />
    <Route path="jobs" element={<AdminJobs />} />
    <Route path="degrees" element={<AdminDegrees />} />
    <Route path="courses" element={<AdminCourses />} />
    <Route path="payments" element={<AdminPaymentHistory />} />
  </>
);