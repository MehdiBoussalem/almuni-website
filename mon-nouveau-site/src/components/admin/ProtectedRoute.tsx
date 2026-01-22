import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function AdminProtectedRoute({ children }: ProtectedRouteProps) {
  const token = sessionStorage.getItem("adminToken");
  const user = sessionStorage.getItem("adminUser");

  if (!token || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
