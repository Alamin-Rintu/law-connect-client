import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* রেসপনসিভ সাইডবার/মোবাইল টপবার */}
      <DashboardSidebar />

      {/* মেইন কন্টেন্ট এরিয়া */}
      <main
        className="
          flex-1
          w-full
          min-h-screen
          /* ডেস্কটপে সাইডবারের জন্য বামে জায়গা (w-72) ছেড়ে দেবে */
          lg:pl-72 
          
          /* সব ডিভাইসে ভেতরের স্পেসিং */
          p-4
          sm:p-6
          lg:p-8
        "
      >
        {children}
      </main>
    </div>
  );
}