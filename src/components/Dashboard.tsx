"use client";

import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import StatCard from "./ui/StatCard";
import MetricBar from "./ui/MetricBar";
import Table from "./ui/Table";
import { useRouter } from 'next/router';
import { AdminService } from '../services/api/dashboard';
import { AuthService } from '../services/api/auth';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  strand: string;
  school_id: number;
  contact_number: string;
  emergency_contact: string;
  transaction_number: string;
  verified: number | null;
}

interface DashboardData {
  students: Student[];
  totals: {
    total_students: number;
    total_attendance: number;
    total_food: number;
    total_photo: number;
  }
}

const Dashboard = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [selectedStrand, setSelectedStrand] = useState<string>("ALL");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    students: [],
    totals: {
      total_students: 0,
      total_attendance: 0,
      total_food: 0,
      total_photo: 0
    }
  });

  const [loading, setLoading] = useState(true);

  // Calculate strand metrics from API data
  const strandMetrics = dashboardData.students.reduce((acc, student) => {
    acc[student.strand] = (acc[student.strand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get unique strands sorted by count
  const uniqueStrands = Object.entries(strandMetrics)
    .sort(([, a], [, b]) => b - a)
    .map(([strand]) => strand);

  // Prepare stat card data from API response
  const statCardData = [
    {
      value: dashboardData.totals.total_students,
      total: dashboardData.totals.total_students,
      label: "Total Students"
    },
    {
      value: dashboardData.totals.total_attendance || "0",
      total: dashboardData.totals.total_students,
      label: "Attendance"
    },
    {
      value: dashboardData.totals.total_food || "0",
      total: dashboardData.totals.total_students,
      label: "Food"
    },
    {
      value: dashboardData.totals.total_photo || "0",
      total: dashboardData.totals.total_students,
      label: "Photo"
    }
  ];



  useEffect(() => {
    const token = AuthService.getToken();

    if(token){
      const fetchDashboardData = async () => {
        try {
          setLoading(true);
          const data = await AdminService.getDashboardData();
          setDashboardData(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching dashboard data:", error);
          setLoading(false);
        }
      };

      fetchDashboardData();
    }

    
  }, [router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStrandFilter = (strand: string) => {
    setSelectedStrand(strand);
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-[#F6E8D6]">Loading...</div>;
  }

  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden p-[4vw] pt-[24vw] bg-[#F6E8D6] text-black">
        <div className="text-[4vw] mb-[8vw]" style={{ color: "#1D8E42" }}>
          Hello! Had you have your coffee?
        </div>

        {/* Mobile Stats - Swipable */}
        <div className="flex flex-col gap-[4vw] mb-[4vw]">
          <div className="w-[92vw] overflow-x-auto scrollbar-hide">
            <div className="inline-flex gap-[8vw] min-w-max">
              {statCardData.map((stat, index) => (
                <StatCard
                  key={index}
                  value={stat.value}
                  total={stat.total}
                  label={stat.label}
                  statStyle={{ fontFamily: "Anton-Regular" }}
                />
              ))}
            </div>
          </div>

          {/* Mobile Metrics */}
          <div className="w-[92vw] pt-[4vw]">
            {uniqueStrands.map((strand) => (
              <MetricBar
                key={strand}
                label={strand}
                value={strandMetrics[strand]}
                max={dashboardData.totals.total_students}
              />
            ))}
            <div className="text-[3.5vw] mt-[2vw]" style={{ color: "#1D8E42" }}>
              Strand Distribution
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="relative w-[92vw] mb-[4vw] flex items-center">
          <div className="overflow-x-auto scrollbar-hide flex-1 pr-[12vw]">
            <div className="flex gap-[2vw] min-w-max">
              {["ALL", "FACULTY", ...uniqueStrands].map((item) => (
                <button
                  key={item}
                  onClick={() => handleStrandFilter(item)}
                  className={`px-[3vw] py-[2vw] text-[3vw] whitespace-nowrap rounded-full border ${
                    selectedStrand === item
                      ? "bg-[#4CE147]"
                      : "bg-[#1D8E42]"
                  } text-white border-[#1D8E42] hover:bg-[#4CE147] flex-shrink-0`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 ml-[2vw]">
            <button
              className="flex items-center justify-center w-[10vw] h-[10vw] rounded-full border-2 border-[#1D8E42] bg-white hover:bg-[#1D8E42] group"
              aria-label="Add Attendee"
            >
              <AiOutlinePlus className="w-[5vw] h-[5vw] text-[#1D8E42] group-hover:text-white" />
            </button>
          </div>
        </div>

        {/* Mobile Table */}
        <div className="w-[92vw] overflow-x-auto scrollbar-hide mb-[20vw]">
          {isClient && <Table selectedStrand={selectedStrand} students={dashboardData.students} />}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block p-6 bg-[#F6E8D6] text-black">
        <div className="text-sm mb-8 mt-5" style={{ color: "#1D8E42" }}>
          Hello! Had you have your coffee?
        </div>

        <div className="flex flex-col gap-12 mb-12">
          <div className="flex gap-12">
            {/* Desktop Stats */}
            <div className="flex-1">
              <div className="grid grid-cols-4 gap-12 w-full">
                {statCardData.map((stat, index) => (
                  <StatCard
                    key={index}
                    value={stat.value}
                    total={stat.total}
                    label={stat.label}
                    statStyle={{ fontFamily: "Anton-Regular" }}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Metrics */}
            <div className="flex-1 pt-4">
              {uniqueStrands.map((strand) => (
                <MetricBar
                  key={strand}
                  label={strand}
                  value={strandMetrics[strand]}
                  max={dashboardData.totals.total_students}
                />
              ))}
              <div className="text-xs" style={{ color: "#1D8E42" }}>
                Strand Distribution
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {["ALL", ...uniqueStrands].map((item) => (
              <button
                key={item}
                onClick={() => handleStrandFilter(item)}
                className={`px-6 py-2 text-xs rounded-full border ${
                  selectedStrand === item
                    ? "bg-[#4CE147]"
                    : "bg-[#1D8E42]"
                } text-white border-[#1D8E42] hover:bg-[#4CE147]`}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="px-6 py-2 text-sm text-white rounded-full bg-[#1D8E42] hover:bg-[#4CE147]">
            ADD ATTENDEE
          </button>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto mb-4">
          {isClient && <Table selectedStrand={selectedStrand} students={dashboardData.students} />}
        </div>
      </div>
    </>
  );
};

export default Dashboard;