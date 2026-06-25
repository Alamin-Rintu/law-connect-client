"use client";
import Image from "next/image";
import { ListBox, Select } from "@heroui/react";
import AdminDeleteUser from "./AdminDeleteUser";

const ManageUsersTable = ({ allUsers }) => {


  return (
    <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-6">User</th>
              <th className="py-3.5 px-6">Email Address</th>
              <th className="py-3.5 px-6">Current Role</th>
              <th className="py-3.5 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-sm">
            {allUsers.map((user) => {
              const userId = user._id?.$oid || user._id;

              return (
                <tr key={userId} className="hover:bg-slate-50/50">
                  {/* USER */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image || "https://placehold.co/40"}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        alt={user.name}
                      />
                      <div className="font-semibold text-slate-900">
                        {user.name}
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="px-6 py-4 text-slate-600">{user.email}</td>

                  {/* ROLE BADGE */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        user.role === "lawyer"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {user.role || "client"}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      {/* ROLE SELECT */}
                      <Select
                        className="w-[140px]"
                        selectedKeys={[user.role || "client"]}
                      >
                        <Select.Trigger>
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                          <ListBox>
                            <ListBox.Item id="client" textValue="Client">
                              Client
                              <ListBox.ItemIndicator />
                            </ListBox.Item>

                            <ListBox.Item id="lawyer" textValue="Lawyer">
                              Lawyer
                              <ListBox.ItemIndicator />
                            </ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>

                      {/* DELETE */}

                      <AdminDeleteUser user={user} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
    {/* MOBILE VIEW */}
<div className="md:hidden p-4 space-y-4">
  {allUsers.map((user) => {
    const userId = user._id?.$oid || user._id;

    return (
      <div key={userId} className="border rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Image
            src={user.image || "https://placehold.co/40"}
            width={40}
            height={40}
            className="rounded-full"
            alt={user.name}
          />
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-slate-500">{user.email}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <select
            defaultValue={user.role || "client"}
            className="border rounded-lg p-1"
          >
            <option value="client">Client</option>
            <option value="lawyer">Lawyer</option>
          </select>

          <AdminDeleteUser user={user} />
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
};

export default ManageUsersTable;
