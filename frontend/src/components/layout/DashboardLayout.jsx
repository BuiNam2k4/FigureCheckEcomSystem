import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  LogOut,
  Menu,
  X,
  Tag
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../context/AuthContext';
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
    const { logout } = useAuth();
    const location = useLocation();
    
    // Check if we are on mobile to handle responsiveness better if needed in JS
    // For now purely CSS/Tailwind approach

    const menuItems = [
        { path: '/dashboard/profile', icon: User, label: 'My Profile' },
        { path: '/dashboard/listings', icon: Tag, label: 'My Listings' },
        { path: '/dashboard/orders', icon: Package, label: 'My Orders' },
        { path: '/dashboard/address', icon: MapPin, label: 'Address Book' },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="container py-8 md:py-12">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar (Desktop) / Tabs (Mobile) */}
                <aside className="w-full md:w-1/4">
                    <nav className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 md:space-y-1">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => cn(
                                    "flex items-center whitespace-nowrap px-4 py-3 text-sm font-medium rounded-md transition-colors",
                                    isActive 
                                        ? "bg-primary/10 text-primary" 
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4 mr-3" />
                                {item.label}
                            </NavLink>
                        ))}
                        
                        <div className="md:pt-4 md:mt-4 md:border-t">
                            <Button 
                                variant="ghost" 
                                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                onClick={logout}
                            >
                                <LogOut className="h-4 w-4 mr-3" />
                                Sign Out
                            </Button>
                        </div>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 w-full md:w-3/4">
                    <div className="bg-background rounded-lg border p-6 min-h-[500px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
