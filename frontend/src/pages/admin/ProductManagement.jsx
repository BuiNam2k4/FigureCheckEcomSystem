import React, { useState, useEffect } from 'react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Trash2, Plus, Search, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { 
    fetchProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    fetchCategories,
    fetchManufacturers,
    fetchSeries
} from '../../services/productService';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        priceMarket: 0,
        categoryId: '',
        manufacturerId: '',
        seriesId: '',
        released: true,
        images: [] 
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [prods, cats, mans, sers] = await Promise.all([
                fetchProducts(),
                fetchCategories(),
                fetchManufacturers(),
                fetchSeries()
            ]);
            
            // Handle array vs ApiResponse wrapper
            const productList = Array.isArray(prods) ? prods : (prods.result || []);
            setProducts(productList);
            setCategories(Array.isArray(cats) ? cats : (cats.result || []));
            setManufacturers(Array.isArray(mans) ? mans : (mans.result || []));
            setSeries(Array.isArray(sers) ? sers : (sers.result || []));
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error loading data",
                description: "Failed to fetch necessary data."
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery) ||
        product.category?.name?.toLowerCase().includes(searchQuery) ||
        product.manufacturer?.name?.toLowerCase().includes(searchQuery)
    );

    const handleCreateClick = () => {
        setEditingProduct(null);
        setFormData({
            name: '',
            description: '',
            priceMarket: 0,
            categoryId: '',
            manufacturerId: '',
            seriesId: '',
            released: true,
            images: []
        });
        setIsDialogOpen(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            description: product.description || '',
            priceMarket: product.priceMarket,
            categoryId: product.category?.id?.toString() || '',
            manufacturerId: product.manufacturer?.id?.toString() || '',
            seriesId: product.series?.id?.toString() || '',
            released: product.isReleased,
            images: product.images?.map(img => img.imageUrl) || [] // Simplification
        });
        setIsDialogOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            await deleteProduct(id);
            setProducts(products.filter(p => p.id !== id));
            toast({ title: "Product deleted" });
        } catch (error) {
            toast({ variant: "destructive", title: "Failed to delete" });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const payload = {
                ...formData,
                priceMarket: Number(formData.priceMarket),
                categoryId: Number(formData.categoryId),
                manufacturerId: Number(formData.manufacturerId),
                seriesId: Number(formData.seriesId)
            };

            if (editingProduct) {
                await updateProduct(editingProduct.id, payload);
                toast({ title: "Product updated successfully" });
            } else {
                await createProduct(payload);
                toast({ title: "Product created successfully" });
            }
            
            setIsDialogOpen(false);
            loadData(); // Reload to refresh grid
        } catch (error) {
            toast({ 
                variant: "destructive", 
                title: "Operation failed",
                description: error.message
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <Button onClick={handleCreateClick} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Filter products..."
                        className="pl-8"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Manufacturer</TableHead>
                            <TableHead>Price (Market)</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" /> Loading...
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredProducts.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.name}</TableCell>
                                    <TableCell>{product.category?.name}</TableCell>
                                    <TableCell>{product.manufacturer?.name}</TableCell>
                                    <TableCell>${product.priceMarket}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(product)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDeleteClick(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input 
                                    id="name" 
                                    value={formData.name} 
                                    onChange={e => setFormData({...formData, name: e.target.value})} 
                                    required 
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Market Price ($)</Label>
                                <Input 
                                    id="price" 
                                    type="number" 
                                    value={formData.priceMarket} 
                                    onChange={e => setFormData({...formData, priceMarket: e.target.value})} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                             <Label htmlFor="category">Category</Label>
                             <Select 
                                value={formData.categoryId} 
                                onValueChange={val => setFormData({...formData, categoryId: val})}
                             >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                             </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="manufacturer">Manufacturer</Label>
                                <Select 
                                    value={formData.manufacturerId} 
                                    onValueChange={val => setFormData({...formData, manufacturerId: val})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select manufacturer" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {manufacturers.map(m => (
                                            <SelectItem key={m.id} value={m.id.toString()}>{m.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="series">Series</Label>
                                <Select 
                                    value={formData.seriesId} 
                                    onValueChange={val => setFormData({...formData, seriesId: val})}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select series" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {series.map(s => (
                                            <SelectItem key={s.id} value={s.id.toString()}>{s.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input 
                                id="description" 
                                value={formData.description} 
                                onChange={e => setFormData({...formData, description: e.target.value})} 
                            />
                        </div>

                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {editingProduct ? 'Save Changes' : 'Create Product'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProductManagement;
