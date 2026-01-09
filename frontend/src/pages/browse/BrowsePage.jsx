import React, { useState } from 'react';
import { 
    LayoutGrid, 
    List as ListIcon, 
    ChevronDown,
    Search
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue, 
} from "@/components/ui/select";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import FilterSidebar from '../../components/browse/FilterSidebar';
import BrowseListingCard from '../../components/browse/BrowseListingCard';
// import { products } from '../../data/mockData';

const BrowsePage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('best-match');
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch listings from API
    React.useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('http://localhost:8888/api/listings');
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await response.json();
                
                // Map API response to the structure expected by BrowseListingCard
                // Assuming data.result is the array of listings
                const mappedListings = (data.result || []).map(item => ({
                    id: item.listingId || item.id,
                    productId: item.productId, // Ensure productId is passed for linking
                    name: item.productName || item.product?.name || item.name || "Unknown Figure", 
                    price: item.price,
                    condition: item.condition,
                    images: item.images?.map(img => img.imageUrl) || [item.imageUrl] || [], 
                    series: item.series || item.product?.series?.name || "Unknown Series", 
                    manufacturer: item.manufacturer || item.product?.manufacturer?.name || "Unknown Manufacturer",
                    aiAnalysis: { authenticityScore: 90 }, // Mock AI score for now as it might not be in basic listing
                    seller: {
                        name: item.seller?.username || `Seller #${item.sellerId ? item.sellerId.substring(0,8) : 'Unknown'}`, 
                        rating: 4.8 // Mock rating
                    }
                }));

                setListings(mappedListings);
            } catch (err) {
                console.error("Error fetching listings:", err);
                setError(err.message);
                // Fallback to empty or keep loading false
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading figures...</p>
                </div>
            </div>
        );
    }
    
    // Use listings from API, fall back to empty array if error
    const displayListings = listings;

    return (
        <div className="min-h-screen bg-[#121212] text-white">
             {/* Header Section (could be part of main layout but customizing here for specific feel) */}
             <div className="bg-[#1E1E1E] border-b border-gray-800 py-6">
                <div className="container px-4 md:px-6">
                    <Breadcrumb className="mb-4 text-gray-400">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="hover:text-white">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-white font-medium">Browse Figures</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-2">All Figures</h1>
                    <p className="text-gray-400">Discover rare and authentic anime figures from verified sellers.</p>
                </div>
             </div>

            <div className="container px-4 md:px-6 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Area */}
                    <aside className="w-full lg:w-1/4 hidden lg:block">
                        <div className="sticky top-24">
                            <h2 className="text-lg font-semibold mb-4 px-1">Filters</h2>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Top Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                            <div className="text-sm text-gray-400">
                                Showing <span className="text-white font-medium">{displayListings.length}</span> figures
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-400 hidden sm:inline-block">Sort by:</span>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[180px] bg-[#1E1E1E] border-gray-700 text-white">
                                            <SelectValue placeholder="Best Match" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#1E1E1E] border-gray-700 text-white">
                                            <SelectItem value="best-match">Best Match</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                            <SelectItem value="newest">Newest Listed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center bg-[#1E1E1E] rounded-lg border border-gray-700 p-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className={`h-8 w-8 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                        onClick={() => setViewMode('grid')}
                                    >
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className={`h-8 w-8 rounded-md ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
                                        onClick={() => setViewMode('list')}
                                    >
                                        <ListIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                         {/* Mobile Filter Toggle */}
                         <div className="lg:hidden mb-6">
                            <Button variant="outline" className="w-full bg-[#1E1E1E] border-gray-700 text-white justify-between">
                                Filters & Sorting
                                <ChevronDown className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                        
                        {error && (
                             <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-lg mb-6 text-red-500 text-center">
                                Unable to load figures at this time.
                            </div>
                        )}

                        {/* Product Grid */}
                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
                            {displayListings.length > 0 ? (
                                displayListings.map((product) => (
                                    <BrowseListingCard key={product.id} product={product} />
                                ))
                            ) : (
                                !error && <div className="col-span-full text-center text-gray-500 py-12">No listings found.</div>
                            )}
                        </div>
                        
                        {/* Pagination (Mock) */}
                        <div className="mt-12 flex justify-center gap-2">
                             <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800" disabled>Previous</Button>
                             <Button variant="outline" className="bg-primary text-primary-foreground border-primary hover:bg-primary/90">1</Button>
                             <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">2</Button>
                             <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">3</Button>
                             <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">Next</Button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;
