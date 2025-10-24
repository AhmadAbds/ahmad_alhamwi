/* import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;  */

// components/ProtectedRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // عرض شاشة تحميل أثناء التحقق من حالة المصادقة
    return <div>جاري التحميل...</div>;
  }

  if (!user) {
    // إذا لم يكن المستخدم مسجلاً، توجيه إلى صفحة Login
    return <Navigate to="/login" replace />;
  }

  // إذا كان المستخدم مسجلاً، عرض المحتوى المحمي
  return children;
};

export default ProtectedRoute;
