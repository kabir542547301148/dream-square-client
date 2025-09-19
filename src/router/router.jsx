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
import AgentRoute from "../Contexts/AgentRoute";
import PropertyDetails from "../Pages/AllProperties/PropertyDetails";
import WishList from "../Pages/DashboardPages/User/WishList";
import BoughtProperties from "../Pages/DashboardPages/User/BoughtProperties ";
import MyReviews from "../Pages/DashboardPages/User/MyReviews";



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
      {
        path: "/properties-details/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
      },
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
        Component: WishList,
      },
      {
        path: "/dashboard/property-bought",
        Component: BoughtProperties,
      },
      {
        path: "/dashboard/my-reviews",
        Component: MyReviews,
      },





      // agent
      {
        path:'/dashboard/agent-profile',
        element:<AgentRoute>
          <AgentProfile></AgentProfile>
          </AgentRoute>
      },
      {
        path:'/dashboard/my-properties',
        element:<AgentRoute>
          <MyProperties></MyProperties>
          </AgentRoute>
      },
      {
        path:'/dashboard/add-property',
        element:<AgentRoute>
          <AddProperty></AddProperty>
          </AgentRoute>
        
      },
      {
        path: '/dashboard/update-property/:id',
        element:<AgentRoute>
          <UpdateProperty></UpdateProperty>
          </AgentRoute>
      },
      {
        path: '/dashboard/requested-properties',
       element:<AgentRoute>
          <RequestedProperties></RequestedProperties>
          </AgentRoute>
      },
      {
        path: '/dashboard/sold-properties',
       element:<AgentRoute>
          <SoldProperties></SoldProperties>
          </AgentRoute>
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