import LawyersCard from "./LawyersCard";

const LatestLawyers = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/latest`,
    {
      cache: "no-store",
    }
  );

  const lawyers = await res.json();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-64 w-64 rounded-full bg-amber-200/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
            Trusted Legal Experts
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Meet Our Latest Lawyers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Connect with experienced legal professionals across criminal law,
            family law, immigration, corporate law, and more. Find the right
            lawyer for your legal needs with confidence.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Verified Profiles", "Experienced Counsel", "Easy Consultation"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>

        {/* Cards */}
        {lawyers?.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer._id}
                className="group rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/20"
              >
                <LawyersCard lawyer={lawyer} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">
              No lawyers available yet
            </h3>
            <p className="mt-2 text-slate-600">
              Please check back soon for the latest legal experts.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestLawyers;