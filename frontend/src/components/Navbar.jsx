import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-rose-900/40 bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-2xl font-bold tracking-tight text-rose-300">
            Think<span className="text-rose-500">Pad</span>
          </h1>

          {/* Action */}
          <Link
            to="/create"
            className="inline-flex items-center gap-2 rounded-xl 
                     bg-rose-600 px-5 py-2.5 text-sm font-semibold text-white
                     hover:bg-rose-500 active:scale-[0.97] transition"
          >
            <PlusIcon className="size-4" />
            New Note
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
