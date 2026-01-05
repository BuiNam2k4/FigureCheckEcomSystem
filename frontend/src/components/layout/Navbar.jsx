import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, User, X, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" className="text-lg font-bold">Home</Link>
                <Link to="/browse" className="text-lg font-medium">Browse Figures</Link>
                <Link to="/sell" className="text-lg font-medium">Sell Now</Link>
                <Link to="/about" className="text-lg font-medium">About Authenticity</Link>
                {!user && (
                    <div className="pt-4 border-t">
                        <Link to="/login" className="block py-2 text-lg font-medium text-muted-foreground hover:text-foreground">Log In</Link>
                        <Link to="/register" className="block py-2 text-lg font-medium text-primary">Sign Up</Link>
                    </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">FigureCheck</span>
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for figures (e.g. One Piece, Miku)..."
              className="w-full pl-8 bg-muted/50 focus:bg-background"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="h-5 w-5" />
          </Button>

          <Link to="/sell">
            <Button variant="default" className="hidden sm:flex bg-primary hover:bg-primary/90">
              Sell Now
            </Button>
          </Link>

          <div className="relative">
            <Link to="/cart">
             <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
                {/* Badge could go here */}
             </Button>
             </Link>
          </div>

          {user ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name ? user.name.charAt(0) : "U"}</AvatarFallback>
                    </Avatar>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                    </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
                <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                </Link>
                <Link to="/register">
                    <Button size="sm">Sign Up</Button>
                </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t p-4 bg-background">
           <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
              autoFocus
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
