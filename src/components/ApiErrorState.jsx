import { AlertCircle, RefreshCcw } from "lucide-react";

function ApiErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-red-100 bg-red-50 p-5 text-red-700">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-white p-2 text-red-600 shadow-sm">
          <AlertCircle className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold">Something went wrong</p>
          <p className="mt-1 text-sm text-red-600">{message}</p>

          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCcw className="h-4 w-4" />
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ApiErrorState;
