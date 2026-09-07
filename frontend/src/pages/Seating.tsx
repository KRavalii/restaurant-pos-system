import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type TableStatus = "Available" | "Occupied" | "Reserved";

type RestaurantTable = {
  id: number;
  name: string;
  seats: number;
  status: TableStatus;
  area: string;
};

const areas = ["Window Area", "Main Dining", "Patio"];

function Seating() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/tables`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tables");
        }

        const data = await response.json();
        setTables(data);
      } catch (error) {
        console.error("Fetch tables error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  const getNextStatus = (status: TableStatus): TableStatus => {
    if (status === "Available") {
      return "Occupied";
    }

    if (status === "Occupied") {
      return "Reserved";
    }

    return "Available";
  };

  const updateTableStatus = async (table: RestaurantTable) => {
    const newStatus = getNextStatus(table.status);

    try {
      const response = await fetch(
        `${API_URL}/api/tables/${table.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update table");
      }

      setTables((prevTables) =>
        prevTables.map((item) =>
          item.id === table.id
            ? { ...item, status: newStatus }
            : item
        )
      );
    } catch (error) {
      console.error("Update table error:", error);
    }
  };

  const getStatusStyle = (status: TableStatus) => {
    if (status === "Available") {
      return "bg-green-100 border-green-300 text-green-700";
    }

    if (status === "Occupied") {
      return "bg-red-100 border-red-300 text-red-600";
    }

    return "bg-yellow-100 border-yellow-300 text-yellow-700";
  };

  return (
    <div className="flex bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#7c5cff]">
            Restaurant Seating
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage restaurant table availability
          </p>
        </div>

        <div className="flex gap-6 bg-white p-4 rounded-2xl shadow-sm mb-8">
          <span className="text-green-600 font-semibold">
            ● Available
          </span>

          <span className="text-red-500 font-semibold">
            ● Occupied
          </span>

          <span className="text-yellow-600 font-semibold">
            ● Reserved
          </span>
        </div>

        {loading ? (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              Loading restaurant tables...
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {areas.map((area) => (
              <section
                key={area}
                className="bg-white rounded-3xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold text-[#2d1b69] mb-6">
                  {area}
                </h2>

                <div className="grid grid-cols-3 gap-6">
                  {tables
                    .filter((table) => table.area === area)
                    .map((table) => (
                      <button
                        key={table.id}
                        onClick={() => updateTableStatus(table)}
                        className={`border-2 rounded-3xl p-6 min-h-[160px]
                          hover:scale-105 transition-all duration-300
                          ${getStatusStyle(table.status)}`}
                      >
                        <div className="text-3xl font-bold">
                          {table.name}
                        </div>

                        <div className="mt-3">
                          {table.seats} Seats
                        </div>

                        <div className="mt-2 font-semibold">
                          {table.status}
                        </div>

                        <div className="text-xs mt-4 opacity-70">
                          Click to change status
                        </div>
                      </button>
                    ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Seating;