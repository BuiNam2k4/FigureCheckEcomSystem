import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
// import { products } from '../data/mockData';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Fetch from API
        const data = await fetchProducts();
        // If API returns empty or format is different, fallback or map accordingly
        // For now assuming API returns list of products similar to mock
        
        // Ensure data is an array
        const productList = Array.isArray(data) ? data : (data.result || []);
        console.log("productlist",productList);
        // Add mock images/AI data if missing from backend for demo purposes
        const enhancedData = productList.map(p => ({
            ...p,
            images: p.images || ["https://images.unsplash.com/photo-1620336655052-b57986f5a26a?q=80&w=1000&auto=format&fit=crop"],
            aiAnalysis: p.aiAnalysis || { status: "Unverified", authenticityScore: 0 }
        }));
        
        setProducts(enhancedData);
      } catch (err) {
        console.error("Using mock data fallback due to API error", err);
        // Fallback to mock data if API fails (optional, good for dev)
        // setProducts(mockProducts); 
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="relative bg-muted/40 py-20 px-4 md:px-6 lg:py-32 overflow-hidden">
        <div className="container relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
             <ShieldCheck className="w-3 h-3 mr-1" />
             AI-Powered Authenticity Verification
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Buy & Sell Anime Figures with <span className="text-primary">Confidence</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            The first marketplace that uses advanced AI to verify figure authenticity before you buy. 
            No more bootlegs. Just genuine collections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/browse">
              <Button size="lg" className="h-12 px-8 text-lg">
                Browse Figures
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg group">
                Start Selling <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </section>

      {/* Trending Section */}
      <section className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground">Popular figures from verified sellers.</p>
          </div>
          <Link to="/browse">
             <Button variant="ghost" className="gap-1">View All <ArrowRight className="w-4 h-4"/></Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
             <div className="col-span-full text-center py-10">Loading products...</div>
          ) : products.length > 0 ? (
            products.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))
          ) : (
             <div className="col-span-full text-center py-10 text-muted-foreground">No products found via API. Ensure backend is running.</div>
          )}
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="container px-4 md:px-6 py-12">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
             <h2 className="text-3xl font-bold tracking-tight">How it Works</h2>
             <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                   <div>
                     <h3 className="font-semibold">Upload Photos</h3>
                     <p className="text-sm text-muted-foreground">Sellers upload high-res photos of the figure and box.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                   <div>
                     <h3 className="font-semibold">AI Analysis</h3>
                     <p className="text-sm text-muted-foreground">Our computer vision model checks for inconsistencies in paint, sculpting, and packaging.</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">3</div>
                   <div>
                     <h3 className="font-semibold">Verified Listing</h3>
                     <p className="text-sm text-muted-foreground">Authentic items get a "Verified" badge and market price suggestion.</p>
                   </div>
                </div>
             </div>
          </div>
          <div className="flex-1 relative aspect-video bg-muted rounded-xl overflow-hidden border">
             {/* Placeholder for feature visual */}
             <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/50">
               <ShieldCheck className="w-16 h-16 opacity-20" />
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
