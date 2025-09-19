import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";


import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FancyLoading from "../Shared/FancyLoading/FancyLoading";

const RequestedProperties = () => {
  const { user } = useAuth();
  const instance = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch offers for properties owned by the agent
  const { data: offers = [], isLoading, isError } = useQuery({
    queryKey: ["requested-offers", user?.email],
    queryFn: async () => {
      const { data } = await instance.get(`/offers/agent/${user.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Accept mutation
  const acceptMutation = useMutation({
    mutationFn: async (id) => {
      return await instance.patch(`/offers/${id}/accept`);
    },
    onSuccess: () => {
      Swal.fire("Accepted!", "Offer has been accepted.", "success");
      queryClient.invalidateQueries(["requested-offers", user?.email]);
    },
  });

  // Reject mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return await instance.patch(`/offers/${id}/reject`);
    },
    onSuccess: () => {
      Swal.fire("Rejected!", "Offer has been rejected.", "info");
      queryClient.invalidateQueries(["requested-offers", user?.email]);
    },
  });

  if (isLoading) return <FancyLoading />;
  if (isError) return <p className="text-center text-red-500">Failed to load offers</p>;

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-orange-400">Requested / Offered Properties</h2>
      <div className="overflow-x-auto bg-gray-900 rounded-lg shadow-lg">
        <table className="table-auto w-full text-left text-gray-200">
          <thead className="bg-gray-800 text-gray-300">
            <tr>
              <th className="px-4 py-2">Property Title</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Buyer Email</th>
              <th className="px-4 py-2">Buyer Name</th>
              <th className="px-4 py-2">Offered Price</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="border-b border-gray-700">
                <td className="px-4 py-2">{offer.title}</td>
                <td className="px-4 py-2">{offer.location}</td>
                <td className="px-4 py-2">{offer.buyerEmail}</td>
                <td className="px-4 py-2">{offer.buyerName}</td>
                <td className="px-4 py-2">${offer.offerAmount}</td>
                <td className="px-4 py-2 font-semibold">
                  {offer.status === "pending" && (
                    <span className="text-yellow-400">Pending</span>
                  )}
                  {offer.status === "accepted" && (
                    <span className="text-green-400">Accepted</span>
                  )}
                  {offer.status === "rejected" && (
                    <span className="text-red-400">Rejected</span>
                  )}
                </td>
                <td className="px-4 py-2">
                  {offer.status === "pending" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptMutation.mutate(offer._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectMutation.mutate(offer._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {(offer.status === "accepted" || offer.status === "rejected") && (
                    <span className="italic text-gray-400">No Action</span>
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

export default RequestedProperties;
