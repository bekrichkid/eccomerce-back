import React, { useState, useEffect } from 'react'
import { Home, ArrowLeft, Search, AlertTriangle, Zap } from 'lucide-react'

const NotFound = () => {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    setIsAnimated(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* 404 Number with glitch effect */}
        <div className={`relative mb-8 transform transition-all duration-1000 ${isAnimated ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text animate-pulse">
            404
          </div>
          
          {/* Glitch overlay */}
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-red-500/30 animate-ping">
            404
          </div>
          
          {/* Lightning bolt */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
          </div>
        </div>

        {/* Alert icon */}
        <div className={`mb-6 transform transition-all duration-700 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg shadow-red-500/25">
            <AlertTriangle className="w-10 h-10 text-white animate-bounce" />
          </div>
        </div>

        {/* Main heading */}
        <div className={`mb-4 transform transition-all duration-700 delay-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Oops! Sahifa topilmadi
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Description */}
        <div className={`mb-8 transform transition-all duration-700 delay-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Sahifa ko'chirilgan, o'chirilgan yoki noto'g'ri manzil kiritilgan bo'lishi mumkin. 
            Bosh sahifaga qaytib, kerakli ma'lumotni qidiring.
          </p>
        </div>

        {/* Action buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-700 delay-1000 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
            <div className="relative flex items-center space-x-2">
              <Home className="w-5 h-5" />
              <span>Bosh sahifaga qaytish</span>
            </div>
          </button>

          <button className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transform hover:scale-105 transition-all duration-200">
            <div className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Orqaga qaytish</span>
            </div>
          </button>

          <button className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-teal-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
            <div className="relative flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Qidirish</span>
            </div>
          </button>
        </div>

        {/* Fun suggestion section */}
        <div className={`mt-12 transform transition-all duration-700 delay-1200 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">💡 Foydali havolalar:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="#" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <div className="text-purple-400 font-medium group-hover:text-purple-300">📱 Mobil ilova</div>
              </a>
              <a href="#" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <div className="text-blue-400 font-medium group-hover:text-blue-300">📞 Yordam markazi</div>
              </a>
              <a href="#" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <div className="text-green-400 font-medium group-hover:text-green-300">📊 Status sahifa</div>
              </a>
              <a href="#" className="block p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <div className="text-pink-400 font-medium group-hover:text-pink-300">💬 Aloqa</div>
              </a>
            </div>
          </div>
        </div>

        {/* Error code */}
        <div className={`mt-8 transform transition-all duration-700 delay-1400 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-sm text-gray-500 font-mono">
            ERROR_CODE: 404_PAGE_NOT_FOUND | REQUEST_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </div>
      </div>

      {/* Decorative grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  )
}

export default NotFound