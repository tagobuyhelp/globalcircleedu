import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { VisitorProfilePage } from '../pages/visitor/VisitorProfilePage';

// Import route groups
import { PublicRoutes } from './PublicRoutes';
import { AdminRoutes } from './AdminRoutes';
import { AgentRoutes } from './AgentRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        {PublicRoutes}
      </Route>

      {/* Protected dashboard routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* Admin routes with sidebar */}
        <Route
          path="admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin', 'administrator']}>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          {AdminRoutes}
        </Route>

        {/* Agent routes with sidebar */}
        <Route
          path="agent/*"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <DashboardLayout>
                <Outlet />
              </DashboardLayout>
            </ProtectedRoute>
          }
        >
          {AgentRoutes}
        </Route>

        {/* Visitor routes */}
        <Route
          path="visitor/*"
          element={
            <ProtectedRoute allowedRoles={['visitor']}>
              <MainLayout>
                <Outlet />
              </MainLayout>
            </ProtectedRoute>
          }
        >
          <Route path="profile" element={<VisitorProfilePage />} />
          <Route index element={<Navigate to="profile" replace />} />
        </Route>

        {/* Default redirect based on role */}
        <Route
          index
          element={
            <ProtectedRoute>
              {({ user }) => {
                if (user?.role === 'admin' || user?.role === 'administrator') {
                  return <Navigate to="/dashboard/admin" replace />;
                }
                if (user?.role === 'agent') {
                  return <Navigate to="/dashboard/agent" replace />;
                }
                return <Navigate to="/dashboard/visitor/profile" replace />;
              }}
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};