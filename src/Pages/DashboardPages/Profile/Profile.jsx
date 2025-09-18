import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import MyProfile from "../User/MyProfile";
import AgentProfile from "../AgentProfile";
import AdminProfile from "../Admin/AdminProfile";
import Forbidden from "../../Shared/Foridden";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";


const Profile = () => {
  const { role, roleLoading } = useUserRole();

  if (roleLoading) {
    return <FancyLoading></FancyLoading>;
  }

  if (role === "user") {
    return <MyProfile></MyProfile>;
  } else if (role === "agent") {
    return <AgentProfile></AgentProfile>;
  } else if (role === "admin") {
    return <AdminProfile></AdminProfile>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default Profile;