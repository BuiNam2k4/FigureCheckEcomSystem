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
    <Link to={`/product/${id}`}>
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img 
            src={images[0]?.imageUrl || images[0]} 
            alt={name} 
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105 p-2"
            loading="lazy"
          />
          {getStatusBadge(aiAnalysis?.status)}
        </div>
        
        <CardContent className="p-4">
          <div className="text-xs text-muted-foreground mb-1">{condition}</div>
          <h3 className="font-semibold line-clamp-2 min-h-[3rem] mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold">${priceMarket}</span>
            <span className="text-xs text-muted-foreground">USD</span>
          </div>
        </CardContent>
        {/* Footer could overlap or be omitted for cleaner look */}
      </Card>
    </Link>
  );
};

export default ProductCard;
