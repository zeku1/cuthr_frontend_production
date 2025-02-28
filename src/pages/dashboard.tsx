"use client";

import React from "react";
import Layout from "../components/Layout";
// import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from "../components/Dashboard";
import withAuth from "../components/withAuth";

const DashboardPage = () => {
  return (
    // <ProtectedRoute>
      <Layout>
        <Dashboard />
      </Layout>
    // </ProtectedRoute>
  );
};

export default withAuth(DashboardPage);