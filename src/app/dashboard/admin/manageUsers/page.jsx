import React from "react";
import ManageUsersTable from "@/components/admin/ManageUsersTable";

const AdminMangeUsersPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
    cache: "no-store",
  });
  const allUsers = await res.json();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Manage Users</h1>
        <div className="text-sm text-slate-500">
          Admin /
          <span className="text-slate-800 font-medium">Manage Users</span>
        </div>
      </div>

      <ManageUsersTable allUsers={allUsers} />
    </div>
  );
};

export default AdminMangeUsersPage;
