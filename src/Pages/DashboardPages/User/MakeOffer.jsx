


// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import FancyLoading from "../../Shared/FancyLoading/FancyLoading";

// const MakeOffer = () => {
//     const { id } = useParams(); // propertyId from URL
//     const { user, role } = useAuth();
//     const instance = useAxiosSecure();
//     const navigate = useNavigate();
//     const [offerAmount, setOfferAmount] = useState("");
//     const [buyingDate, setBuyingDate] = useState("");



//     const {
//         data: property,
//         isLoading,
//         isError,
//     } = useQuery({
//         queryKey: ["property", id],
//         queryFn: async () => {
//             if (!id) return null; // ✅ safe guard
//             const { data } = await instance.get(`/properties/${id}`);
//             return data;
//         },
//         enabled: !!id, // ✅ only fetch if id exists
//     });

//     // ✅ Handle loading & error states
//     if (isLoading) return <FancyLoading />;
//     if (isError || !property) {
//         return (
//             <p className="text-center text-red-500 mt-10">
//                 Failed to load property details
//             </p>
//         );
//     }

//     // ✅ Offer Mutation


//     const offerMutation = useMutation({
//         mutationFn: async () => {
//             if (!user) throw new Error("User not logged in");
//             if (!offerAmount || Number(offerAmount) <= 0)
//                 throw new Error("Invalid offer amount");
//             if (!property) throw new Error("Property details are missing");

//             return await instance.post("/offers", {
//                 propertyId: id,
//                 title: property.title,
//                 location: property.location,
//                 agentName: property.agentName,
//                 offerAmount: Number(offerAmount),
//                 buyerEmail: user.email,
//                 buyerName: user.displayName,
//                 buyingDate,
//                 minPrice: property.minPrice,
//                 maxPrice: property.maxPrice,
//                 role,
//             });
//         },
//         onSuccess: () => {
//             Swal.fire("Success!", "Your offer has been submitted", "success");
//             navigate("/dashboard/property-bought");
//         },
//         onError: (err) => {
//             Swal.fire(
//                 "Error",
//                 err.response?.data?.message || err.message || "Could not submit offer",
//                 "error"
//             );
//         },
//     });




//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!offerAmount || !buyingDate) {
//             Swal.fire("Error", "Please fill all fields", "error");
//             return;
//         }
//         offerMutation.mutate();
//     };

//     return (
//         <div className="max-w-2xl mx-auto bg-gray-900 shadow-lg rounded-xl p-6 mt-10 text-gray-100">
//             <h2 className="text-2xl font-bold mb-6 text-orange-400">Make an Offer</h2>

//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Property Title */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Property Title</label>
//                     <input
//                         type="text"
//                         value={property?.title || ""}
//                         readOnly
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 {/* Location */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Location</label>
//                     <input
//                         type="text"
//                         value={property?.location || ""}
//                         readOnly
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 {/* Agent */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Agent</label>
//                     <input
//                         type="text"
//                         value={property?.agentName || ""}
//                         readOnly
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 {/* Offer Amount */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Offer Amount</label>
//                     <input
//                         type="number"
//                         value={offerAmount}
//                         onChange={(e) => setOfferAmount(e.target.value)}
//                         placeholder={`Enter between $${property?.minPrice} - $${property?.maxPrice}`}
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
//                     />
//                 </div>

//                 {/* Buyer Info */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Buyer Email</label>
//                     <input
//                         type="text"
//                         value={user?.email || ""}
//                         readOnly
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Buyer Name</label>
//                     <input
//                         type="text"
//                         value={user?.displayName || ""}
//                         readOnly
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 {/* Buying Date */}
//                 <div>
//                     <label className="block text-sm font-medium mb-1 text-gray-300">Buying Date</label>
//                     <input
//                         type="date"
//                         value={buyingDate}
//                         onChange={(e) => setBuyingDate(e.target.value)}
//                         className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
//                     />
//                 </div>

//                 {/* Submit */}
//                 <button
//                     type="submit"
//                     className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold"
//                 >
//                     Offer
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default MakeOffer;






import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import FancyLoading from "../../Shared/FancyLoading/FancyLoading";

const MakeOffer = () => {
    const { id } = useParams(); // propertyId from URL
    const { user, role } = useAuth();
    const instance = useAxiosSecure();
    const navigate = useNavigate();
    const [offerAmount, setOfferAmount] = useState("");
    const [buyingDate, setBuyingDate] = useState("");

    // Fetch property data
    const {
        data: property,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["property", id],
        queryFn: async () => {
            if (!id) return null;
            const { data } = await instance.get(`/properties/${id}`);
            return data;

        },
        enabled: !!id,
    });





    // Offer Mutation
    const offerMutation = useMutation({
        mutationFn: async () => {
            if (!user) throw new Error("User not logged in");
            if (!offerAmount || Number(offerAmount) <= 0)
                throw new Error("Invalid offer amount");
            if (!property) throw new Error("Property details are missing");

            return await instance.post("/offers", {
                propertyId: id,
                title: property.title,
                location: property.location,
                agentName: property.agentName,
                offerAmount: Number(offerAmount),
                buyerEmail: user.email,
                buyerName: user.displayName,
                buyingDate,
                minPrice: property.minPrice,
                maxPrice: property.maxPrice,
                role,
                image: property.image,
            });
        },
        onSuccess: () => {
            Swal.fire("Success!", "Your offer has been submitted", "success");
            navigate("/dashboard/property-bought");
        },
        onError: (err) => {
            Swal.fire(
                "Error",
                err.response?.data?.message || err.message || "Could not submit offer",
                "error"
            );
        },
    });

    console.log(user)


    if (isLoading) return <FancyLoading />;
    if (isError || !property) {
        return (
            <p className="text-center text-red-500 mt-10">
                Failed to load property details
            </p>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!offerAmount || !buyingDate) {
            Swal.fire("Error", "Please fill all fields", "error");
            return;
        }

        if (
            Number(offerAmount) < property.minPrice ||
            Number(offerAmount) > property.maxPrice
        ) {
            Swal.fire(
                "Error",
                `Offer must be between $${property.minPrice} and $${property.maxPrice}`,
                "error"
            );
            return;
        }

        offerMutation.mutate();
    };

    return (
        <div className="max-w-2xl mx-auto bg-gray-900 shadow-lg rounded-xl p-6 mt-10 text-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-orange-400">Make an Offer</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property Title */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Property Title
                    </label>
                    <input
                        type="text"
                        value={property?.title || ""}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>



                {/* Property Image */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Property Image
                    </label>
                    {property?.image ? (
                        <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-48 object-cover rounded-md border border-gray-700"
                        />
                    ) : (
                        <p className="text-gray-500 text-sm">No image available</p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Location
                    </label>
                    <input
                        type="text"
                        value={property?.location || ""}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>

                {/* Agent */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Agent
                    </label>
                    <input
                        type="text"
                        value={property?.agentName || ""}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>

                {/* Offer Amount */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Offer Amount
                    </label>
                    <input
                        type="number"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        placeholder={`Enter between $${property?.minPrice} - $${property?.maxPrice}`}
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-500"
                    />
                </div>

                {/* Buyer Info */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Buyer Email
                    </label>
                    <input
                        type="text"
                        value={user?.email || ""}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Buyer Name
                    </label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>

                {/* Buying Date */}
                <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                        Buying Date
                    </label>
                    <input
                        type="date"
                        value={buyingDate}
                        onChange={(e) => setBuyingDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]} // disable past dates
                        className="w-full border rounded-md px-3 py-2 bg-gray-800 border-gray-700 text-gray-200"
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={offerMutation.isLoading}
                    className={`w-full py-2 rounded-md font-semibold text-white ${offerMutation.isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600"
                        }`}
                >
                    {offerMutation.isLoading ? "Submitting..." : "Offer"}
                </button>
            </form>
        </div>
    );
};

export default MakeOffer;
