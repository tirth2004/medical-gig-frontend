import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("adminToken");
  const userStr = localStorage.getItem("adminUser");

  if (!token || !userStr) {
    return <Navigate to="/admin" replace />;
  }

  try {
    JSON.parse(userStr);
  } catch {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
