import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const API_URL = import.meta.env.VITE_API_URL;

type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  available: number;
};

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function Menu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // FETCH MENU ITEMS
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu`);
        const data = await response.json();

        const formattedMenu = data.map((item: MenuItem) => ({
          ...item,
          price: Number(item.price),
        }));

        setMenuItems(formattedMenu);
      } catch (error) {
        console.error("Failed to load menu:", error);
      }
    };

    fetchMenu();
  }, []);

  // ADD MENU ITEM
  const handleAddMenuItem = async () => {
    try {
      if (!name || !price || !category) {
        alert("Please enter item name, price, and category");
        return;
      }

      const response = await fetch(`${API_URL}/api/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          category,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add menu item");
      }

      setName("");
      setPrice("");
      setCategory("");

      // Reload menu items
      const menuResponse = await fetch(`${API_URL}/api/menu`);
      const data = await menuResponse.json();

      const formattedMenu = data.map((item: MenuItem) => ({
        ...item,
        price: Number(item.price),
      }));

      setMenuItems(formattedMenu);
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  // DELETE MENU ITEM
  const handleDeleteMenuItem = async (id: number) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this menu item?"
      );

      if (!confirmDelete) {
        return;
      }

      const response = await fetch(`${API_URL}/api/menu/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete menu item");
      }

      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );

      // Also remove it from cart if it was already added
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

const startEditing = (item: MenuItem) => {
  setEditingId(item.id);
  setEditName(item.name);
  setEditPrice(String(item.price));
  setEditCategory(item.category);
};

const cancelEditing = () => {
  setEditingId(null);
  setEditName("");
  setEditPrice("");
  setEditCategory("");
};

const handleUpdateMenuItem = async (id: number) => {
  try {
    const response = await fetch(
       `${API_URL}/api/menu/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editName,
          price: Number(editPrice),
          category: editCategory,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update menu item");
    }

    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name: editName,
              price: Number(editPrice),
              category: editCategory,
            }
          : item
      )
    );

    cancelEditing();
  } catch (error) {
    console.error("Error updating menu item:", error);
  }
};

  // ADD ITEM TO CART
  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
        },
      ]);
    }
  };

  // INCREASE CART QUANTITY
  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE CART QUANTITY
  const decreaseQuantity = (id: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f6f1ff] min-h-screen">
      <Sidebar />

      <main className="flex-1 w-full min-w-0 p-4 md:p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#7c5cff] mb-6 md:mb-8">
          Menu
        </h1>

        {/* ADD MENU ITEM FORM */}
        <div className="bg-white p-6 rounded-3xl shadow-md mb-8">
          <h2 className="text-2xl font-bold text-[#7c5cff] mb-4">
            Add Menu Item
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3"
            />
          </div>

          <button
            onClick={handleAddMenuItem}
            className="mt-4 w-full md:w-auto bg-[#7c5cff] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6b4fe0]"
          >
            Add Item
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch lg:items-start">
          {/* MENU ITEMS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 flex-1 min-w-0 w-full">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {editingId === item.id ? (
  <div className="space-y-3">
    <input
      type="text"
      value={editName}
      onChange={(e) => setEditName(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-2 w-full"
    />

    <input
      type="number"
      value={editPrice}
      onChange={(e) => setEditPrice(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-2 w-full"
    />

    <input
      type="text"
      value={editCategory}
      onChange={(e) => setEditCategory(e.target.value)}
      className="border border-gray-300 rounded-xl px-4 py-2 w-full"
    />

    <div className="flex gap-3">
      <button
        onClick={() => handleUpdateMenuItem(item.id)}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
      >
        Save
      </button>

      <button
        onClick={cancelEditing}
        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-xl"
      >
        Cancel
      </button>
    </div>
  </div>
) : (
  <>
    <p className="text-sm text-gray-400">
      {item.category}
    </p>

    <h2 className="text-xl font-bold mt-2">
      {item.name}
    </h2>

    <p className="text-2xl font-bold text-[#7c5cff] mt-4">
      ${item.price.toFixed(2)}
    </p>
  </>
)}

                <button
                  onClick={() => addToCart(item)}
                  className="mt-5 bg-[#a78bfa] hover:bg-[#8b5cf6] text-white w-full py-3 rounded-xl"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() => startEditing(item)}
                  className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white w-full py-3 rounded-xl"
                >
                  Edit
                  </button>

                <button
                  onClick={() => handleDeleteMenuItem(item.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white w-full py-3 rounded-xl"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* CART */}
          <div className="w-full lg:w-[350px] lg:flex-shrink-0 bg-white rounded-3xl p-4 md:p-6 shadow-lg h-fit">
            <h2 className="text-3xl font-bold text-[#7c5cff] mb-6">
              Cart
            </h2>

            {/* CART ITEMS */}
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p className="text-gray-400">
                  No items added
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#f6f1ff] p-4 rounded-2xl"
                  >
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-[#7c5cff] font-bold mt-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-[#e9ddff] px-3 py-1 rounded-lg text-[#7c5cff] font-bold"
                      >
                        -
                      </button>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-[#7c5cff] px-3 py-1 rounded-lg text-white font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* CART TOTAL */}
            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-[#7c5cff]">
                  $
                  {cart
                    .reduce(
                      (total, item) =>
                        total + item.price * item.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>

              {/* CHECKOUT BUTTON */}
              <button
                onClick={() =>
                  navigate("/checkout", {
                    state: { cart },
                  })
                }
                className="mt-5 bg-[#7c5cff] hover:bg-[#6d28d9] text-white w-full py-3 rounded-xl"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Menu;