import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Functions
  const makeAdmin = async (id) => {
    await axiosSecure.patch(`/users/admin/${id}`);
    Swal.fire("Updated!", "User is now an Admin.", "success");
    refetch();
  };

  const makeAgent = async (id) => {
    await axiosSecure.patch(`/users/agent/${id}`);
    Swal.fire("Updated!", "User is now an Agent.", "success");
    refetch();
  };

  const markFraud = async (id) => {
    await axiosSecure.patch(`/users/fraud/${id}`);
    Swal.fire(
      "Marked!",
      "Agent marked as fraud and their properties removed.",
      "warning"
    );
    refetch();
  };

  const deleteUser = async (id, email) => {
    await axiosSecure.delete(`/users/${id}`, { data: { email } });
    Swal.fire("Deleted!", "User removed from system.", "success");
    refetch();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Current Role</th> {/* ✅ New column */}
              <th>Actions</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id} className="border-t">
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`px-3 py-1 rounded font-semibold ${
                      user.role === "admin"
                        ? "bg-green-200 text-green-700"
                        : user.role === "agent"
                        ? "bg-blue-200 text-blue-700"
                        : user.role === "fraud"
                        ? "bg-red-200 text-red-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  {user.role === "fraud" ? (
                    <span className="px-3 py-1 rounded bg-red-200 text-red-700 font-semibold">
                      Fraud
                    </span>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-success mr-2"
                        onClick={() => makeAdmin(user._id)}
                        disabled={user.role === "admin"}
                      >
                        {user.role === "admin" ? "Admin" : "Make Admin"}
                      </button>

                      <button
                        className="btn btn-xs btn-info mr-2"
                        onClick={() => makeAgent(user._id)}
                        disabled={user.role === "agent"}
                      >
                        {user.role === "agent" ? "Agent" : "Make Agent"}
                      </button>

                      {user.role === "agent" && (
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => markFraud(user._id)}
                        >
                          Mark Fraud
                        </button>
                      )}
                    </>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteUser(user._id, user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;



