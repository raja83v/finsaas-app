import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { APP_NAME } from "@/lib/constants";
import {
  LayoutDashboard,
  Coins,
  PiggyBank,
  Users,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  BarChart,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({
  className,
  isOpen,
  onClose,
  ...props
}: SidebarProps) {
  const location = useLocation();

  const routes = [
    {
      title: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "Gold Loans",
      icon: Coins,
      href: "/dashboard/loans",
      variant: "ghost",
    },
    {
      title: "Approvals",
      icon: CheckCircle2,
      href: "/dashboard/approvals",
      variant: "ghost",
    },
    {
      title: "Collateral",
      icon: PiggyBank,
      href: "/dashboard/collateral",
      variant: "ghost",
    },
    {
      title: "Savings Accounts",
      icon: PiggyBank,
      href: "/dashboard/accounts",
      variant: "ghost",
    },
    {
      title: "Customers",
      icon: Users,
      href: "/dashboard/customers",
      variant: "ghost",
    },
    {
      title: "Documents",
      icon: FileText,
      href: "/dashboard/documents",
      variant: "ghost",
    },
    {
      title: "Reports",
      icon: BarChart3,
      href: "/dashboard/reports",
      variant: "ghost",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/dashboard/analytics",
      variant: "ghost",
    },
    {
      title: "Calendar",
      icon: Clock,
      href: "/dashboard/calendar",
      variant: "ghost",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-background transition-transform duration-300 md:relative md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className,
        )}
        {...props}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="rounded-full bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-primary-foreground"
              >
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <span className="text-lg font-bold">{APP_NAME}</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route, i) => (
              <Link
                key={i}
                to={route.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  location.pathname === route.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                <route.icon className="h-5 w-5" />
                {route.title}
              </Link>
            ))}
          </nav>
          <div className="mt-4 px-2">
            <div className="rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    You have 3 unread messages
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-muted p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-foreground"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" asChild>
                <Link to="/dashboard/settings">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link to="/logout">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
