import React from 'react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const RegisterPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Start your journey with Global Circle Edu"
    >
      <RegisterForm />
    </AuthLayout>
  );
};