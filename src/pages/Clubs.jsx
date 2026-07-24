import { useState } from "react";
import { Search, SlidersHorizontal, UsersRound } from "lucide-react";
import { clubs } from "../data/clubs";
import ClubCard from "../components/ClubCard";
import EmptyState from "../components/EmptyState";

function Clubs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "Technology",
    "Creative",
    "Social",
    "Cultural",
    "Business",
    "Sports",
  ];

  const filteredClubs = clubs.filter((club) => {
    const matchesSearch = club.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || club.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="ch-container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UsersRound className="h-7 w-7" />
          </div>
          <p className="ch-eyebrow mt-6">Find Your Community</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Explore Campus Clubs
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Discover student communities, meet people who share your interests,
            and become part of something exciting.
          </p>
        </div>
      </section>

      <section className="ch-container py-12">
        <div className="ch-card p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search clubs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    category === item
                      ? "bg-indigo-600 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <SlidersHorizontal className="h-4 w-4" />
          Showing {filteredClubs.length} clubs
        </div>

        <div className="mt-8">
          {filteredClubs.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
          ) : (
            <EmptyState message="Try another search or select a different category." />
          )}
        </div>
      </section>
    </main>
  );
}

export default Clubs;
