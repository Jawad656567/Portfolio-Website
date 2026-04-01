import React, { useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import {Image,User, FileText,Star,FolderKanban,GraduationCap,Briefcase,Code, Mail,LogOut} from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";
import { SiEdgeimpulse, SiEducative } from "react-icons/si";

export default function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { path: "banner", label: "Banner", icon: Image },
    { path: "profile", label: "Profile Info", icon: User },
    { path: "about", label: "About", icon: FileText },
    { path: "featured", label: "Featured", icon: Star },
    { path: "projects", label: "Projects", icon: FolderKanban   },
    { path: "education", label: "Education", icon: GraduationCap  },
    { path: "experience", label: "Experience", icon: Briefcase  },
    { path: "skill", label: "Skill", icon: Code  },
    { path: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="flex h-screen bg-white text-black">
      {/* Desktop Sidebar */}
      <div
        className={`hidden sm:flex flex-col ${
          sidebarOpen ? "w-64" : "w-20"
        } bg-black text-white transition-all duration-300 p-4 shadow-lg justify-between`}
      >
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h1 className="text-2xl font-bold">Admin</h1>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-white text-black font-semibold"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 w-full bg-black hover:bg-gray-800 py-3 px-4 rounded-lg text-white font-medium transition-shadow shadow-md"
        >
          <LogOut size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-black text-white backdrop-blur-md transition-transform duration-300 sm:hidden ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileMenuOpen(false)}>
            <FaTimes size={24} />
          </button>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-200 ${
                isActive(path)
                  ? "bg-white text-black font-semibold"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-6 py-3 rounded-lg bg-black hover:bg-gray-800 text-white font-medium mt-4"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-white text-black">
        <div className="flex items-center justify-between bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            className="sm:hidden p-2 rounded-lg bg-white shadow hover:shadow-md transition duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
}