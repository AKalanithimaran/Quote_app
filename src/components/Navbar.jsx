// components/Navbar.jsx
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4 flex gap-6 justify-center">
    <Link to="/">Home</Link>
    <Link to="/liked">Liked</Link>
    <Link to="/admin">Admin</Link>
  </nav>
);

export default Navbar;
