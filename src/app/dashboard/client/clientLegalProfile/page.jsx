"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Chip } from "@heroui/react";
import { CalendarDays, Clock, Mail, UserRound } from "lucide-react";

const ClientLegalProfile = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!user) return null;

  const now = new Date();

  const currentDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-default-200 bg-background p-4 sm:p-6 shadow-sm">
        {/* TOP SECTION */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* USER INFO */}
          <div className="flex items-center gap-4 min-w-0">
            <Avatar
              className="h-20 w-20 sm:h-24 sm:w-24 text-xl"
              aria-label="User Avatar"
            >
              <Avatar.Image
                referrerPolicy="no-referrer"
                alt={user?.name}
                src={user?.image}
              />
              <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
            </Avatar>

            <div className="min-w-0">
              <Chip size="sm" variant="flat" color="primary">
                <UserRound size={14} />
                Client Profile
              </Chip>

              <h3 className="text-lg sm:text-2xl font-semibold truncate mt-2">
                Welcome Back, {user?.name}
              </h3>

              <div className="flex items-center gap-2 text-sm text-default-500 mt-1">
                <Mail size={16} />
                <span className="truncate">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* DATE TIME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto">
            <div className="rounded-xl border border-default-200 bg-default-50 p-4">
              <div className="flex items-center gap-2 text-sm text-default-500 mb-1">
                <CalendarDays size={16} />
                Date
              </div>
              <p className="text-sm font-semibold">{currentDate}</p>
            </div>

            <div className="rounded-xl border border-default-200 bg-default-50 p-4">
              <div className="flex items-center gap-2 text-sm text-default-500 mb-1">
                <Clock size={16} />
                Time
              </div>
              <p className="text-sm font-semibold">{currentTime}</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-default-200 pt-5">
          <p className="text-sm text-default-500">
            Here's what's happening with your legal requests.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientLegalProfile;
