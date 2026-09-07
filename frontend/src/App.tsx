import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import Inventory from "./pages/Inventory";
import Seating from "./pages/Seating";

// function App() {
//   return(
//     <div className="bg-[#f6f1ff] text-[#2d1b69] min-h-screen flex items-center justify-center">
//       <h1 className="text-5x1 font-bold">Restaurant POS System</h1>
//     </div>
//   );
// }
// export default App

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/seating" element={<Seating />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;