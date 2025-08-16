import React from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react"; // Telegram ikonka sifatida

const Home = () => {
  return (
    <div className="h-screen flex items-center bg-gray-800 justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-400">
          Welcome to <span className="text-white">MyApp</span>
        </h1>
        <p className="text-white">Sign in to continue with Telegram</p>

        <Link
          to="/login"
          className="btn btn-primary btn-wide flex items-center justify-center gap-2 p-3 
                     bg-[#0088cc] hover:bg-[#007ab8] text-white border-none 
                     rounded-2xl shadow-lg transform transition duration-200 hover:scale-105"
        >
          <Send size={20} />
          Sign in with Telegram
        </Link>
      </div>
    </div>
  );
};

export default Home;
