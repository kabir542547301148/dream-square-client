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
  console.log("🚀 ~ DashBoardLayout ~ role:", role)

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
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
          <div className="mx-2 flex-1 px-2 text-red-600">Dashboard</div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}

      <div className="drawer-side">

        <Link to="/">
          <div className="mx-2 flex-1 px-2 text-red-600 text-center flex justify-center">Dashboard</div>
        </Link>

        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 space-y-2">


          {/* user */}


         {!roleLoading && role === 'user' &&
          <>

           <li>
            <NavLink
              to="/dashboard/my-profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/wishlist"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
              }
            >
              <FaHeart /> Wishlist
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/property-bought"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
              }
            >
              <FaHome /> Property Bought
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-reviews"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
              }
            >
              <FaStar /> My Reviews
            </NavLink>
          </li>
          
          </>
         }



          {/* agent */}
          {!roleLoading && role === 'agent' &&



            <>

              <li>
                <NavLink
                  to="/dashboard/agent-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? 'bg-gray-300' : ''
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? 'bg-gray-300' : ''
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? 'bg-gray-300' : ''
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? 'bg-gray-300' : ''
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? 'bg-gray-300' : ''
                    }`
                  }
                >
                  <FaHourglassHalf /> Requested Properties
                </NavLink>
              </li>

            </>



          }


          {/* admin related button */}



          {!roleLoading && role === 'admin' &&

            <>


              <li>
                <NavLink
                  to="/dashboard/admin-profile"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
                  }
                >
                  <FaUserShield /> Admin Profile
                </NavLink>
              </li>


              <li>
                <NavLink
                  to="/dashboard/manage-users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""
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
                    `flex items-center gap-2 px-4 py-2 rounded-md ${isActive ? "bg-gray-300" : ""}`
                  }
                >
                  <FaStar /> Manage Reviews
                </NavLink>
              </li>

            </>
          }


        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;




