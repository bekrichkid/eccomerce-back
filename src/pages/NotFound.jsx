import React, { useEffect, useState } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const [show, setShow] = useState(false);
  useEffect(() => setShow(true), []);

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-neutral-100 overflow-hidden">
      {/* blurred orbs */}
      <div className="absolute top-10 left-10 w-[400px] h-[450px] rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10  w-[400px] h-[450px] rounded-full bg-pink-600/20 blur-3xl animate-pulse delay-1000" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* content */}
      <div className="relative z-10 text-center p-6 max-w-3xl">
        <div
          className={`transition-all duration-1000 ${
            show ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <h1 className="text-[7rem] md:text-[10rem] font-extrabold tracking-tight bg-clip-text bg-gradient-to-r text-white opacity-60">
            404
          </h1>
        </div>
        <h2
          className={`mt-4 text-3xl md:text-4xl font-semibold transition-all duration-700 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Error! Page Not Found
        </h2>
        <p
          className={`mt-4 text-neutral-400 max-w-xl mx-auto transition-all duration-700 delay-200 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          The page you are looking for does not exist. It may have been deleted
          or the address may have been misspelled.
        </p>

        <div
          className={`mt-8 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-400 ${
            show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <Home className="w-5 h-5" />
            Home page
          </a>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Go back
          </button>
        </div>

        {/* footer code line */}
        <div
          className={`mt-10 text-xs text-neutral-500 font-mono transition-all duration-700 delay-600 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        >
          ERROR_CODE=404 | REQ_ID=
          {Math.random().toString(36).slice(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
