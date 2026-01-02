import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/40 mt-auto">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
             <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">F</span>
                </div>
                <span className="text-lg font-bold">FigureCheck</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The safest marketplace for anime figures. Powered by AI authenticity verification.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">Marketplace</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Browse Figures</a></li>
              <li><a href="#" className="hover:text-foreground">Sell Item</a></li>
              <li><a href="#" className="hover:text-foreground">Trending</a></li>
              <li><a href="#" className="hover:text-foreground">New Arrivals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Authenticity Guide</a></li>
              <li><a href="#" className="hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
             <h3 className="font-semibold mb-3">Newsletter</h3>
             <p className="text-sm text-muted-foreground mb-4">
               Get the latest drops and verification tips.
             </p>
             {/* Input placeholder */}
             <div className="flex gap-2">
               <input 
                 type="email" 
                 placeholder="Enter your email" 
                 className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
               />
             </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs text-muted-foreground">
           &copy; {new Date().getFullYear()} FigureCheck. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
