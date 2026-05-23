type ToolCardProps = {
    title: string;
    description: string;
    onOpen: () => void;
  };
  
  export default function ToolCard({
    title,
    description,
    onOpen,
  }: ToolCardProps) {
    return (
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-purple-500 transition-all duration-300">
  
        <h3 className="text-xl font-black text-white mb-2">
          {title}
        </h3>
  
        <p className="text-slate-400 text-sm">
          {description}
        </p>
  
        <button
          onClick={onOpen}
          className="mt-5 w-full bg-purple-600 hover:bg-purple-700 rounded-xl py-2 font-bold transition-all duration-300"
        >
          Open Tool
        </button>
  
      </div>
    );
  }