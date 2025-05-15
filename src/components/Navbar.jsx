import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLightbulb } from "react-icons/fa"; // Import bulb icon

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-center shadow-lg">
      {/* Logo with bulb */}
      <h1 className="text-3xl font-extrabold flex items-center gap-3">
        <FaLightbulb className="text-yellow-400 animate-pulse drop-shadow-lg text-3xl" />
        <span className="text-white">EduVance</span>
      </h1>

      {/* Navigation links */}
      <ul className="flex gap-6 items-center font-medium">
        <li>
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/browse"
            className="text-white hover:text-yellow-300 transition duration-300"
          >
            Browse Courses
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link
                to="/dashboard"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white hover:text-yellow-300 transition duration-300"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
