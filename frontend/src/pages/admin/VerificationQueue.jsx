import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const mockPendingProducts = [
  {
    id: "p1",
    name: "One Piece Monkey D. Luffy Gear 5",
    seller: "Nam Nguyen",
    submittedAt: "2024-03-20T10:30:00",
    aiScore: 94,
    price: 150,
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=100"
  },
  {
    id: "p2",
    name: "Hatsune Miku NT",
    seller: "Tran Van A",
    submittedAt: "2024-03-20T09:15:00",
    aiScore: 88,
    price: 200,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=100"
  },
];

const VerificationQueue = () => {
  return (
    <div className="space-y-6">
       <div>
         <h1 className="text-3xl font-bold tracking-tight">Verification Queue</h1>
         <p className="text-muted-foreground">Review and approve pending product listings.</p>
       </div>

       <Card>
         <CardContent className="p-0">
           <Table>
             <TableHeader>
               <TableRow>
                 <TableHead>Product</TableHead>
                 <TableHead>Seller</TableHead>
                 <TableHead>AI Authenticity</TableHead>
                 <TableHead>Price</TableHead>
                 <TableHead>Submitted</TableHead>
                 <TableHead className="text-right">Actions</TableHead>
               </TableRow>
             </TableHeader>
             <TableBody>
               {mockPendingProducts.map((product) => (
                 <TableRow key={product.id}>
                   <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                         <img src={product.image} alt="" className="h-10 w-10 rounded-md object-cover bg-muted" />
                         <span>{product.name}</span>
                      </div>
                   </TableCell>
                   <TableCell>{product.seller}</TableCell>
                   <TableCell>
                      <Badge variant={product.aiScore > 90 ? "default" : "secondary"}>
                         {product.aiScore}%
                      </Badge>
                   </TableCell>
                   <TableCell>${product.price}</TableCell>
                   <TableCell>{new Date(product.submittedAt).toLocaleDateString()}</TableCell>
                   <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                   </TableCell>
                 </TableRow>
               ))}
             </TableBody>
           </Table>
         </CardContent>
       </Card>
    </div>
  );
};

export default VerificationQueue;
