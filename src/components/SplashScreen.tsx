export default function SplashScreen() {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-24 h-24 bg-purple-600 rounded-3xl mx-auto mb-6 flex items-center justify-center text-5xl shadow-2xl shadow-purple-700/40 animate-pulse">
            ✨
          </div>
  
          <p className="text-purple-400 font-bold tracking-[0.3em] text-sm mb-3">
            ARMOROO ENT
          </p>
  
          <h1 className="text-5xl md:text-7xl font-black mb-3">
            THE DIGITAL HUSTLER
          </h1>
  
          <p className="text-slate-400 font-bold tracking-widest">
            AI MONEY ENGINE
          </p>
  
          <div className="mt-8 w-48 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full w-2/3 bg-purple-600 rounded-full animate-pulse" />
          </div>
  
          <p className="text-slate-600 text-sm mt-6">
            Loading premium systems...
          </p>
        </div>
      </main>
    );
  }