export default function SideBar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 p-6 hidden md:flex flex-col">
      <div className="mb-10">
        <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-4">
          ✨
        </div>

        <h1 className="text-2xl font-black text-white">DIGITAL HUSTLER</h1>
        <p className="text-slate-500 text-sm mt-1">AI MONEY ENGINE</p>
      </div>

      <nav className="flex flex-col gap-3">
        {["Dashboard", "AI Tools", "Money Tools", "Creator Tools", "Security", "Premium", "Settings"].map((item, index) => (
          <button
            key={item}
            className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
              index === 0
                ? "bg-purple-600 text-white"
                : "bg-slate-950 text-slate-400 hover:bg-slate-900"
            }`}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="mt-auto bg-black border border-slate-800 rounded-3xl p-5">
        <p className="text-slate-500 text-sm mb-2">ACTIVE PLAN</p>
        <h3 className="text-purple-400 font-black text-2xl">MVP TRIAL</h3>
        <p className="text-slate-600 text-sm mt-2">Premium systems enabled</p>
      </div>
    </aside>
  );
}