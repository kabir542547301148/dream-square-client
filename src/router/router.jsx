import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import BlogSection from "../Pages/BlogSection/BlogSection";
import Login from "../Pages/Shared/Login/Login";
import Register from "../Pages/Shared/Register/Register";
import PrivateRoute from "../Contexts/PrivateRoute";
import AllProperties from "../Pages/AllProperties/AllProperties";
import DashboardLayout from "../layouts/DashboardLayout";
import MyProperties from "../Pages/DashboardPages/MyProperties";
import AddProperty from "../Pages/DashboardPages/AddProperty";
import UpdateProperty from "../Pages/DashboardPages/UpdateProperty";
import RequestedProperties from "../Pages/DashboardPages/RequestedProperties";
import SoldProperties from "../Pages/DashboardPages/SoldProperties";
import ManageUsers from "../Pages/DashboardPages/Admin/ManageUsers";
import ManageReviews from "../Pages/DashboardPages/Admin/ManageReviews";
import ManageProperties from "../Pages/DashboardPages/Admin/ManageProperties";
import AdminProfile from "../Pages/DashboardPages/Admin/AdminProfile";
import AgentProfile from "../Pages/DashboardPages/AgentProfile";
import MyProfile from "../Pages/DashboardPages/User/MyProfile";
import Forbidden from "../Pages/Shared/Forbidden";
import AdminRoute from "../Contexts/AdminRoute";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
        path: "/properties",
        element: (
          <PrivateRoute>
            <AllProperties></AllProperties>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/property-details/:id",
      //   element: (
      //     <PrivateRoute>
      //       <PropertyDetails></PropertyDetails>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/blog",
        Component: BlogSection,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/contact-us",
        Component: ContactUs,
      },
      {
        path: "/forbidden",
        Component: Forbidden
      },
    ],

   
  },

  {
    path: '/dashboard',
    element: <PrivateRoute>
      <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children: [


      // user

      {
        path: "/dashboard/my-profile",
        Component: MyProfile
      },
      {
        path: "/dashboard/wishlist",
        Component: MyProfile
      },
      {
        path: "/dashboard/property-bought",
        Component: MyProfile
      },
      {
        path: "/dashboard/my-reviews",
        Component: MyProfile
      },





      // agent
      {
        path:'/dashboard/agent-profile',
        Component: AgentProfile
      },
      {
        path:'/dashboard/my-properties',
        Component: MyProperties
      },
      {
        path:'/dashboard/add-property',
        Component: AddProperty
        
      },
      {
        path: '/dashboard/update-property/:id',
        Component: UpdateProperty
      },
      {
        path: '/dashboard/requested-properties',
        Component: RequestedProperties
      },
      {
        path: '/dashboard/sold-properties',
        Component: SoldProperties
      },

      // admin


      {
        path: '/dashboard/admin-profile',
         element: <AdminRoute>
        <AdminProfile></AdminProfile>
        </AdminRoute>
      },
      {
        path: '/dashboard/manage-users',
      element: <AdminRoute>
        <ManageUsers></ManageUsers>
        </AdminRoute>
      },
      {
        path: '/dashboard/manage-reviews',
         element: <AdminRoute>
        <ManageReviews></ManageReviews>
        </AdminRoute>
      },
    
    {
      path: '/dashboard/manage-properties',
     element: <AdminRoute>
        <ManageProperties></ManageProperties>
        </AdminRoute>
    },
  ]
  }
]);