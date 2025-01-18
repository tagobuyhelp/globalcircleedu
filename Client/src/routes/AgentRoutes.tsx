import React from 'react';
import { Route } from 'react-router-dom';
import { AgentDashboard } from '../pages/agent/AgentDashboard';
import { AgentApplications } from '../pages/agent/AgentApplications';
import { AgentEarnings } from '../pages/agent/AgentEarnings';

export const AgentRoutes = (
  <>
    <Route index element={<AgentDashboard />} />
    <Route path="applications" element={<AgentApplications />} />
    <Route path="earnings" element={<AgentEarnings />} />
  </>
);