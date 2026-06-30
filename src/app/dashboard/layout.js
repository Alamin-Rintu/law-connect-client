import { DashboardSidebar } from "@/components/DashboardSidebar";
import "react-loading-skeleton/dist/skeleton.css";
export default function RootLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <DashboardSidebar />

      <main
        className="
          flex-1
          w-full
          min-h-screen
          lg:pl-72 
          
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
