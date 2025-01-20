import React, { useState } from "react";
import { Lock, Unlock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Otpverify = () => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    if (target.value.length === target.maxLength) {
      const nextInput = target.nextElementSibling as HTMLInputElement;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
    navigate("/userhome");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-blue-950 overflow-hidden">
      {/* Animated background dots */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className={`absolute h-1 w-1 rounded-full bg-white/30 animate-pulse`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-green-500/5" />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative w-[320px] h-[420px] flex flex-col items-center bg-gray-900/40 backdrop-blur-sm rounded-lg shadow-2xl p-6 border border-gray-700/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-blue-500/10 hover:border-blue-500/30 z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-green-500/5 rounded-lg" />

        <p className="relative text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent mt-4">
          Verify OTP
        </p>

        <div className="relative mt-4">
          {isVerified ? (
            <div className="animate-bounce">
              <Unlock className="w-12 h-12 text-green-400" />
            </div>
          ) : (
            <div className="transition-transform duration-300 hover:scale-110">
              <Lock className="w-12 h-12 text-blue-400" />
            </div>
          )}
        </div>

        <div className="relative flex justify-center mt-8 space-x-3">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              className="w-10 h-10 border border-gray-700/50 rounded-lg text-center bg-gray-800/30 text-white shadow-inner focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder-gray-500"
              type="password"
              maxLength={1}
              onChange={handleInput}
              placeholder="•"
            />
          ))}
        </div>

        <button
          className="relative mt-8 w-full py-2.5 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-green-600 active:scale-[0.98] transition-all duration-300 font-medium overflow-hidden group"
          type="submit"
          onClick={handleSubmit}
        >
          <span className="relative z-10">Verify</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        <Link
          to={"/"}
          className="relative mt-4 w-full py-2.5  text-gray-300 rounded-lg shadow-lg hover:shadow-xl  active:scale-[0.98] transition-all duration-300 font-medium backdrop-blur-sm"
        >
          <button
            className="relative mt-4 w-full py-2.5 bg-gray-800/30 text-gray-300 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-700/40 active:scale-[0.98] transition-all duration-300 font-medium backdrop-blur-sm"
            type="button"
          >
            Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Otpverify;
