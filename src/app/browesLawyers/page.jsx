"use client";

import { useState, useEffect } from "react";
import LawyersCard from "@/components/LawyersCard";
import SearchFilter from "../../components/SearchFilter";

const BrowseLawyers = () => {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("all");
  const [sort, setSort] = useState("");

  const [allLawyers, setAllLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const limit = 6;

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchFilteredData = async () => {
      setLoading(true);

      try {
        const queryParams = new URLSearchParams();

        if (search) queryParams.append("search", search);

        if (specialization && specialization !== "all") {
          queryParams.append("specialization", specialization);
        }

        if (sort) {
          queryParams.append("sort", sort);
        }

        queryParams.append("page", page);
        queryParams.append("limit", limit);

        const url = `${
          process.env.NEXT_PUBLIC_SERVER_URL
        }/lawyer?${queryParams.toString()}`;

        const res = await fetch(url, {
          cache: "no-store",
        });

        const data = await res.json();

        setAllLawyers(data.data);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error updating database search:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredData();
  }, [search, specialization, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [search, specialization, sort]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-[#08152C]">
        <div className="text-white p-10 max-w-7xl mx-auto">
          <h3 className="text-[#CF9304] text-sm font-bold tracking-wider uppercase mb-2">
            Directory
          </h3>

          <h1 className="text-4xl font-bold mb-3">
            Browse expert counsel
          </h1>

          <p className="text-[#B0B5A6] text-lg">
            Filter by practice area, availability, and consultation fee.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <SearchFilter
          search={search}
          setSearch={setSearch}
          specialization={specialization}
          setSpecialization={setSpecialization}
          sort={sort}
          setSort={setSort}
        />

        <div className="mt-6">
          {loading ? (
            <p className="text-gray-500 font-medium">
              Updating results...
            </p>
          ) : (
            <>
              <h3 className="font-semibold text-lg mb-4">
                {pagination.total} lawyers matching
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allLawyers.map((lawyer) => (
                  <LawyersCard
                    key={lawyer._id}
                    lawyer={lawyer}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-10">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Prev
                </button>

                {[...Array(pagination.totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`px-4 py-2 border rounded ${
                      page === index + 1
                        ? "bg-blue-600 text-white"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  disabled={page === pagination.totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseLawyers;