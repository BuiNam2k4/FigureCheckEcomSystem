import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

import { fetchProductById } from '../../services/productService';
import { useState, useEffect } from 'react';

const CartItem = ({ item, onRemove }) => {
  const { listing } = item;
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
        if (listing && listing.productId) {
            try {
                const product = await fetchProductById(listing.productId);
                setProductDetails(product);
            } catch (error) {
                console.error("Failed to fetch product for cart item", error);
            }
        }
    };
    loadProduct();
  }, [listing]);

  if (!listing) return null;

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Thumbnail */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted/40">
        {productDetails?.images?.[0]?.imageUrl ? (
            <img
              src={productDetails.images[0].imageUrl}
              alt={productDetails.name}
              className="h-full w-full object-cover object-center"
            />
        ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                No Image
            </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="grid gap-1">
            <h3 className="font-medium text-base line-clamp-2 md:line-clamp-1">
                {productDetails?.name || "Loading..."}
            </h3>
            <p className="text-sm text-muted-foreground">{productDetails?.series?.name || "Series Unknown"}</p>
            <p className="text-sm text-muted-foreground">Condition: {listing.condition}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
            <p className="font-semibold">${listing.price.toFixed(2)}</p>
            <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => onRemove(item.id)}
            >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
            </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
