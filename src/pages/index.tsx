"use client";

import React from "react";
import Layout from "../components/Layout";
import Dashboard from "../components/Dashboard";
import withAuth from "../components/withAuth";

const DashboardPage = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default withAuth(DashboardPage);