import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const cart: CartItem[] = location.state?.cart || [];

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          totalAmount: total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      alert(`Order placed successfully! Order ID: ${data.orderId}`);

      navigate("/orders");
    } catch (error) {
      console.error("Place order error:", error);

      alert("Unable to place order");
    }
  };

  return (
    <div className="flex bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-[#7c5cff] mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-2 gap-8">
          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-400">
                  No items in cart
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>

                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t mt-6 pt-4 space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-[#7c5cff]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* PAYMENT SECTION */}
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Payment Method
            </h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                <span>Card</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                />
                <span>Cash</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                />
                <span>Mobile Payment</span>
              </label>
            </div>

            <button
              onClick={placeOrder}
              disabled={cart.length === 0}
              className="mt-8 bg-[#7c5cff] hover:bg-[#6d28d9] disabled:bg-gray-300 text-white w-full py-3 rounded-xl font-semibold"
            >
              Place Order
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;