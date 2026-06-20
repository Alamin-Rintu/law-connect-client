import { DashboardSidebar } from "@/components/DashboardSidebar";

export default function RootLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="flex-1">

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
