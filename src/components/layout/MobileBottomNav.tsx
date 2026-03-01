"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Compass, TrendingUp, User } from "lucide-react";

const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: Compass, label: "Explore", href: "/categories" },
    { icon: TrendingUp, label: "Trending", href: "/trending" },
    { icon: User, label: "Profile", href: "/dashboard" },
];

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-[var(--border-default)]">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${isActive
                                    ? "text-[var(--color-primary-light)]"
                                    : "text-[var(--text-tertiary)]"
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
