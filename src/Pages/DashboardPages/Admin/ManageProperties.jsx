import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // ✅ using your hook

const ManageProperties = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ✅ Fetch properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/properties");
      return res.data;
    },
  });

  // ✅ Update property status (verify/reject)
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return await axiosSecure.patch(`/properties/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
  });

  if (isLoading) return <p>Loading properties...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Properties</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="">
              <th>Title</th>
              <th>Location</th>
              <th>Agent Name</th>
              <th>Agent Email</th>
              <th>Min Price </th>
              <th>Max Price </th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id}>
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.agentName}</td>
                <td>{property.agentEmail}</td>
                <td>{property.minPrice}</td>
                <td>{property.maxPrice}</td>
                <td className="font-semibold capitalize">
                  {property.status || "pending"}
                </td>
                <td>
                  {property.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          updateMutation.mutate({ id: property._id, status: "verified" })
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() =>
                          updateMutation.mutate({ id: property._id, status: "rejected" })
                        }
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded text-white ${
                        property.status === "verified" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {property.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;
