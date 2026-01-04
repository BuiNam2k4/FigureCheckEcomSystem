import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, ShieldCheck, Users, Package, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeProvider } from '@/components/theme-provider';

const AdminLayout = () => {
    const { user, isAdmin, logout } = useAuth();
    const location = useLocation();

    // Protect admin route
    // if (!isAdmin) {
    //     return <Navigate to="/" replace />;
    // }

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: ShieldCheck, label: 'Verification Queue', href: '/admin/verify' },
        { icon: Package, label: 'Products', href: '/admin/products' },
        { icon: Users, label: 'Users', href: '/admin/users' },
    ];

    return (
        <div className="min-h-screen grid grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <div className="bg-zinc-900 text-white p-4 flex flex-col">
                <div className="flex items-center gap-2 px-2 py-4 mb-8">
                     <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                        A
                     </div>
                     <span className="font-bold text-lg tracking-tight">Admin Console</span>
                </div>

                <nav className="space-y-2 flex-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                            <Link key={item.href} to={item.href}>
                                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-zinc-800 text-zinc-400'}`}>
                                    <Icon className="h-4 w-4" />
                                    <span>{item.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </nav>

                <div className="border-t border-zinc-800 pt-4 mt-auto">
                    <div className="flex items-center gap-3 px-3 py-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">
                           {user?.sub?.substring(0,2).toUpperCase() || 'AD'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.sub || 'Admin'}</p>
                            <p className="text-xs text-zinc-500 truncate">Administrator</p>
                        </div>
                    </div>
                    <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30" onClick={logout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </Button>
                </div>
            </div>

            {/* Main Content */}
            <main className="p-8 bg-muted/20 overflow-auto">
                 <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
