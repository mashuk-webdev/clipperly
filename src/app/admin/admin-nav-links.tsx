
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Scissors, Users, LineChart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { APP_NAME } from '@/lib/constants';

const adminNavLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
    { href: '/admin/bookings', label: 'Bookings', icon: Calendar, badge: '6' },
    { href: '/admin/services', label: 'Services', icon: Scissors },
    { href: '/admin/customers', label: 'Customers', icon: Users },
    { href: '/admin/analytics', label: 'Analytics', icon: LineChart },
];

export function DesktopNav() {
    const pathname = usePathname();
    return (
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {adminNavLinks.map(link => (
                <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent",
                        pathname.startsWith(link.href) && "bg-muted text-primary font-semibold"
                    )}
                >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                    {link.badge && <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{link.badge}</Badge>}
                </Link>
            ))}
        </nav>
    );
}

export function MobileNav() {
    const pathname = usePathname();
    return (
        <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold mb-4"
            >
              <Scissors className="h-6 w-6 text-accent" />
              <span>{APP_NAME} Admin</span>
            </Link>
            {adminNavLinks.map(link => (
                <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors",
                        pathname.startsWith(link.href) && "bg-accent text-accent-foreground"
                    )}
                >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                    {link.badge && <Badge className={cn("ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full", pathname.startsWith(link.href) ? "bg-accent-foreground text-accent" : "")}>{link.badge}</Badge>}
                </Link>
            ))}
        </nav>
    );
}
