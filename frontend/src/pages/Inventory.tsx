import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type InventoryItem = {
  id: number;
  name: string;
  stock: number;
  unit: string;
  reorder_level: number;
};

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch( `${API_URL}/api/inventory`);

        if (!response.ok) {
          throw new Error("Failed to fetch inventory");
        }

        const data = await response.json();

        setInventoryItems(data);
      } catch (error) {
        console.error("Inventory fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const updateStock = async (id: number, newStock: number) => {
    try {
      const response = await fetch(
         `${API_URL}/api/inventory/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: newStock,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update inventory");
      }

      setInventoryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? { ...item, stock: newStock }
            : item
        )
      );
    } catch (error) {
      console.error("Inventory update error:", error);
    }
  };

  const increaseStock = (item: InventoryItem) => {
    updateStock(item.id, item.stock + 1);
  };

  const decreaseStock = (item: InventoryItem) => {
    if (item.stock <= 0) {
      return;
    }

    updateStock(item.id, item.stock - 1);
  };

  const getStatus = (item: InventoryItem) => {
    if (item.stock === 0) {
      return "Out of Stock";
    }

    if (item.stock <= item.reorder_level) {
      return "Low Stock";
    }

    return "In Stock";
  };

  const getStatusStyle = (item: InventoryItem) => {
    if (item.stock === 0) {
      return "bg-gray-200 text-gray-600";
    }

    if (item.stock <= item.reorder_level) {
      return "bg-red-100 text-red-500";
    }

    return "bg-green-100 text-green-600";
  };

  return (
    <div className="flex bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-[#7c5cff] mb-2">
          Inventory
        </h1>

        <p className="text-gray-500 mb-8">
          Manage restaurant ingredients and stock levels
        </p>

        {loading ? (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              Loading inventory...
            </p>
          </div>
        ) : inventoryItems.length === 0 ? (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              No inventory items found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {inventoryItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-3xl shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Stock: {item.stock} {item.unit}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      Reorder level: {item.reorder_level}{" "}
                      {item.unit}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyle(
                      item
                    )}`}
                  >
                    {getStatus(item)}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={() => decreaseStock(item)}
                    disabled={item.stock === 0}
                    className="bg-[#e9ddff] disabled:bg-gray-200 disabled:text-gray-400 text-[#7c5cff] px-4 py-2 rounded-xl font-bold"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">
                    {item.stock}
                  </span>

                  <button
                    onClick={() => increaseStock(item)}
                    className="bg-[#7c5cff] text-white px-4 py-2 rounded-xl font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Inventory;