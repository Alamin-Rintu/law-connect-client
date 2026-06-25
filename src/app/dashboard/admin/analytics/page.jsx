"use client";

import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserTie,
  FaHandshake,
  FaMoneyCheckAlt,
  FaDollarSign,
} from "react-icons/fa";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAnalytics = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/analytics`
        );
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const chartData = [
    { name: "Clients", value: analytics?.totalClients || 0 },
    { name: "Lawyers", value: analytics?.totalLawyers || 0 },
    { name: "Hire Requests", value: analytics?.totalHireRequests || 0 },
    { name: "Payments", value: analytics?.totalPayments || 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
          Analytics Dashboard
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Overview of your platform
        </p>
      </div>

      {/* Grid Cards - Handles Mobile, Tablet, Small Laptop, and Desktop smoothly */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
        {/* Card: Clients */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Clients</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {analytics?.totalClients || 0}
            </h2>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <FaUsers className="text-2xl sm:text-3xl text-blue-500" />
          </div>
        </div>

        {/* Card: Lawyers */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Lawyers</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {analytics?.totalLawyers || 0}
            </h2>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <FaUserTie className="text-2xl sm:text-3xl text-green-500" />
          </div>
        </div>

        {/* Card: Hire Requests */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Hire Requests</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {analytics?.totalHireRequests || 0}
            </h2>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            <FaHandshake className="text-2xl sm:text-3xl text-yellow-500" />
          </div>
        </div>

        {/* Card: Payments */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-gray-500">Payments</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
              {analytics?.totalPayments || 0}
            </h2>
          </div>
          <div className="p-3 bg-red-50 rounded-xl">
            <FaMoneyCheckAlt className="text-2xl sm:text-3xl text-red-500" />
          </div>
        </div>

        {/* Card: Revenue */}
        <div className="bg-white rounded-2xl shadow-sm border p-5 flex justify-between items-center sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <div>
            <p className="text-sm font-medium text-gray-500">Revenue</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
              ${analytics?.totalRevenue || 0}
            </h2>
          </div>
          <div className="p-3 bg-green-50 rounded-xl">
            <FaDollarSign className="text-2xl sm:text-3xl text-green-600" />
          </div>
        </div>
      </div>

      {/* Pie Chart Container */}
      <div className="bg-white rounded-2xl shadow-sm border p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
          Platform Distribution
        </h2>

        {/* Responsive chart wrapper: adapts height slightly for smaller screens */}
        <div className="h-[300px] sm:h-[400px] md:h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="40%" // Changed to a donut style for cleaner mobile viewing
                outerRadius="75%"
                paddingAngle={2}
                label={({ name, percent }) =>
                  window.innerWidth > 640 
                    ? `${name} ${(percent * 100).toFixed(0)}%` 
                    : `${(percent * 100).toFixed(0)}%` // Cleaner label logic for small screens
                }
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                verticalAlign="bottom" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;