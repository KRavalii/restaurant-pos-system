import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type DashboardData = {
  totalOrders: number;
  totalRevenue: number;
  totalMenuItems: number;
  lowStockItems: number;
};

function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0,
    lowStockItems: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/dashboard`);

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 w-full min-w-0 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#7c5cff] mb-6 md:mb-8">
          Dashboard
        </h1>

        {loading ? (
          <div className="bg-white p-5 md:p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              Loading dashboard...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">

            <div className="bg-[#f3e8ff] p-5 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full border border-[#d8b4fe]">
              <h2 className="text-gray-500 font-medium">
                Total Revenue
              </h2>

              <p className="text-4xl md:text-5xl font-bold text-[#7c5cff] mt-4 break-words">
                ${dashboardData.totalRevenue.toFixed(2)}
              </p>
            </div>

            <div className="bg-[#ede9fe] p-5 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full border border-[#c4b5fd]">
              <h2 className="text-gray-500 font-medium">
                Total Orders
              </h2>

              <p className="text-4xl md:text-5xl font-bold text-[#7c5cff] mt-4">
                {dashboardData.totalOrders}
              </p>
            </div>

            <div className="bg-[#fae8ff] p-5 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full border border-pink-200">
              <h2 className="text-gray-500 font-medium">
                Menu Items
              </h2>

              <p className="text-4xl md:text-5xl font-bold text-pink-500 mt-4">
                {dashboardData.totalMenuItems}
              </p>
            </div>

            <div className="bg-[#dbeafe] p-5 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 w-full border border-blue-200">
              <h2 className="text-gray-500 font-medium">
                Low Stock Items
              </h2>

              <p className="text-4xl md:text-5xl font-bold text-blue-600 mt-4">
                {dashboardData.lowStockItems}
              </p>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;