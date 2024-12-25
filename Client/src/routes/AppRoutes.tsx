import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

// Import route groups
import { PublicRoutes } from './PublicRoutes';
import { AdminRoutes } from './AdminRoutes';
import { AgentRoutes } from './AgentRoutes';
import { UserRoutes } from './UserRoutes';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route>{PublicRoutes}</Route>
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
        {/* Role-based routes */}
        <Route path="admin/*">{AdminRoutes}</Route>
        <Route path="agent/*">{AgentRoutes}</Route>
        <Route path="user/*">{UserRoutes}</Route>

        {/* Default redirect */}
        <Route index element={<Navigate to="user" replace />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};