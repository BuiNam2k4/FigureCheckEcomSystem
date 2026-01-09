import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

const FilterSidebar = () => {
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
                            <Slider defaultValue={[0, 1000]} max={2000} step={10} className="py-4" />
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Min</span>
                                    <Input type="number" placeholder="0" className="h-8 bg-muted border-none" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs text-muted-foreground">Max</span>
                                    <Input type="number" placeholder="2000" className="h-8 bg-muted border-none" />
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
                            {['New (Sealed)', 'Like New', 'Used (Good)', 'Damaged Box'].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox id={item} className="border-gray-600 data-[state=checked]:bg-primary" />
                                    <Label htmlFor={item} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {item}
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
                            {['Scale Figure', 'Nendoroid', 'Figma', 'Statue', 'Prize Figure'].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox id={item} className="border-gray-600 data-[state=checked]:bg-primary" />
                                    <Label htmlFor={item} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {item}
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
                            {['Good Smile Company', 'Alter', 'Kotobukiya', 'Max Factory', 'Aniplex', 'Bandai Spirits', 'MegaHouse'].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox id={item} className="border-gray-600 data-[state=checked]:bg-primary" />
                                    <Label htmlFor={item} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {item}
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
                            {['One Piece', 'Genshin Impact', 'Hololive', 'Fate/Grand Order', 'Demon Slayer', 'Jujutsu Kaisen', 'Evangelion'].map((item) => (
                                <div key={item} className="flex items-center space-x-2">
                                    <Checkbox id={item} className="border-gray-600 data-[state=checked]:bg-primary" />
                                    <Label htmlFor={item} className="text-sm text-gray-400 cursor-pointer hover:text-white transition-colors">
                                        {item}
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
