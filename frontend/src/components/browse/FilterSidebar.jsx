import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters, categories = [], manufacturers = [], series = [] }) => {
    // Helper to handle condition toggle
    const handleConditionChange = (condition, checked) => {
        setFilters(prev => ({
            ...prev,
            condition: checked ? condition : (prev.condition === condition ? '' : prev.condition)
        }));
    };

    // Helper for array filters (manufacturers, series)
    const handleArrayFilter = (type, value, checked) => {
        setFilters(prev => {
            const current = prev[type] || [];
            if (checked) {
                return { ...prev, [type]: [...current, value] };
            } else {
                return { ...prev, [type]: current.filter(item => item !== value) };
            }
        });
    };

    return (
        <div className="w-full space-y-6">
            {/* AI Verified Highlight */}
            <div className="bg-gradient-to-r from-emerald-900/50 to-emerald-800/20 p-4 rounded-lg border border-emerald-500/30">
                <div className="flex items-center space-x-2">
                    <Checkbox id="ai-verified" className="border-emerald-500 data-[state=checked]:bg-emerald-500 text-white" />
                    <Label 
                        htmlFor="ai-verified" 
                        className="text-sm font-bold text-emerald-400 cursor-pointer uppercase tracking-wide"
                    >
                        ✅ AI Verified Only
                    </Label>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={["price", "condition", "categories", "manufacturers"]} className="w-full">
                {/* Price Range */}
                <AccordionItem value="price" className="border-gray-800">
                    <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-2 px-2 pb-4 space-y-4">
                            <Slider 
                                defaultValue={[0, 2000]} 
                                value={[filters.minPrice, filters.maxPrice]}
                                max={2000} 
                                step={10} 
                                className="py-4" 
                                onValueChange={(val) => setFilters(prev => ({ ...prev, minPrice: val[0], maxPrice: val[1] }))}
                            />
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Min</span>
                                    <Input 
                                        type="number" 
                                        value={filters.minPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }))}
                                        className="h-8 bg-muted border-none" 
                                    />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Max</span>
                                    <Input 
                                        type="number" 
                                        value={filters.maxPrice}
                                        onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                                        className="h-8 bg-muted border-none" 
                                    />
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Condition */}
                <AccordionItem value="condition" className="border-gray-800">
                    <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">Condition</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-1">
                            {['NEW', 'LIKE_NEW', 'USED', 'DAMAGED'].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={item} 
                                        checked={filters.condition === item}
                                        onCheckedChange={(checked) => handleConditionChange(item, checked)}
                                        className="border-gray-600 data-[state=checked]:bg-primary" 
                                    />
                                    <Label htmlFor={item} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {item.replace('_', ' ')}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Categories */}
                <AccordionItem value="categories" className="border-gray-800">
                    <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3 pt-1">
                            {categories.map((cat) => (
                                <div key={cat.id || cat.name} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`cat-${cat.id}`} 
                                        checked={filters.categories.includes(cat.name)}
                                        onCheckedChange={(checked) => handleArrayFilter('categories', cat.name, checked)}
                                        className="border-gray-600 data-[state=checked]:bg-primary" 
                                    />
                                    <Label htmlFor={`cat-${cat.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {cat.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Manufacturers */}
                <AccordionItem value="manufacturers" className="border-gray-800">
                    <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">Manufacturers</AccordionTrigger>
                    <AccordionContent>
                        <div className="relative mb-3">
                             <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                             <Input placeholder="Search brand..." className="h-7 pl-7 bg-muted/50 border-none text-xs" />
                        </div>
                        <div className="space-y-3 pt-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {manufacturers.map((mf) => (
                                <div key={mf.id || mf.name} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`mf-${mf.id}`} 
                                        checked={filters.manufacturers?.includes(mf.name)}
                                        onCheckedChange={(checked) => handleArrayFilter('manufacturers', mf.name, checked)}
                                        className="border-gray-600 data-[state=checked]:bg-primary" 
                                    />
                                    <Label htmlFor={`mf-${mf.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {mf.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
                
                 {/* Series */}
                 <AccordionItem value="series" className="border-gray-800">
                    <AccordionTrigger className="text-gray-200 hover:text-white hover:no-underline">Series</AccordionTrigger>
                    <AccordionContent>
                         <div className="relative mb-3">
                             <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                             <Input placeholder="Search series..." className="h-7 pl-7 bg-muted/50 border-none text-xs" />
                        </div>
                        <div className="space-y-3 pt-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                            {series.map((s) => (
                                <div key={s.id || s.name} className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={`series-${s.id}`} 
                                        checked={filters.series?.includes(s.name)}
                                        onCheckedChange={(checked) => handleArrayFilter('series', s.name, checked)}
                                        className="border-gray-600 data-[state=checked]:bg-primary" 
                                    />
                                    <Label htmlFor={`series-${s.id}`} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {s.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FilterSidebar;
