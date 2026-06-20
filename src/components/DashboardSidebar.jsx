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
        icon: House,
        label: "Home",
        href: "/dashboard/lawyer",
      },
      {
        icon: MdHistory,
        label: "Hiring History",
        href: "/dashboard/lawyer/hiring-history",
      },
      {
        icon: CgProfile,
        label: "Manage Legal Profile",
        href: "/dashboard/lawyer/lawyerProfile",
      },
    ],

    client: [
      {
        icon: House,
        label: "Home",
      },
      {
        icon: MdHistory,
        label: "Hiring History",
      },
      {
        icon: CgProfile,
        label: "Manage Legal Profile",
      },
      {
        icon: FaRegCommentDots,
        label: "Comments",
      },
    ],

    admin: [
      {
        icon: House,
        label: "Home",
      },
      {
        icon: FaRegUserCircle,
        label: "Manage Users",
      },
      {
        icon: RiMoneyDollarBoxLine,
        label: "All Transactions",
      },
      {
        icon: MdOutlineAnalytics,
        label: "Analytics",
      },
    ],
  };

  const navItems = dashboardLinks?.[role] || [];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href || "#"}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          >
            <Icon className="size-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <Bars />
          Menu
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
