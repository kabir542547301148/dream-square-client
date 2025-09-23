
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaDollarSign,
  FaHourglassHalf,
  FaUser,
  FaUsers,
  FaStar,
  FaUserShield,
  FaHeart,
} from 'react-icons/fa';
import useUserRole from '../hooks/useUserRole';

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-red-600 text-white shadow-lg lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
         <Link to="/">

          <div className="flex-1 px-2 text-lg font-semibold text-center">Dashboard</div>

         </Link>
        </div>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 space-y-2">
          {/* Dashboard Header */}
          <Link to="/" className="mb-4">
            <div className="text-center text-red-600 font-bold text-xl p-2 border-b border-gray-300">
              Dashboard
            </div>
          </Link>

          {/* User */}
          {!roleLoading && role === 'user' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/my-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaUser /> My Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/wishlist"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaHeart /> Wishlist
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/property-bought"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaHome /> Property Bought
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-reviews"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaStar /> My Reviews
                </NavLink>
              </li>
            </>
          )}

          {/* Agent */}
          {!roleLoading && role === 'agent' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/agent-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaUser /> Agent Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/add-property"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaBoxOpen /> Add Property
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-properties"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaClipboardList /> My Added Properties
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/sold-properties"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaDollarSign /> My Sold Properties
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/requested-properties"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaHourglassHalf /> Requested Properties
                </NavLink>
              </li>
            </>
          )}

          {/* Admin */}
          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaUserShield /> Admin Profile
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaUsers /> Manage Users
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-properties"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaHome /> Manage Properties
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/manage-reviews"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-red-600 text-white' : 'hover:bg-red-100'
                    }`
                  }
                >
                  <FaStar /> Manage Reviews
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;



