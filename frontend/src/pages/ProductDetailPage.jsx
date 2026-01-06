import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/productService';
import { getListingsByProduct } from '../services/tradeService';
import { useCart } from '../context/CartContext';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Share2, 
  Heart 
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [listings, setListings] = useState([]);
  
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        console.log("Product data:",data);
        if (data) {
           // Enrich with mock data for missing fields
           const enrichedData = {
               ...data,
               // Mock seller and AI analysis as they are not in backend yet
               seller: { name: "Verified Seller", rating: 4.9 },
               aiAnalysis: {
                   status: "Verified Authentic",
                   authenticityScore: 98,
                   confidence: "High",
                   analyzedAt: new Date().toISOString(),
                   suggestedPriceRange: { min: data.priceMarket * 0.9, max: data.priceMarket * 1.1 }
               }
           };
           setProduct(enrichedData);
           if (data.images && data.images.length > 0) {
               // Find thumbnail or first image
               const thumbnail = data.images.find(img => img.isThumbnail) || data.images[0];
               setMainImage(thumbnail.imageUrl);
           }
        } else {
            setError("Product not found");
        }
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        loadProduct();
    }
  }, [id]);

  // Fetch listings separately
  useEffect(() => {
    const loadListings = async () => {
        if (id) {
            const fetchedListings = await getListingsByProduct(id);
            console.log("Listings data:", fetchedListings);
            // Filter only active listings if needed, e.g., result.status === 'AVAILABLE'
            // For now assuming backend returns what we need
            setListings(fetchedListings);
        }
    };
    loadListings();
  }, [id]);

  const handleAddToCart = async () => {
    if (listings.length === 0) {
        alert("Sorry, this item is currently out of stock.");
        return;
    }
    
    // Logic to pick a listing. For now, pick the first one (or cheapest).
    // Ideally user chooses, but "Add to Cart" implies a default choice (Buy Box).
    // Let's sort by price ascending first? Or just take the first one.
    const bestListing = listings[0]; 
    
    setAddingToCart(true);
    await addToCart(bestListing.id);
    setAddingToCart(false);
  };

  if (loading) return <div className="p-20 text-center">Loading product details...</div>;
  if (error || !product) return <div className="p-20 text-center text-red-500">{error || "Product not found"}</div>;

  const { aiAnalysis } = product;
  const productImages = product.images || [];

  return (
    <div className="container px-4 md:px-6 py-8">
       {/* Breadcrumb or Back Link */}
       <div className="mb-6">
         <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
           &larr; Back to browsing
         </Link>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Images */}
          <div className="space-y-4">
             <div className="aspect-square bg-muted rounded-xl overflow-hidden border relative">
               <img 
                 src={mainImage || "/placeholder-image.jpg"} 
                 alt={product.name} 
                 className="w-full h-full object-contain"
               />
               {aiAnalysis?.status === "Verified Authentic" && (
                 <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
                    <ShieldCheck className="w-4 h-4 mr-1" /> AI Verified
                 </div>
               )}
             </div>
             <div className="grid grid-cols-4 gap-4">
               {productImages.map((img, idx) => (
                 <button 
                   key={img.id || idx} 
                   onClick={() => setMainImage(img.imageUrl)}
                   className={`aspect-square rounded-lg overflow-hidden border-2 text-left ${mainImage === img.imageUrl ? 'border-primary' : 'border-transparent hover:border-muted'}`}
                 >
                   <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
                 </button>
               ))}
             </div>
          </div>

          {/* Right Column: Info & AI Check */}
          <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  {product.series && (
                      <span className="bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">{product.series.name}</span>
                  )}
                  {product.series && product.manufacturer && <span>|</span>}
                  {product.manufacturer && (
                      <span>{product.manufacturer.name}</span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                   <div className="text-3xl font-bold">${product.priceMarket}</div>
                   <div className="flex gap-2">
                      <Button variant="outline" size="icon"><Share2 className="w-4 h-4"/></Button>
                      <Button variant="outline" size="icon"><Heart className="w-4 h-4"/></Button>
                   </div>
                </div>
                
                <div className="mt-4 prose text-sm text-muted-foreground">
                    <p>{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    {product.scale && <div><span className="font-semibold">Scale:</span> {product.scale}</div>}
                    {product.height && <div><span className="font-semibold">Height:</span> {product.height}cm</div>}
                    {product.material && <div><span className="font-semibold">Material:</span> {product.material}</div>}
                    {product.releaseDate && <div><span className="font-semibold">Released:</span> {product.releaseDate}</div>}
                </div>
             </div>

             <Separator />
             
             {/* Seller Info (Mocked) */}
             <div className="flex items-center gap-3">
               <Avatar className="h-10 w-10">
                 <AvatarFallback>{product.seller?.name?.charAt(0) || "S"}</AvatarFallback>
               </Avatar>
               <div>
                  <p className="font-semibold text-sm">{product.seller?.name || "Unknown Seller"}</p>
                  <p className="text-xs text-muted-foreground">Rating: {product.seller?.rating || "N/A"} / 5.0</p>
               </div>
               <Button variant="link" className="ml-auto text-xs">View Profile</Button>
             </div>

             <Separator />

             {/* AI Analysis Card - The Highlight */}
             <Card className={`border-2 ${aiAnalysis.authenticityScore > 80 ? 'border-green-500/50 bg-green-50/50 dark:bg-green-950/10' : 'border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-950/10'}`}>
                <CardHeader>
                   <CardTitle className="flex items-center gap-2">
                      <ShieldCheck className={`w-6 h-6 ${aiAnalysis.authenticityScore > 80 ? 'text-green-600' : 'text-yellow-600'}`} />
                      AI Authenticity Check
                   </CardTitle>
                   <CardDescription>
                     Analyzed on {new Date(aiAnalysis.analyzedAt).toLocaleDateString()}
                   </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                   {/* Score & Status */}
                   <div className="space-y-2">
                      <div className="flex justify-between items-center">
                         <span className="font-medium text-sm">Authenticity Score</span>
                         <span className={`font-bold ${aiAnalysis.authenticityScore > 80 ? 'text-green-600' : 'text-yellow-600'}`}>{aiAnalysis.authenticityScore}%</span>
                      </div>
                      <Progress value={aiAnalysis.authenticityScore} className="h-2" />
                      
                      <div className="flex items-start gap-2 mt-4">
                        {aiAnalysis.authenticityScore > 80 ? (
                           <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                        ) : (
                           <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                        )}
                        <div>
                           <p className="font-semibold">{aiAnalysis.status}</p>
                           <p className="text-sm text-muted-foreground">{aiAnalysis.confidence} Confidence</p>
                           {aiAnalysis.reason && (
                             <p className="text-sm text-red-500 mt-1">{aiAnalysis.reason}</p>
                           )}
                        </div>
                      </div>
                   </div>

                   <Separator className="bg-border/50" />

                   {/* Price Analysis */}
                   <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                         <TrendingUp className="w-4 h-4 text-muted-foreground" />
                         Market Price Analysis
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-3 bg-background rounded-lg border">
                            <p className="text-xs text-muted-foreground">Suggested Range</p>
                            <p className="font-semibold">${aiAnalysis.suggestedPriceRange.min.toFixed(2)} - ${aiAnalysis.suggestedPriceRange.max.toFixed(2)}</p>
                         </div>
                         <div className="p-3 bg-background rounded-lg border">
                            <p className="text-xs text-muted-foreground">This Listing</p>
                            <p className={`font-semibold ${product.priceMarket > aiAnalysis.suggestedPriceRange.max ? 'text-red-500' : 'text-green-600'}`}>
                               ${product.priceMarket}
                               {product.priceMarket > aiAnalysis.suggestedPriceRange.max && " (High)"}
                               {product.priceMarket < aiAnalysis.suggestedPriceRange.min && " (Good Deal)"}
                            </p>
                         </div>
                      </div>
                   </div>
                </CardContent>
             </Card>

             {/* Actions */}
             <div className="flex flex-col gap-3">
                
               <Button 
                className="w-full h-12 text-lg" 
                onClick={handleAddToCart}
                disabled={addingToCart || listings.length === 0}
               >
                   {addingToCart ? "Adding..." : (listings.length > 0 ? "Add to Cart" : "Out of Stock")}
               </Button>
               
                <Button variant="outline" className="w-full">Make Offer</Button>
             </div>
             
             {/* Security Note */}
             <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                <ShieldCheck className="w-3 h-3" />
                <span>Protected by FigureCheck Buyer Guarantee</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default ProductDetailPage;
