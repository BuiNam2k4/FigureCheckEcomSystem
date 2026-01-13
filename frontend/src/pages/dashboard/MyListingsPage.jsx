import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { getListingsByUser, deleteListing } from '../../services/tradeService';
import { Link } from 'react-router-dom';

const MyListingsPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            loadListings();
        }
    }, [isAuthenticated, user]);

    const loadListings = async () => {
        setIsLoading(true);
        try {
            const data = await getListingsByUser(user.id);
            // Ensure data is array
            setListings(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Failed to load listings", error);
            toast({ variant: "destructive", title: "Failed to load your listings" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await deleteListing(id);
            setListings(prev => prev.filter(l => l.id !== id));
            toast({ title: "Listing deleted" });
        } catch (error) {
            toast({ variant: "destructive", title: "Failed to delete listing" });
        }
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">My Listings</h2>
                <Link to="/sell">
                     <Button>Create New Listing</Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {listings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    You haven't listed any items yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            listings.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <div className="h-12 w-12 rounded-md overflow-hidden bg-muted border">
                                            <img 
                                                src={item.productThumbnail || (item.images && item.images[0]?.imageUrl)} 
                                                alt="Thumbnail" 
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium text-base">{item.productName}</div>
                                        <div className="text-sm text-muted-foreground line-clamp-1">{item.condition}</div>
                                    </TableCell>
                                    <TableCell className="font-bold">${item.price}</TableCell>
                                    <TableCell>
                                        <Badge variant={item.status === 'AVAILABLE' ? 'default' : 'secondary'}>
                                            {item.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link to={`/product/${item.productId}`}>
                                                <Button variant="ghost" size="icon" title="View Product">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyListingsPage;
