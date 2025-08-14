import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Send } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginWithTelegram = () => {
    const botId = import.meta.env.VITE_TELEGRAM_BOT_ID;
    const botUsername = import.meta.env.VITE_TELEGRAM_BOT_USERNAME;
    const origin = window.location.origin;
    window.location.href =
      `https://oauth.telegram.org/auth?bot_id=${botId}&origin=${origin}&request_access=write&embed=1&bot_username=${botUsername}`;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", formData);
    }, 1500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Glassmorphism card */}
      <div className="relative bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20 hover:bg-white/15 transition-all duration-300">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
            <User className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-2">
            Xush kelibsiz
          </h2>
          <p className="text-white/70 text-lg">Akkauntingizga kiring</p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <User className="text-white/60 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email manzilingiz"
              className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-white placeholder-white/60 hover:bg-white/15"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Lock className="text-white/60 w-5 h-5 group-focus-within:text-blue-400 transition-colors duration-200" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Parolingiz"
              className="w-full pl-12 pr-14 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-white placeholder-white/60 hover:bg-white/15"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/60 hover:text-blue-400 transition-colors duration-200 z-10"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-400 bg-white/10 border-white/20 rounded focus:ring-blue-400 focus:ring-2"
              />
              <span className="text-white/70 group-hover:text-white transition-colors duration-200">Eslab qolish</span>
            </label>
            <a href="#" className="text-blue-300 hover:text-blue-200 font-medium transition-colors duration-200 hover:underline">
              Parolni unutdingizmi?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-lg">Kuting...</span>
              </div>
            ) : (
              <span className="text-lg">Kirish</span>
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-6 text-white/60 text-sm font-medium">yoki</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Telegram Login */}
        <button onClick={loginWithTelegram} className="w-full flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-xl hover:shadow-2xl">
          <Send className="w-6 h-6" />
          <span className="text-lg">Telegram orqali kirish</span>
        </button>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-white/70 text-lg">
            Akkauntingiz yo'qmi?{" "}
            <a href="#" className="text-blue-300 hover:text-blue-200 font-semibold hover:underline transition-all duration-200">
              Ro'yxatdan o'ting
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/50">
          <p>© 2025. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;