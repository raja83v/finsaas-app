import { Navigate, RouteObject } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import { DashboardLayout } from "./components/dashboard/layout";
import LandingPage from "./pages/landing-page";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardOverview from "./pages/dashboard/overview";
import GoldLoans from "./pages/dashboard/gold-loans";
import GoldLoanApplication from "./pages/dashboard/gold-loans/apply";
import LoanDetail from "./pages/dashboard/gold-loans/loan-detail";
import SavingsAccounts from "./pages/dashboard/savings-accounts";
import Customers from "./pages/dashboard/customers";
import CustomerDetail from "./pages/dashboard/customers/customer-detail";
import Reports from "./pages/dashboard/reports";
import ReportBuilder from "./pages/dashboard/reports/report-builder";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: "loans", element: <GoldLoans /> },
      { path: "loans/apply", element: <GoldLoanApplication /> },
      { path: "loans/:id", element: <LoanDetail /> },
      { path: "accounts", element: <SavingsAccounts /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/:id", element: <CustomerDetail /> },
      { path: "reports", element: <Reports /> },
      { path: "reports/builder", element: <ReportBuilder /> },
      { path: "metrics", element: <Dashboard /> },
      // Add other dashboard routes here
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
