import Skeleton from "react-loading-skeleton";

export default function LawyerCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 ">
      <Skeleton circle width={60} height={60} />

      <div className="mt-4 space-y-2">
        <Skeleton height={24} width="70%" />
        <Skeleton height={18} width="50%" />
        <Skeleton height={18} />
      </div>

      <Skeleton height={40} className="mt-4" />
    </div>
  );
}