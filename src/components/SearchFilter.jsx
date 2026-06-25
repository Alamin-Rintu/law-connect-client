"use client";

import { useState, useEffect } from "react";
import { Input, ListBox, Select } from "@heroui/react";

const SearchFilter = ({
  search,
  setSearch,
  specialization,
  setSpecialization,
  sort,
  setSort,
}) => {
  const [localSearch, setLocalSearch] = useState(search);
  const [localSpecialization, setLocalSpecialization] = useState(specialization);
  const [localSort, setLocalSort] = useState(sort);

  useEffect(() => {
    setLocalSearch(search);
    setLocalSpecialization(specialization);
    setLocalSort(sort);
  }, [search, specialization, sort]);

  const handleApply = () => {
    setSearch(localSearch);
    setSpecialization(localSpecialization);
    setSort(localSort);
  };

  const handleReset = () => {
    setLocalSearch("");
    setLocalSpecialization("all");
    setLocalSort("");

    setSearch("");
    setSpecialization("all");
    setSort("");
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden">
      <div className="bg-[#10233f] px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              Lawyer Hiring
            </p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              Find the right legal expert
            </h2>
          </div>
          <p className="text-sm text-slate-200">
            Search by name, practice area, and consultation fee.
          </p>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Lawyer name
            </label>
            <Input
              placeholder="Search lawyer by name..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full"
              variant="bordered"
              radius="md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Practice area
            </label>
            <Select
              placeholder="All Categories"
              value={localSpecialization}
              onChange={(val) => setLocalSpecialization(val || "all")}
              variant="bordered"
              radius="md"
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="all" textValue="All Categories">
                    All Categories
                  </ListBox.Item>
                  <ListBox.Item id="Family Law" textValue="Family Law">
                    Family Law
                  </ListBox.Item>
                  <ListBox.Item id="Criminal Law" textValue="Criminal Law">
                    Criminal Law
                  </ListBox.Item>
                  <ListBox.Item id="Property Law" textValue="Property Law">
                    Property Law
                  </ListBox.Item>
                  <ListBox.Item id="Corporate Law" textValue="Corporate Law">
                    Corporate Law
                  </ListBox.Item>
                  <ListBox.Item id="Tax Law" textValue="Tax Law">
                    Tax Law
                  </ListBox.Item>
                  <ListBox.Item id="Civil Litigation" textValue="Civil Litigation">
                    Civil Litigation
                  </ListBox.Item>
                  <ListBox.Item id="Immigration Law" textValue="Immigration Law">
                    Immigration Law
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Sort by fee
            </label>
            <Select
              placeholder="Sort By"
              value={localSort}
              onChange={(val) => setLocalSort(val || "")}
              variant="bordered"
              radius="md"
            >
              <Select.Trigger>
                <Select.Value />
                <Select.Indicator />
              </Select.Trigger>

              <Select.Popover>
                <ListBox>
                  <ListBox.Item id="lowToHigh" textValue="Price Low to High">
                    Price Low to High
                  </ListBox.Item>
                  <ListBox.Item id="highToLow" textValue="Price High to Low">
                    Price High to Low
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Refine your shortlist before booking a consultation.
          </p>

          <div className="flex gap-3 sm:justify-end">
            <button
              onClick={handleReset}
              type="button"
              className="min-h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 active:scale-[0.98]"
            >
              Clear
            </button>

            <button
              onClick={handleApply}
              type="button"
              className="min-h-10 rounded-lg bg-amber-500 px-5 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.98]"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilter;