import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { CoursesPage } from '../pages/public/CoursesPage';
import { CoursePage } from '../pages/public/CoursePage';
import { UniversitiesPage } from '../pages/public/UniversitiesPage';
import { UniversityPage } from '../pages/public/UniversityPage';
import { JobsPage } from '../pages/public/JobsPage';
import { NewsPage } from '../pages/public/NewsPage';
import { SingleNewsPage } from '../pages/public/SingleNewsPage';
import { ServicesPage } from '../pages/public/ServicesPage';
import { SearchPage } from '../pages/public/SearchPage';
import { CountryDetailsPage } from '../pages/public/CountryDetailsPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { UnauthorizedPage } from '../pages/auth/UnauthorizedPage';
import { CompleteProfilePage } from '../pages/auth/CompleteProfilePage';

export const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/courses" element={<CoursesPage />} />
    <Route path="/courses/:id" element={<CoursePage />} />
    <Route path="/universities" element={<UniversitiesPage />} />
    <Route path="/universities/:id" element={<UniversityPage />} />
    <Route path="/jobs" element={<JobsPage />} />
    <Route path="/news" element={<NewsPage />} />
    <Route path="/news/:id" element={<SingleNewsPage />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/search" element={<SearchPage />} />
    <Route path="/study/:countryName" element={<CountryDetailsPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/complete-profile" element={<CompleteProfilePage />} />
    <Route path="/unauthorized" element={<UnauthorizedPage />} />
  </>
);