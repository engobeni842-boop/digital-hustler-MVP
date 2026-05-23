type PageButtonProps = {
    title: string;
    active?: boolean;
  };
  
  export default function PageButton({
    title,
    active,
  }: PageButtonProps) {
    return (
      <button
        className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all ${
          active
            ? "bg-purple-600 text-white"
            : "bg-slate-950 text-slate-400 hover:bg-slate-900"
        }`}
      >
        {title}
      </button>
    );
  }