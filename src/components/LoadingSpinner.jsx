import { Loader2 } from "lucide-react";

function LoadingSpinner({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-3 py-10 text-sm font-medium text-slate-500">
      <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
      <span>{text}</span>
    </div>
  );
}

export default LoadingSpinner;
