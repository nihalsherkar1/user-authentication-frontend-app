import { Routes, Route } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import { AddUser } from "../page/Admin/AddUser";
import { useSelector } from "react-redux";
import ProtectedRoute from "../utils/ProtectedRoute";

const Dashboard = lazy(() => import("../page/Dashboard"));

const Login = lazy(() => import("../page/Login"));
const OAuthSuccess = lazy(() => import("../page/OAuthSuccess"));

export default function AppRoutes() {
  const { user } = useSelector((state) => state.login);

  return (
    <Suspense fallback={<div> Loading... </div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/oauth2/redirect" element={<OAuthSuccess />} />

        {/* Protected Route */}
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute allowedRole="ROLE_ADMIN">
              <AddUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}
