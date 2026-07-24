import { FileSearch } from "lucide-react";

function EmptyState({ message = "No records found." }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/70 px-6 py-10 text-center text-slate-500">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <FileSearch className="h-6 w-6" />
      </div>

      <p className="mt-4 text-sm font-medium">{message}</p>
    </div>
  );
}

export default EmptyState;
