import React, { useState, useEffect, useReducer } from "react";
import { Eye, EyeOff, User, Lock, Send } from "lucide-react";

// State reducer for managing app state
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, token: action.token, isAuthenticated: true };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'LOGOUT':
      return { ...state, user: null, token: null, isAuthenticated: false };
    case 'SET_TELEGRAM_LOGIN_ID':
      return { ...state, telegramLoginId: action.payload };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  telegramLoginId: null
};

const Login = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onTelegramAuth = async (user) => {
    console.log("Telegram user data:", user);
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      // Simulate API call - replace with your actual endpoint
      const response = await fetch("/api/telegram-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      
      // For demo purposes, simulate successful response
      const data = {
        success: true,
        token: 'demo_token_' + Date.now(),
        user: {
          id: user.id,
          first_name: user.first_name,
          username: user.username,
          photo_url: user.photo_url
        }
      };

      if (data.success) {
        dispatch({ 
          type: 'SET_USER', 
          payload: data.user, 
          token: data.token 
        });
        // In a real app, you would navigate to dashboard here
        console.log("Login successful! User:", data.user);
      } else {
        dispatch({ type: 'SET_ERROR', payload: "Telegram login failed: " + data.message });
      }
    } catch (error) {
      console.error("Telegram login error:", error);
      dispatch({ type: 'SET_ERROR', payload: "Login xatosi yuz berdi" });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  useEffect(() => {
    window.onTelegramAuth = onTelegramAuth;

    if (!document.getElementById("tg-login-widget")) {
      const script = document.createElement("script");
      script.id = "tg-login-widget";
      script.src = "https://telegram.org/js/telegram-widget.js?22";
      script.setAttribute("data-telegram-login", "isroilbek_back_bot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.setAttribute("data-request-access", "write");
      script.async = true;

      const telegramContainer = document.getElementById("telegram-login-container");
      if (telegramContainer) telegramContainer.appendChild(script);
    }

    return () => {
      if (window.onTelegramAuth) delete window.onTelegramAuth;
      const s = document.getElementById("tg-login-widget");
      if (s && s.parentNode) s.parentNode.removeChild(s);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate API call - replace with your actual endpoint
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      // For demo purposes, simulate successful response
      const data = {
        success: true,
        token: 'demo_token_' + Date.now(),
        user: {
          email: formData.email,
          name: formData.email.split('@')[0]
        }
      };

      if (data.success) {
        dispatch({ 
          type: 'SET_USER', 
          payload: data.user, 
          token: data.token 
        });
        console.log("Login successful! User:", data.user);
      } else {
        dispatch({ type: 'SET_ERROR', payload: "Login failed: " + data.message });
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: 'SET_ERROR', payload: "Login xatosi yuz berdi" });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const togglePasswordVisibility = () => setShowPassword((v) => !v);

  const handleManualTelegramLogin = () => {
    const botUsername = "isroilbek_back_bot";
    const loginId = Date.now();
    dispatch({ type: 'SET_TELEGRAM_LOGIN_ID', payload: loginId });

    window.open(`https://t.me/${botUsername}?start=login_${loginId}`, "_blank");

    const checkInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/check-telegram-login/${loginId}`);
        // For demo purposes, simulate eventual success
        if (Math.random() > 0.8) { // 20% chance each check
          const data = {
            success: true,
            token: 'telegram_token_' + Date.now(),
            user: {
              id: loginId,
              first_name: "Demo User",
              username: "demo_user"
            }
          };

          dispatch({ 
            type: 'SET_USER', 
            payload: data.user, 
            token: data.token 
          });
          dispatch({ type: 'SET_TELEGRAM_LOGIN_ID', payload: null });
          clearInterval(checkInterval);
          console.log("Telegram login successful! User:", data.user);
        }
      } catch (error) {
        console.error("Check login error:", error);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(checkInterval);
      dispatch({ type: 'SET_TELEGRAM_LOGIN_ID', payload: null });
    }, 30000); // 30 seconds timeout instead of 5 minutes for demo
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // If user is authenticated, show dashboard
  if (state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Welcome to Dashboard!</h1>
          <div className="bg-neutral-900 p-6 rounded-xl border border-neutral-800 mb-6">
            <h2 className="text-xl mb-2">User Info:</h2>
            <pre className="text-left text-sm text-neutral-300">
              {JSON.stringify(state.user, null, 2)}
            </pre>
            <p className="text-sm text-neutral-400 mt-2">Token: {state.token}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Error Display */}
      {state.error && (
        <div className="fixed top-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between">
            <span>{state.error}</span>
            <button 
              onClick={() => dispatch({ type: 'CLEAR_ERROR' })}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* LEFT: Large square logo area */}
        <div className="relative flex items-center justify-center p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-neutral-900">
          {/* background details */}
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

          {/* Square logo box */}
          <div className="relative w-full max-w-xl aspect-square rounded-3xl bg-neutral-900/70 border border-neutral-800 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 grid place-items-center">
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

            {/* Corner accents */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute left-4 top-4 h-10 w-10 border-l-2 border-t-2 border-neutral-700/80 rounded-tl-xl" />
              <div className="absolute right-4 top-4 h-10 w-10 border-r-2 border-t-2 border-neutral-700/80 rounded-tr-xl" />
              <div className="absolute left-4 bottom-4 h-10 w-10 border-l-2 border-b-2 border-neutral-700/80 rounded-bl-xl" />
              <div className="absolute right-4 bottom-4 h-10 w-10 border-r-2 border-b-2 border-neutral-700/80 rounded-br-xl" />
            </div>
          </div>
        </div>

        {/* RIGHT: Login form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-2 text-neutral-400">
                Enter to your account
              </p>
            </div>

            <div className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm text-neutral-300">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-3 grid place-items-center">
                    <User className="w-5 h-5 text-neutral-500" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                </div>
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
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 h-12 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-100 placeholder-neutral-500 outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 transition"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-3 grid place-items-center text-neutral-500 hover:text-neutral-300 transition"
                    aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rish"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-neutral-600 bg-neutral-900 checked:bg-neutral-700 focus:ring-1 focus:ring-neutral-500"
                  />
                  <span className="text-neutral-300">Remember</span>
                </label>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-neutral-200 transition"
                >
                  Forgot Password
                </a>
              </div>

              {/* Submit */}
              <div
                onClick={handleSubmit}
                className="w-full h-12 rounded-xl bg-neutral-100 text-neutral-900 font-medium hover:bg-white transition active:scale-[.99] disabled:opacity-60 cursor-pointer flex items-center justify-center"
              >
                {state.isLoading ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </span>
                ) : (
                  "Kirish"
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-neutral-800" />
              <span className="px-4 text-sm text-neutral-500">Or</span>
              <div className="flex-1 h-px bg-neutral-800" />
            </div>

            {/* Telegram Widget */}
            <div className="flex justify-center mb-3">
              <div id="telegram-login-container" />
            </div>

            {/* Manual Telegram Login */}
            <button
              type="button"
              onClick={handleManualTelegramLogin}
              disabled={state.isLoading}
              className="w-full h-12 rounded-xl bg-neutral-800 text-neutral-200 hover:bg-neutral-700 transition inline-flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Send className="w-5 h-5" />
              {state.telegramLoginId ? 'Checking Telegram...' : 'Enter by Telegram'}
            </button>

            {/* Register */}
            <div className="mt-6 text-center">
              <p className="text-neutral-400 text-base">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-medium text-neutral-200 hover:opacity-80 underline underline-offset-4"
                >
                  Register
                </a>
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-xs text-neutral-500">
              © 2025. All rights reserved
            </div>

            {/* Debug State (for development) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-6 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                <h3 className="text-sm font-semibold mb-2">Debug State:</h3>
                <pre className="text-xs text-neutral-400 overflow-x-auto">
                  {JSON.stringify(state, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;