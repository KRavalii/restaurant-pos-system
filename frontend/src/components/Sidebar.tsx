import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Menu", path: "/menu" },
    { name: "Orders", path: "/orders" },
    { name: "Checkout", path: "/checkout" },
    { name: "Inventory", path: "/inventory" },
    { name: "Seating", path: "/seating" },
  ];

  return (
    <div className="w-64 bg-white min-h-screen p-6 shadow-lg">
      <h2 className="text-3xl font-bold text-[#7c5cff] mb-10">
        Restaurant POS
      </h2>

      <nav className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-5 py-3 rounded-2xl transition-all duration-300 font-medium
                ${
                  isActive
                    ? "bg-[#a78bfa] text-white shadow-md"
                    : "bg-[#f6f1ff] text-[#7c5cff] hover:bg-[#c4b5fd] hover:text-white"
                }
              `}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default Sidebar;