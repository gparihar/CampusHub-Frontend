import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-20">
      <div className="ch-card max-w-xl p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
          <Compass className="h-8 w-8" />
        </div>
        <p className="ch-eyebrow mt-6">404</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
          Page not found
        </h1>
        <p className="mt-3 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/" className="ch-button-primary mt-7">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
