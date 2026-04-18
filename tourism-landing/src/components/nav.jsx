import { Menu, X, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleMenu = () => {
    setOpen(!open);
  };

  // const handleDark = () => {
  //   const nextMode = !darkMode;
  //   setDarkMode(nextMode);
  //   document.documentElement.classList.toggle("dark", nextMode);
  // };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const Navs = [
    { id: 1, name: "Home", href: "#home" },
    { id: 2, name: "Destination", href: "#destination" },
    { id: 3, name: "Gallery", href: "#gallery" },
    { id: 4, name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="backdrop-blur-md bg-black/60 fixed top-0 w-full shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent">
          Ethiopia Tourism
        </h1>

        {/* desktop */}
        <ul className="hidden md:flex space-x-12">
          {Navs.map((nav) => (
            <li className="text-white" key={nav.id}>
              <Link to={nav.href} className="hover:text-[#FFA500]">
                {nav.name}
              </Link>
            </li>
          ))}

          {/* DASHBOARD only if logged in */}
          {user && (
            <li className="text-white">
              <Link to="/dashboard" className="hover:text-[#FFA500]">
                Dashboard
              </Link>
            </li>
          )}

          {/* LOGIN / LOGOUT */}
          {!user ? (
            <li className="text-white">
              <Link to="/signup" className="hover:text-[#FFA500]">
                Signup
              </Link>
            </li>
          ) : (
            <li className="text-red-400 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>

        {/* controls */}
        <div className="flex items-center gap-6">
          <button className="text-white md:hidden" onClick={handleMenu}>
            {open ? <X /> : <Menu />}
          </button>

          {/* <button onClick={handleDark} className="text-white">
            {darkMode ? <Moon /> : <Sun />}
          </button> */}
        </div>
      </div>

      {/* mobile */}
      {open && (
        <ul className="flex flex-col items-center gap-6 md:hidden py-6">
          {Navs.map((nav) => (
            <li className="text-white" key={nav.id}>
              <Link to={nav.href}>{nav.name}</Link>
            </li>
          ))}

          {user && (
            <li className="text-white">
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}

          {!user ? (
            <li className="text-white">
              <Link to="/signup">Signup</Link>
            </li>
          ) : (
            <li className="text-red-400" onClick={handleLogout}>
              Logout
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Nav;