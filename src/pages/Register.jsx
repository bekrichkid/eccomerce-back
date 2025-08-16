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

    if (!formData.email.trim()) newErrors.email = "Email kiriting";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Yaroqli email kiriting";

    if (!formData.phone.trim()) newErrors.phone = "Telefon raqam kiriting";

    if (!formData.password) newErrors.password = "Parol kiriting";
    else if (formData.password.length < 6)
      newErrors.password = "Parol kamida 6 belgidan iborat bo‘lishi kerak";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Parolni tasdiqlang";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Parollar mos kelmadi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Ro‘yxatdan o‘tish ma’lumotlari:", formData);
      // TODO: fetch('/api/register', { ... })
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT: Large square logo area */}
        <div className="relative flex items-center justify-center p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-neutral-900">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
              backgroundSize: "42px 42px, 42px 42px",
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

          <div className="relative w-full max-w-xl aspect-square rounded-3xl bg-neutral-900/70 border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
              {/* Replace with your logo image if available */}
              {/* <img src="/logo.png" alt="Logo" className="w-40 md:w-56 object-contain" /> */}
              <div className="text-center">
                <div className="mx-auto mb-6 w-24 h-24 rounded-2xl bg-neutral-800 grid place-items-center border border-neutral-700 shadow-[inset_0_0_0_1px_rgba(255,255,255,.04)]">
                  <span className="text-xl tracking-widest text-neutral-300">
                    TZ
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                  TEZCODE
                </h1>
                <p className="mt-3 text-neutral-400">
                  Web • CRM • Telegram • Mobile
                </p>
              </div>
            </div>

            {/* corner accents */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-neutral-700/80 rounded-tl-xl" />
              <div className="absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-neutral-700/80 rounded-tr-xl" />
              <div className="absolute left-4 bottom-4 h-10 w-10 border-l-2 border-b-2 border-neutral-700/80 rounded-bl-xl" />
              <div className="absolute right-4 bottom-4 h-10 w-10 border-r-2 border-b-2 border-neutral-700/80 rounded-br-xl" />
            </div>
          </div>
        </div>

        {/* RIGHT: Register form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                Deregistration
              </h2>
              <p className="mt-2 text-neutral-400">Create new account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* First / Last name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* FirstName */}
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">Name</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 grid place-items-center">
                      <User className="w-5 h-5 text-neutral-500" />
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Firstname"
                      className="w-full pl-11 pr-4 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-xs">{errors.firstName}</p>
                  )}
                </div>

                {/* LastName */}
                <div className="space-y-2">
                  <label className="text-sm text-neutral-300">
                    Surname
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 grid place-items-center">
                      <User className="w-5 h-5 text-neutral-500" />
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Surname"
                      className="w-full pl-11 pr-4 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-red-400 text-xs">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 grid place-items-center">
                    <Mail className="w-5 h-5 text-neutral-500" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 grid place-items-center">
                    <Phone className="w-5 h-5 text-neutral-500" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+998 (__) ___-__-__"
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 grid place-items-center">
                    <Lock className="w-5 h-5 text-neutral-500" />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 grid place-items-center text-neutral-500 hover:text-neutral-300 transition"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs">{errors.password}</p>
                )}
              </div>

              {/* Confirm password */}
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">
                  Password 
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 grid place-items-center">
                    <Lock className="w-5 h-5 text-neutral-500" />
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="absolute inset-y-0 right-3 grid place-items-center text-neutral-500 hover:text-neutral-300 transition"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-neutral-100 text-neutral-900 font-medium hover:bg-white transition active:scale-[.99]"
              >
                Create Account
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-neutral-800" />
              <span className="px-4 text-sm text-neutral-500">Or</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            {/* Socials */}
            <div className="flex justify-center gap-4">
              <a
                href="https://t.me/isroilbek_back_bot"
                target="_blank"
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
                title="Telegram"
              >
                <FaTelegramPlane size={18} color="white" />
              </a>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 transition"
                title="Facebook"
              >
                <FaFacebookF size={16} color="white" />
              </button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-neutral-400 text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-neutral-200 hover:opacity-80 underline underline-offset-4"
              >
                Enter
              </a>
            </p>
            <div className="mt-4 text-center text-xs text-neutral-500">
              © 2025. All rights reserved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
