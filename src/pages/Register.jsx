import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { FaTelegramPlane, FaFacebookF } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Ism kiriting";
    if (!formData.lastName.trim()) newErrors.lastName = "Familiya kiriting";

    if (!formData.email.trim()) {
      newErrors.email = "Email kiriting";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Yaroqli email kiriting";
    }

    if (!formData.phone.trim()) newErrors.phone = "Telefon raqam kiriting";

    if (!formData.password) {
      newErrors.password = "Parol kiriting";
    } else if (formData.password.length < 6) {
      newErrors.password = "Parol kamida 6 belgidan iborat bo‘lishi kerak";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Parolni tasdiqlang";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Parollar mos kelmadi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Ro‘yxatdan o‘tish ma’lumotlari:", formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Gradient bloblar */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Karta */}
      <div className="relative bg-white/10 backdrop-blur-2xl shadow-xl rounded-3xl p-8 w-full max-w-md border border-white/20 hover:bg-white/15 transition-all duration-500">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
            <User className="text-white w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Ro‘yxatdan o‘tish
          </h2>
          <p className="text-white/70 mt-2">Yangi akkaunt yarating</p>
        </div>

        {/* Forma */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Ism va Familiya */}
          <div className="grid grid-cols-2 gap-4">
            {["firstName", "lastName"].map((field, i) => (
              <div key={field} className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
                <input
                  type="text"
                  name={field}
                  placeholder={i === 0 ? "Ismingiz" : "Familiyangiz"}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                />
                {errors[field] && (
                  <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email manzilingiz"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Telefon */}
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="tel"
              name="phone"
              placeholder="+998 (__) ___-__-__"
              value={formData.phone}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Parol */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Parol yarating"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-14 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-blue-400"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Parol tasdiqlash */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Parolni tasdiqlang"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-12 pr-14 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-blue-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Tugma */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:scale-[1.02] active:scale-[0.98] py-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Akkaunt yaratish
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-white/60 text-sm">
          Akkauntingiz bormi?{" "}
          <a href="#" className="text-blue-300 hover:underline">
            Kirish
          </a>
        </p>
        <div className="mt-6 flex justify-center gap-4">
          {/* Telegram */}
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] hover:bg-[#007ab8] transition"
          >
            <FaTelegramPlane size={18} color="white" />
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1877f2] hover:bg-[#145dbf] transition"
          >
            <FaFacebookF size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
