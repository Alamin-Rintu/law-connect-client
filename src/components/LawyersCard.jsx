import Image from "next/image";
import Link from "next/link";

const LawyersCard = ({ lawyer }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-md">
      {/* TOP: Image & Badge */}
      <div className="relative h-64 w-full bg-gray-100">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Green 'Available' Badge */}
        <div className="absolute top-4 right-4 bg-[#00B47D] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
          Available
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-[#08152C]">{lawyer.name}</h3>
            <p className="text-gray-500 text-sm mt-0.5">
              {lawyer.specialization}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-[#08152C]">
              ${lawyer.fee}
            </span>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">
              / Session
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-sm mb-6">
          <span className="text-[#CF9304] text-lg leading-none">★</span>
          <span className="font-bold text-[#08152C]">142</span>
          <span className="text-gray-500">hires</span>
        </div>

        <Link
          href={`/browesLawyers/${lawyer._id}`}
          className="mt-auto w-full bg-[#08152C] hover:bg-[#122442] text-white py-3 px-4 rounded-xl flex justify-between items-center transition-colors font-medium text-sm shadow-sm"
        >
          View profile
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LawyersCard;
