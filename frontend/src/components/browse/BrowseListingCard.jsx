import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Star } from 'lucide-react';

const BrowseListingCard = ({ product }) => {
    // Assuming product structure matches mockData or API response
    const isAiVerified = product.aiAnalysis?.authenticityScore > 80;

    return (
        <div className="group bg-[#1E1E1E] rounded-xl overflow-hidden hover:shadow-lg transition-all border border-transparent hover:border-gray-700 flex flex-col h-full">
            {/* Image Container with Quick Actions */}
            <div className="relative h-64 bg-gray-800 overflow-hidden">
                <img 
                    src={product.images?.[0]} 
                    alt={product.name} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                />
                
                {/* AI Badge */}
                {isAiVerified ? (
                     <span className="absolute top-2 left-2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-1 rounded-full shadow-md flex items-center gap-1">
                        ✅ AI Verified
                     </span>
                ) : (
                    <span className="absolute top-2 left-2 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                        Unverified
                    </span>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm">
                    <Heart className="h-4 w-4" />
                </button>
                
                {/* Quick View Overlay (Visible on Hover) */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                     <Link to={`/product/${product.productId || product.id}`} className="w-full">
                        <Button variant="secondary" size="sm" className="w-full bg-white text-black hover:bg-gray-200 font-medium">
                            Quick View
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                    <h3 className="text-white font-semibold truncate text-base mb-1" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-gray-400 text-xs mb-3 truncate">
                        {product.series} • {product.manufacturer}
                    </p>
                </div>
                
                <div className="flex justify-between items-end mt-2 pt-3 border-t border-gray-800">
                    <div>
                        <span className="text-xl font-bold text-white block leading-none mb-1">
                            ${product.price}
                        </span>
                        <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded inline-block">
                             {product.condition || "Pre-owned"}
                        </span>
                    </div>
                    
                    {/* Seller Info */}
                    {product.seller && (
                        <div className="flex items-center gap-2 text-right">
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-gray-300 font-medium">{product.seller.name}</span>
                                <div className="flex items-center text-[10px] text-yellow-500">
                                    <Star className="h-3 w-3 fill-current mr-0.5" />
                                    {product.seller.rating}
                                </div>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-gray-700 overflow-hidden border border-gray-600">
                                <img 
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.seller.name}`} 
                                    alt={product.seller.name}
                                    className="h-full w-full object-cover" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BrowseListingCard;
