import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="bg-[#f6f1ff] min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[400px]">
        <h1 className="text-4xl font-bold text-[#7c5cff] text-center">
          Restaurant POS
        </h1>

        <p className="text-gray-500 text-center mt-3">
          Smart POS for your restaurant
        </p>

        <div className="mt-8">
          <input
            type="email"
            placeholder="Enter email"
            className="w-full border border-gray-200 p-3 rounded-xl mb-4"
          />

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border border-gray-200 p-3 rounded-xl"
          />

          <button
            onClick={handleLogin}
            className="bg-[#a78bfa] hover:bg-[#8b5cf6] text-white w-full py-3 rounded-xl mt-6"
          >
            Login
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
              Demo Mode — enter any email and password to continue
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;