import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, name, priceMarket, images, condition, aiAnalysis } = product;
  
  const getStatusBadge = (status) => {
    switch (status) {
      case "Verified Authentic":
        return (
          <Badge className="bg-green-600 hover:bg-green-700 gap-1 absolute top-2 right-2">
            <CheckCircle className="w-3 h-3" /> Verified
          </Badge>
        );
      case "Potentially Fake":
        return (
          <Badge variant="destructive" className="gap-1 absolute top-2 right-2">
            <AlertTriangle className="w-3 h-3" /> Suspicious
          </Badge>
        );
      default:
        return (
            <Badge variant="secondary" className="gap-1 absolute top-2 right-2">
            <HelpCircle className="w-3 h-3" /> Unverified
          </Badge>
        );
    }
  };

  return (
    <Link to={`/product/${id}`} className="block h-full pt-8 group">
      <Card className="h-full overflow-visible relative transition-all duration-300 hover:shadow-xl hover:border-primary/50">
        <div className="relative aspect-square -mt-8 mx-4 rounded-xl overflow-hidden bg-background shadow-lg border group-hover:scale-105 transition-transform duration-300">
          <img 
            src={images[0]?.imageUrl || images[0]} 
            alt={name} 
            className="object-contain w-full h-full p-2 bg-white" 
            loading="lazy"
          />
          {getStatusBadge(aiAnalysis?.status)}
        </div>
        
        <CardContent className="p-4 pt-6 text-center">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">{condition}</div>
          <h3 className="font-bold text-lg line-clamp-1 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl font-extrabold text-primary">${priceMarket}</span>
            <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded">USD</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
