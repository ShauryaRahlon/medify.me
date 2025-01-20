import React, { useState } from "react";
import axios from "axios";
import { Lock, Unlock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Otpverify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleInput = (index: number, value: string) => {
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const email = localStorage.getItem("email");
      if (!email)
        throw new Error("Email not found. Please try signing up again.");

      const response = await axios.post(
        "https://medify-me-1.onrender.com/api/auth/verifyOTP", //wrong route
        {
          email,
          otp: enteredOtp,
        }
      );

      console.log(response);

      toast.success(response.data.message);
      setIsVerified(true);
      setTimeout(() => navigate("/userhome"), 2000);
    } catch (err: any) {
      console.error(
        "OTP verification failed:",
        err.response?.data || err.message
      );
      toast.error(
        err.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-blue-950 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Other UI components */}
      <form onSubmit={handleSubmit} className="relative ...">
        <p className="text-2xl font-bold">Verify OTP</p>
        <div className="flex justify-center mt-8 space-x-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(index, e.target.value)}
              className="w-10 h-10 border rounded-lg text-center"
            />
          ))}
        </div>
        <button
          type="submit"
          className="mt-8 w-full py-2.5 bg-blue-500 text-white rounded-lg"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default Otpverify;
