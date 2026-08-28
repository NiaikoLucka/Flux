import { createBrowserRouter, Navigate } from "react-router";

import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";

import DashboardPage from "../pages/dashboard/dashboard";
import AccountsPage from "../pages/accounts/accounts";
import TransactionsPage from "../pages/transactions/transactions";
import WorkspacePage from "../pages/workspace/workspace";

import DashboardLayout from "../layout/dashboard-layout";
import AuthLayout from "../layout/auth-layout";
import ProtectedRoute from "./protected-route";
import WorkspaceGate from "./workspace-gate";
import NoWorkspacePage from "../components/workspaces/no-workspace";
import CreateWorkspacePage from "../pages/workspace/creat-workspace";

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
    element: <ProtectedRoute />,
    children: [
      {
        path: "/workspace/empty",
        element: <NoWorkspacePage />,
      },
      {
        path:"/workspace/create",
        element: <CreateWorkspacePage />
      },

      {
        element: <WorkspaceGate />,
        children: [
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
            ],
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/dashboard" replace />,
  },
]);
