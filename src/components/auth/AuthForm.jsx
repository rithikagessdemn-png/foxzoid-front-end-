import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../redux/slices/authSlice";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/login.avif";

const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const action = isLogin
      ? loginUser(form)
      : registerUser(form);

    const result = await dispatch(action);

    // ✅ Redirect ONLY after success
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };


  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-black/80 to-gray-900/95"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header with gaming icons */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            FOXZOID GAME
          </h1>
          <p className="text-gray-300">Enter the arena</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="bg-gray-900/80 backdrop-blur-lg border-2 border-blue-500/30 p-8 rounded-2xl shadow-2xl shadow-blue-900/30"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <h2 className="text-2xl font-bold mx-4 text-white text-center">
              {isLogin ? "LOGIN TO ARENA" : "JOIN THE LEGION"}
            </h2>
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>

          {/* Name */}
          {!isLogin && (
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                WARRIOR NAME
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={onChange}
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={onChange}
              className="w-full p-3 rounded-lg bg-gray-800/70 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              SECRET CODE
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={onChange}
                className="w-full p-3 pr-12 rounded-lg bg-gray-800/70 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-blue-400 hover:text-blue-300 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          {!isLogin && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                CONFIRM SECRET CODE
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-blue-500/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-blue-900/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></span>
                {isLogin ? "ENTERING ARENA..." : "CREATING ACCOUNT..."}
              </span>
            ) : isLogin ? (
              "ENTER ARENA"
            ) : (
              "JOIN BATTLE"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
            <span className="px-4 text-sm text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          </div>

          {/* Toggle */}
          <div className="text-center">
            <p className="text-gray-300">
              {isLogin ? "New warrior?" : "Already enlisted?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 ml-1"
              >
                {isLogin ? "Join the legion" : "Enter arena"}
              </button>
            </p>
          </div>
        </form>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30"></div>
    </div>
  );
};

export default AuthForm;