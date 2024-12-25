import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Public pages
import { Home } from '../pages/Home';
import { CoursesPage } from '../pages/public/CoursesPage';
import { CoursePage } from '../pages/public/CoursePage';
import { UniversitiesPage } from '../pages/public/UniversitiesPage';
import { UniversityPage } from '../pages/public/UniversityPage';
import { JobsPage } from '../pages/public/JobsPage';
import { NewsPage } from '../pages/public/NewsPage';
import { SingleNewsPage } from '../pages/public/SingleNewsPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { UnauthorizedPage } from '../pages/auth/UnauthorizedPage';

// Admin pages
import { AdminDashboard } from '../pages/admin/AdminDashboard';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { AdminServices } from '../pages/admin/AdminServices';
import { AdminUniversities } from '../pages/admin/AdminUniversities';
import { AdminApplications } from '../pages/admin/AdminApplications';
import { VisitorStats } from '../pages/admin/VisitorStats';

// Agent pages
import { AgentDashboard } from '../pages/agent/AgentDashboard';
import { AgentVisitors } from '../pages/agent/AgentVisitors';
import { AgentApplications } from '../pages/agent/AgentApplications';
import { AgentEarnings } from '../pages/agent/AgentEarnings';

// User pages
import { UserDashboard } from '../pages/user/UserDashboard';
import { UserCourses } from '../pages/user/UserCourses';
import { UserUniversities } from '../pages/user/UserUniversities';
import { UserJobs } from '../pages/user/UserJobs';
import { UserApplications } from '../pages/user/UserApplications';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CoursePage />} />
        <Route path="/universities" element={<UniversitiesPage />} />
        <Route path="/universities/:id" element={<UniversityPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<SingleNewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Route>

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin routes */}
        <Route path="admin">
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="universities" element={<AdminUniversities />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="stats" element={<VisitorStats />} />
        </Route>

        {/* Agent routes */}
        <Route path="agent">
          <Route index element={<AgentDashboard />} />
          <Route path="visitors" element={<AgentVisitors />} />
          <Route path="applications" element={<AgentApplications />} />
          <Route path="earnings" element={<AgentEarnings />} />
        </Route>

        {/* User routes */}
        <Route path="user">
          <Route index element={<UserDashboard />} />
          <Route path="courses" element={<UserCourses />} />
          <Route path="universities" element={<UserUniversities />} />
          <Route path="jobs" element={<UserJobs />} />
          <Route path="applications" element={<UserApplications />} />
        </Route>

        {/* Default redirect based on role */}
        <Route index element={<Navigate to="user" replace />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};