import { auth } from "@/lib/auth";
import { Bars, House } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaRegCommentDots, FaRegUserCircle } from "react-icons/fa";
import { MdHistory, MdOutlineAnalytics } from "react-icons/md";
import { RiMoneyDollarBoxLine } from "react-icons/ri";

export async function DashboardSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.role;

  const dashboardLinks = {
    lawyer: [
      {
        icon: MdHistory,
        label: "Hiring History",
        href: "/dashboard/lawyer",
      },
      {
        icon: CgProfile,
        label: "Manage Legal Profile",
        href: "/dashboard/lawyer/lawyerProfile",
      },
    ],

    client: [
      {
        icon: MdHistory,
        label: "Hiring History",
        href: "/dashboard/client",
      },
      {
        icon: CgProfile,
        label: "Manage Legal Profile",
        href: "/dashboard/client/clientLegalProfile",
      },
      {
        icon: FaRegCommentDots,
        label: "Comments",
        href: "/dashboard/client/clientComments",
      },
    ],

    admin: [
      {
        icon: House,
        label: "Home",
        href: "/dashboard/admin",
      },
      {
        icon: FaRegUserCircle,
        label: "Manage Users",
        href: "/dashboard/admin/manageUsers",
      },
      {
        icon: RiMoneyDollarBoxLine,
        label: "All Transactions",
        href: "/dashboard/admin/transactions",
      },
      {
        icon: MdOutlineAnalytics,
        label: "Analytics",
        href: "/dashboard/admin/analytics",
      },
    ],
  };

  const navItems = dashboardLinks[role] || [];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="
              flex items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm font-medium
              text-slate-700
              hover:bg-slate-100
              hover:text-slate-900
              transition-all
            "
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="
          hidden lg:flex
          fixed left-0 top-0
          h-screen
          w-72
          border-r
          bg-white
          z-40
          flex-col
          p-5
          overflow-y-auto
        "
      >
        <div className="pb-5 border-b">
          <h2 className="text-xl font-bold">
            Dashboard
          </h2>

          <p className="text-sm text-slate-500 mt-1 capitalize">
            {role}
          </p>
        </div>

        <div className="mt-5 flex-1">
          {navContent}
        </div>
      </aside>

      {/* Mobile Header */}
      <div
        className="
          lg:hidden
          sticky top-0
          z-50
          border-b
          bg-white
          px-4
          py-3
        "
      >
        <Drawer>
          <Button className="bg-[#0B1936] text-white">
            <Bars />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="w-[280px] sm:w-[320px]"
            >
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading>
                    Dashboard Menu
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>
                  <div className="mb-6 border-b pb-4">
                    <p className="font-semibold truncate">
                      {user?.name}
                    </p>

                    <p className="text-sm text-gray-500 break-all">
                      {user?.email}
                    </p>

                    <p className="text-xs text-blue-600 mt-2 capitalize">
                      {role}
                    </p>
                  </div>

                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}