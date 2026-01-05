import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

const CartItem = ({ item, onRemove }) => {
  const { product } = item;

  return (
    <div className="flex gap-4 py-4 border-b">
      {/* Thumbnail */}
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted/40">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between">
        <div className="grid gap-1">
            <h3 className="font-medium text-base line-clamp-2 md:line-clamp-1">
                {product.name}
            </h3>
            <p className="text-sm text-muted-foreground">{product.series}</p>
            <p className="text-sm text-muted-foreground">Condition: {product.condition}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
            <p className="font-semibold">${product.price.toFixed(2)}</p>
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
