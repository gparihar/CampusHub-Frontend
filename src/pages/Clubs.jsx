import { useState } from "react";
import { clubs } from "../data/clubs";
import ClubCard from "../components/ClubCard";

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
    <main className="min-h-screen bg-gray-50">

      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            Find Your Community
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Explore Campus Clubs
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Discover student communities, meet people who share your interests,
            and become part of something exciting.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">

        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <input
            type="text"
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                category === item
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-300 bg-white text-gray-600 hover:border-indigo-500 hover:text-indigo-600"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Club Results */}
        <div className="mt-12">
          <p className="mb-6 text-sm text-gray-500">
            Showing {filteredClubs.length} clubs
          </p>

          {filteredClubs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredClubs.map((club) => (
                <ClubCard
                  key={club.id}
                  club={club}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-5xl">🔍</p>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                No clubs found
              </h2>

              <p className="mt-2 text-gray-500">
                Try another search or select a different category.
              </p>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}

export default Clubs;