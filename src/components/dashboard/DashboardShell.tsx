"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap,
  LayoutDashboard,
  Activity,
  TrendingUp,
  FileText,
  Settings,
  User,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  Wallet,
  Copy,
  ExternalLink,
} from "lucide-react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

function SidebarItem({ icon, label, href, active }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard Overview", subtitle: "Real-time grid monitoring and DTR trading platform" },
  "/dashboard/grid-monitor": { title: "Grid Monitor", subtitle: "Network topology and node telemetry" },
  "/dashboard/trading": { title: "Trading", subtitle: "DTR market and order placement" },
  "/dashboard/positions": { title: "Positions", subtitle: "Your DTR holdings and P&L" },
  "/dashboard/settings": { title: "Settings", subtitle: "Account and platform preferences" },
  "/dashboard/wallet": { title: "Wallet", subtitle: "Balances, credits, and collateral" },
};

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { title, subtitle } = routeTitles[pathname] ?? { title: "Dashboard", subtitle: "" };

  const navItems = [
    { href: "/dashboard", label: "Overview", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/grid-monitor", label: "Grid Monitor", icon: <Activity className="w-5 h-5" /> },
    { href: "/dashboard/trading", label: "Trading", icon: <TrendingUp className="w-5 h-5" /> },
    { href: "/dashboard/positions", label: "Positions", icon: <FileText className="w-5 h-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
    { href: "/dashboard/wallet", label: "Wallet", icon: <Wallet className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-[73px] px-6 border-b border-slate-200 flex items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-semibold text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
              DTR Platform
            </span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-[73px] bg-white border-b border-slate-200 px-8 flex items-center shrink-0">
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className="text-xl font-semibold text-slate-900 mb-0.5" style={{ fontFamily: "var(--font-sans)" }}>
                {title}
              </h1>
              <p className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>
                {subtitle}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search nodes, trades..."
                  className="pl-9 pr-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-900 text-sm w-64"
                  style={{ fontFamily: "var(--font-sans)" }}
                />
              </div>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors" type="button">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900" style={{ fontFamily: "var(--font-sans)" }}>
                        John Trader
                      </p>
                      <p className="text-xs text-slate-500" style={{ fontFamily: "var(--font-sans)" }}>
                        Verified Trader
                      </p>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Wallet className="w-4 h-4 text-slate-600" />
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide" style={{ fontFamily: "var(--font-sans)" }}>
                          Wallet Address
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <code className="text-xs font-mono text-slate-900 bg-slate-50 px-2 py-1 rounded flex-1 truncate">
                          0x742d35...95f0bEb
                        </code>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              void navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
                            }}
                            className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                            title="Copy address"
                          >
                            <Copy className="w-3.5 h-3.5 text-slate-600" />
                          </button>
                          <button type="button" className="p-1.5 hover:bg-slate-100 rounded transition-colors" title="View on explorer">
                            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <span className="text-xs text-slate-600" style={{ fontFamily: "var(--font-sans)" }}>
                          Ethereum Mainnet
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/change-password"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      Change password
                    </Link>
                    <Link
                      href="/login"
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
