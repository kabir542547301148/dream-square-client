import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddProperty = () => {
  const instance = useAxiosSecure();
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const minPrice = watch("minPrice");
  const maxPrice = watch("maxPrice");

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`,
        formData);

      const url = res.data?.data?.url;
      setImageURL(url);
      Swal.fire("Success!", "Image uploaded successfully", "success");
    } catch (err) {
      Swal.fire("Error", "Image upload failed", "error");
    } finally {
      setUploading(false);
    }
  };

  // Handle Form Submit
  const onSubmit = async ({ title, location, minPrice, maxPrice }) => {
    if (minPrice > maxPrice) {
      return Swal.fire(
        "Validation Error",
        "Min price cannot exceed max price",
        "error"
      );
    }

    if (!imageURL) {
      return Swal.fire(
        "Hold on!",
        "Please wait for the image to upload.",
        "info"
      );
    }

    const propertyData = {
      title,
      location,
      minPrice,
      maxPrice,
      image: imageURL,
      agentName: user.displayName,
      agentEmail: user.email,
      createdAt: new Date(),
    };

    try {
      const response = await instance.post("/properties", propertyData);
      if (response.data?.insertedId) {
        Swal.fire("Success!", "Property added successfully", "success");
        reset();
        setImageURL("");
      }
    }  catch (err) {
      Swal.fire("Error", "Failed to add property", "error");
    }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-gray-100 shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-8 text-[#2C3E50]">
          Add New Property
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Property Title */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Property Title
            </label>
            <input
              type="text"
              placeholder="Enter property title"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
                }`}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Property Location */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter location"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${errors.location
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-indigo-500"
                }`}
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Price Range ($)
            </label>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <input
                type="number"
                placeholder="Min"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${errors.minPrice
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
                {...register("minPrice", {
                  required: "Min price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Min price must be positive" },
                  validate: (value) =>
                    !maxPrice || value <= maxPrice || "Min cannot exceed Max",
                })}
              />
              <input
                type="number"
                placeholder="Max"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-black ${errors.maxPrice
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                  }`}
                {...register("maxPrice", {
                  required: "Max price is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Max price must be positive" },
                  validate: (value) =>
                    !minPrice || value >= minPrice || "Max must be ≥ Min",
                })}
              />
            </div>
            {(errors.minPrice || errors.maxPrice) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.minPrice?.message || errors.maxPrice?.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Property Image
            </label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full rounded-md border-gray-300"
            />
            {imageURL && (
              <img
                src={imageURL}
                alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* Agent Name */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Agent Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 rounded-lg border text-[#2D3436]"
            />
          </div>

          {/* Agent Email */}
          <div>
            <label className="block font-semibold text-[#2D3436] mb-1">
              Agent Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full px-4 py-2 bg-gray-200 rounded-lg border text-[#2D3436]"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || uploading || !imageURL}
            className="w-full bg-[#2C3E50] cursor-pointer hover:bg-[#334558f1] text-white py-3 rounded-lg font-semibold transition duration-200"
          >
            {uploading
              ? "Uploading Image..."
              : isSubmitting
                ? "Processing..."
                : "Add Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
