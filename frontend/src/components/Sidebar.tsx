import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Menu", path: "/menu" },
    { name: "Orders", path: "/orders" },
    { name: "Checkout", path: "/checkout" },
    { name: "Inventory", path: "/inventory" },
    { name: "Seating", path: "/seating" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-full md:w-64 bg-white md:min-h-screen p-4 md:p-6 shadow-lg">
      <h2 className="text-2xl md:text-3xl font-bold text-[#7c5cff] mb-4 md:mb-10">
        Restaurant POS
      </h2>

      <nav className="grid grid-cols-2 gap-2 md:block md:space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block text-center md:text-left px-3 md:px-5 py-3 rounded-2xl transition-all duration-300 font-medium
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

      <button
        onClick={handleLogout}
        className="w-full mt-4 md:mt-8 px-3 md:px-5 py-3 rounded-2xl font-medium bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;