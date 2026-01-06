import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
// import { products } from '../data/mockData';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import { ArrowRight, ShieldCheck, Moon, Sun, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/theme-provider';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
      const newLang = i18n.language === 'en' ? 'vi' : 'en';
      i18n.changeLanguage(newLang);
  };

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
        <div className="absolute top-4 right-4 z-20 flex gap-2">
            <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleLanguage}
                className="rounded-full"
                title={t('common.toggle_language')}
            >
                <div className="relative">
                    <Globe className="h-[1.2rem] w-[1.2rem]" />
                    <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded-sm leading-tight">
                        {i18n.language === 'en' ? 'EN' : 'VI'}
                    </span>
                </div>
                <span className="sr-only">{t('common.toggle_language')}</span>
            </Button>
            <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
                title={t('common.toggle_theme')}
            >
                {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                <span className="sr-only">{t('common.toggle_theme')}</span>
            </Button>
        </div>
        <div className="container relative z-10 flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-4">
             <ShieldCheck className="w-3 h-3 mr-1" />
             {t('home.hero_tagline')}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {t('home.hero_title')} <span className="text-primary">{t('home.hero_title_highlight')}</span>
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            {t('home.hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link to="/browse">
              <Button size="lg" className="h-12 px-8 text-lg">
                {t('home.cta_browse')}
              </Button>
            </Link>
            <Link to="/sell">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg group">
                {t('home.cta_sell')} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
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
            <h2 className="text-2xl font-bold tracking-tight">{t('home.trending_title')}</h2>
            <p className="text-muted-foreground">{t('home.trending_desc')}</p>
          </div>
          <Link to="/browse">
             <Button variant="ghost" className="gap-1">{t('home.view_all')} <ArrowRight className="w-4 h-4"/></Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
             <div className="col-span-full text-center py-10">{t('home.loading')}</div>
          ) : products.length > 0 ? (
            products.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))
          ) : (
             <div className="col-span-full text-center py-10 text-muted-foreground">{t('home.no_products')}</div>
          )}
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="container px-4 md:px-6 py-12">
        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
             <h2 className="text-3xl font-bold tracking-tight">{t('home.how_it_works_title')}</h2>
             <div className="space-y-4">
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">1</div>
                   <div>
                     <h3 className="font-semibold">{t('home.step_1_title')}</h3>
                     <p className="text-sm text-muted-foreground">{t('home.step_1_desc')}</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">2</div>
                   <div>
                     <h3 className="font-semibold">{t('home.step_2_title')}</h3>
                     <p className="text-sm text-muted-foreground">{t('home.step_2_desc')}</p>
                   </div>
                </div>
                <div className="flex gap-4">
                   <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">3</div>
                   <div>
                     <h3 className="font-semibold">{t('home.step_3_title')}</h3>
                     <p className="text-sm text-muted-foreground">{t('home.step_3_desc')}</p>
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
