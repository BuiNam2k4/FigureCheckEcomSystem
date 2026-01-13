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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888';

const BrowsePage = () => {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('best-match');
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        minPrice: 0,
        maxPrice: 2000,
        condition: '', // API filter
        categories: [], // Client-side filter
        manufacturers: [], // Client-side filter
        series: [], // Client-side filter
        page: 1
    });

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalElements: 0
    });

    const [metadata, setMetadata] = useState({
        categories: [],
        manufacturers: [],
        series: []
    });

    // Fetch listings and metadata
    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch Metadata Parallel
                const [uniqueCats, uniqueMans, uniqueSeries] = await Promise.all([
                   fetch(`${API_BASE_URL}/api/categories`).then(res => res.json()),
                   fetch(`${API_BASE_URL}/api/manufacturers`).then(res => res.json()),
                   fetch(`${API_BASE_URL}/api/series`).then(res => res.json())
                ]);

                setMetadata({
                    categories: uniqueCats.result || [],
                    manufacturers: uniqueMans.result || [],
                    series: uniqueSeries.result || []
                });

                // Fetch Listings (Initial)
                // ... (Logic combined or kept separate? keeping separate for cleaner filter updates)
             } catch (e) {
                console.error("Failed to load metadata", e);
             }
        };
        fetchData();
    }, []);

    // Fetch listings from API (Keep this separate or merge? Keeping separate allows re-fetch on filter change without re-fetching metadata)
    React.useEffect(() => {
        const fetchListings = async () => {
            setIsLoading(true);
            try {
                // Construct Query Params
                const params = new URLSearchParams();
                if (filters.minPrice > 0) params.append('minPrice', filters.minPrice);
                if (filters.maxPrice < 2000) params.append('maxPrice', filters.maxPrice);
                if (filters.condition) params.append('condition', filters.condition);
                
                // Add array filters
                if (filters.categories.length > 0) {
                    filters.categories.forEach(cat => params.append('categories', cat));
                }
                if (filters.manufacturers.length > 0) {
                    filters.manufacturers.forEach(mf => params.append('manufacturers', mf));
                }
                if (filters.series.length > 0) {
                    filters.series.forEach(s => params.append('series', s));
                }
                
                // Add pagination params
                params.append('page', filters.page || 1);
                params.append('size', 12);

                const response = await fetch(`${API_BASE_URL}/api/listings?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch listings');
                }
                const data = await response.json();
                
                // Map API response
                // Backend now returns PageResponse wrapped in ApiResponse
                // result: { currentPage, totalPages, data: [...] }
                const resultData = data.result || {};
                const listingsData = resultData.data || [];
                
                setPagination({
                    currentPage: resultData.currentPage || 1,
                    totalPages: resultData.totalPages || 1,
                    totalElements: resultData.totalElements || 0
                });

                const mappedListings = listingsData.map(item => ({
                    id: item.listingId || item.id,
                    productId: item.productId,
                    name: item.productName || item.product?.name || item.name || "Unknown Figure", 
                    price: item.price,
                    condition: item.condition,
                    images: item.images?.map(img => img.imageUrl) || [item.imageUrl] || [], 
                    series: item.series || item.product?.series?.name || "Unknown Series", 
                    manufacturer: item.manufacturer || item.product?.manufacturer?.name || "Unknown Manufacturer",
                    aiAnalysis: { authenticityScore: 90 },
                    seller: {
                        name: item.seller?.username || `Seller #${item.sellerId ? item.sellerId.substring(0,8) : 'Unknown'}`, 
                        rating: 4.8
                    }
                }));

                setListings(mappedListings);
            } catch (err) {
                console.error("Error fetching listings:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchListings();
    }, [filters]); 

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setFilters(prev => ({ ...prev, page: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }; 

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
                            <FilterSidebar 
                                filters={filters} 
                                setFilters={setFilters} 
                                categories={metadata.categories}
                                manufacturers={metadata.manufacturers}
                                series={metadata.series}
                            />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Top Toolbar */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-800">
                            <div className="text-sm text-gray-400">
                                Showing <span className="text-white font-medium">{displayListings.length}</span> of <span className="text-white font-medium">{pagination.totalElements}</span> figures
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
                        
                        {/* Pagination Controls */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                                    disabled={pagination.currentPage === 1}
                                    className="border-gray-700 bg-transparent hover:bg-gray-800"
                                >
                                    Previous
                                </Button>
                                
                                {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                                    // Logic for sliding window or simplified for now (first 5 pages)
                                    // A better implementation would be a proper pagination component
                                    // For now, let's just show up to 5 pages or all if less
                                    let pageNum = i + 1;
                                    if(pagination.totalPages > 5 && pagination.currentPage > 3) {
                                         // simplified sliding: start from current - 2, but max is total
                                         pageNum = pagination.currentPage - 2 + i;
                                    }
                                    // Clamp
                                    if (pageNum > pagination.totalPages) return null;
                                    if (pageNum < 1) return null;

                                    return (
                                    <Button
                                        key={pageNum}
                                        variant={pageNum === pagination.currentPage ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(pageNum)}
                                        className={pageNum === pagination.currentPage 
                                            ? "bg-white text-black hover:bg-gray-200" 
                                            : "border-gray-700 bg-transparent hover:bg-gray-800 text-gray-400"
                                        }
                                    >
                                        {pageNum}
                                    </Button>
                                )})}

                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="border-gray-700 bg-transparent hover:bg-gray-800"
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default BrowsePage;
