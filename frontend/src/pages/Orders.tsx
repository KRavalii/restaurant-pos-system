import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type OrderItem = {
  id: number;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: number;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/api/orders`);

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();

        setOrders(data);
      } catch (error) {
        console.error("Orders error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="flex bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-[#7c5cff] mb-8">
          Orders
        </h1>

        {loading ? (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              Loading orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <p className="text-gray-400">
              No orders placed yet.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-3xl shadow-md"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold">
                      Order #{order.id}
                    </h2>

                    <p className="text-sm text-gray-400">
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  <span className="bg-[#e9ddff] text-[#7c5cff] px-4 py-2 rounded-full font-semibold">
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>

                      <span>
                        $
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t mt-5 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>

                    <span className="text-[#7c5cff]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;