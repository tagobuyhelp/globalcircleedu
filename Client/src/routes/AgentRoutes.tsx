import React from 'react';
import { Route } from 'react-router-dom';
import { AgentDashboard } from '../pages/agent/AgentDashboard';
import { AgentApplications } from '../pages/agent/AgentApplications';
import { AgentEarnings } from '../pages/agent/AgentEarnings';
import { AgentVisitors } from '../pages/agent/AgentVisitors';

export const AgentRoutes = (
  <>
    <Route index element={<AgentDashboard />} />
    <Route path="applications" element={<AgentApplications />} />
    <Route path="earnings" element={<AgentEarnings />} />
    <Route path="visitors" element={<AgentVisitors />} />
  </>
);