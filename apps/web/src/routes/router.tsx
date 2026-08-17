import { createBrowserRouter, Navigate } from "react-router";

import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

import DashboardPage from "../pages/dashboard/dashboard";
import AccountsPage from "../pages/accounts/accounts";
import TransactionsPage from "../pages/transactions/transactions";
import WorkspacePage from "../pages/workspace/workspace";


import DashboardLayout from "../layout/dashboard-layout";
import AuthLayout from '../layout/auth-layout';
import SettingsPage from "../pages/settings/settings";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/accounts",
        element: <AccountsPage />,
      },
      {
        path: "/transactions",
        element: <TransactionsPage />,
      },
      {
        path: "/workspace",
        element: <WorkspacePage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);