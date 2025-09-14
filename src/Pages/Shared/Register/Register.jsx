import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // ✅ useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import SocialLogin from "../../Home/SocialLogin";
import useAxios from "../../../hooks/useAxios";

const Register = () => {
  const { createUser, updateUser, setUser, setLoading } = useAuth();
  const navigate = useNavigate(); // ✅ hook for redirect

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPW] = useState(false);
  const [loading, setLocalLoading] = useState(false);
  const axiosInstance = useAxios();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLocalLoading(true);

    try {
      const { user } = await createUser(email, password);
      await updateUser({ displayName: name });

      // Save user in global auth context
      setUser({ ...user, displayName: name });

      const userInfo ={
        email,
        role: 'user',
        name,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString()
      }

      const userRes = axiosInstance.post('/users', userInfo);
      console.log(userRes);

      Swal.fire("All set!", "Registration successful.", "success");

      setLoading(false);

      // Reset form
      setName("");
      setEmail("");
      setPassword("");

      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      Swal.fire(
        "Registration Failed",
        err.message || "Something went wrong",
        "error"
      );
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-orange-50 to-white px-4 py-12">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side – Welcome Section */}
        <div className="w-full lg:w-1/2 bg-gradient-to-b from-orange-50 to-orange-100 p-10 flex flex-col justify-center gap-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-800">
              Welcome to <span className="text-orange-500">DreamSquare</span>
            </h2>
            <p className="mt-3 text-gray-600">
              Join thousands in securing your place in the digital space.
            </p>
          </div>

          <ul className="mt-6 space-y-4">
            {[
              ["🔐", "Secure Digital Identity"],
              ["⚡", "Fast Access Anywhere"],
              ["🌐", "Connect Globally"],
            ].map(([icon, text], i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-orange-100 text-orange-500 p-2 rounded-full shadow-sm text-xl">
                  {icon}
                </span>
                <span className="text-gray-700 font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side – Register Form */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <form onSubmit={handleRegister} className="space-y-5">
            <h1 className="text-4xl font-extrabold text-orange-600 text-center mb-6">
              Register Now
            </h1>

            {/* Name */}
            <div>
              <label className="font-semibold text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  text-gray-800"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  text-gray-800"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="font-semibold text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border pr-10 rounded-md border-gray-300 
                  focus:outline-none focus:ring-2 focus:ring-orange-400
                  text-gray-800"
              />
              <button
                type="button"
                onClick={() => setShowPW(!showPassword)}
                className="absolute top-10 right-3 cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <hr className="flex-grow border-gray-300" />
              <span className="mx-2 text-gray-400 text-sm">or continue with</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Social Login */}
            <div className="flex justify-center space-x-4">
              <SocialLogin />
            </div>

            {/* Login Redirect */}
            <p className="text-sm text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-orange-500 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
