import React from 'react';
import { Route } from 'react-router-dom';
import { UserDashboard } from '../pages/user/UserDashboard';
import { UserCourses } from '../pages/user/UserCourses';
import { UserUniversities } from '../pages/user/UserUniversities';
import { UserJobs } from '../pages/user/UserJobs';
import { UserApplications } from '../pages/user/UserApplications';

export const UserRoutes = (
  <>
    <Route index element={<UserDashboard />} />
    <Route path="courses" element={<UserCourses />} />
    <Route path="universities" element={<UserUniversities />} />
    <Route path="jobs" element={<UserJobs />} />
    <Route path="applications" element={<UserApplications />} />
  </>
);