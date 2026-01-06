import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, UploadCloud, X, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createProduct, fetchManufacturers, fetchSeries, fetchCategories, uploadImage } from '../../services/productService';
import { createListing } from '../../services/tradeService';

const formSchema = z.object({
  name: z.string().min(5, "Product name must be at least 5 characters"),
  condition: z.string().min(1, "Condition is required"),
  priceMarket: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number().gte(1, "Price must be at least $1")),
  description: z.string().min(10, "Please provide a detailed description"),
  manufacturerId: z.string().min(1, "Manufacturer is required"),
  seriesId: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  slug: z.string().min(1, "Slug is required"),
  scale: z.string().optional(),
  height: z.preprocess((a) => a ? parseFloat(z.string().parse(a)) : undefined, z.number().optional()),
  material: z.string().optional(),
  isReleased: z.boolean().default(true),
});

const SellerUploadPage = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [isAiChecking, setIsAiChecking] = useState(false);
    const [aiResult, setAiResult] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Dropdown Data States
    const [manufacturers, setManufacturers] = useState([]);
    const [seriesList, setSeriesList] = useState([]);
    const [categories, setCategories] = useState([]);

    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        priceMarket: "",
        description: "",
        manufacturerId: "",
        seriesId: "",
        categoryId: "",
        slug: "",
        scale: "",
        height: "",
        material: "",
        condition: "New",
        isReleased: true,
      },
    });

    // Generate slug from name
    const watchName = form.watch("name");
    useEffect(() => {
        if (watchName) {
            const slug = watchName.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            form.setValue("slug", slug);
        }
    }, [watchName, form]);



    // Load initial data
    useEffect(() => {
        const loadData = async () => {
            try {
                const [mfgData, seriesData, catData] = await Promise.all([
                    fetchManufacturers(),
                    fetchSeries(),
                    fetchCategories()
                ]);
                setManufacturers(mfgData || []);
                setSeriesList(seriesData || []);
                setCategories(catData || []);
            } catch (err) {
                console.error("Error loading dropdown data", err);
            }
        };
        loadData();
    }, []);

    const onDrop = useCallback((acceptedFiles) => {
        // Mock creating object URLs for preview
        const newImages = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setImages(prev => [...prev, ...newImages]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop, 
        accept: {'image/*': []},
        maxFiles: 5
    });

    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const runAiCheck = () => {
        if (images.length === 0) return;
        setIsAiChecking(true);
        setAiResult(null);

        // Simulate AI Analysis
        setTimeout(() => {
            setIsAiChecking(false);
            setAiResult({
                status: "Verified Authentic",
                confidence: 94,
                suggestedPrice: { min: 140, max: 170 },
                message: "Excellent! The manufacturer stamp matches our database. Box condition looks pristine."
            });
        }, 3000);
    };
  
    async function onSubmit(values) {
      if (images.length === 0) {
          alert("Please upload at least one image");
          return;
      }
      setIsSubmitting(true);
      
      try {
          // 1. Upload Images First
          const imageUploadPromises = images.map(file => uploadImage(file));
          const uploadedUrls = await Promise.all(imageUploadPromises);

          // 2. Prepare Payload with real URLs
          const payload = {
              name: values.name,
              priceMarket: values.priceMarket,
              description: `[Condition: ${values.condition}] ${values.description}`, // Append condition to description since backend has no field
              manufacturerId: parseInt(values.manufacturerId),
              categoryId: parseInt(values.categoryId),
              seriesId: values.seriesId && values.seriesId !== "null" ? parseInt(values.seriesId) : null,
              slug: values.slug,
              scale: values.scale,
              height: values.height,
              material: values.material,
              isReleased: values.isReleased,
              releaseDate: new Date().toISOString().split('T')[0],
              
              images: uploadedUrls.map((url, index) => ({
                  imageUrl: url,
                  isThumbnail: index === 0, // First image is thumbnail
                  type: "FRONT" // Default type
              }))
          };

          // 3. Create Product
          const newProduct = await createProduct(payload);
          
          // 4. Create Listing (Trade Service)
          const listingPayload = {
              productId: newProduct.id,
              price: values.priceMarket, // Using market price as selling price for now
              quantity: 1,
              condition: values.condition.toUpperCase().replace(" ", "_"), // Format to Enum if needed
              description: values.description,
              imageUrls: uploadedUrls
          };
          
          await createListing(listingPayload);
          
          navigate('/'); 
      } catch (error) {
          console.error("Submission failed", error);
          alert("Failed to create listing: " + error.message);
      } finally {
        setIsSubmitting(false);
      }
    }

  return (
    <div className="container max-w-3xl py-10 mx-auto">
      <div className="mb-8 space-y-2 text-center">
         <h1 className="text-3xl font-bold tracking-tight">Sell Your Figure</h1>
         <p className="text-muted-foreground">List your item for sale. Our AI will help verify it.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
          {/* Image Upload Section */}
          <div className="space-y-4">
               <div>
                  <h3 className="text-lg font-medium mb-1">Product Images</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload clear photos of the figure, box, and manufacturer stamps.</p>
               </div>
               
               <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}>
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-2">
                     <UploadCloud className="h-10 w-10 text-muted-foreground" />
                     {isDragActive ? (
                        <p className="font-medium text-primary">Drop images here</p>
                     ) : (
                        <div className="space-y-1">
                            <p className="font-medium">Click to upload or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (max 5 photos)</p>
                        </div>
                     )}
                  </div>
               </div>

               {/* Image Previews */}
               {images.length > 0 && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                       {images.map((file, index) => (
                           <div key={index} className="relative aspect-square rounded-lg overflow-hidden border bg-muted">
                               <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
                               <button 
                                 type="button"
                                 onClick={() => removeImage(index)}
                                 className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                               >
                                   <X className="h-3 w-3" />
                               </button>
                               {index === 0 && (
                                   <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] text-center py-1">
                                       Thumbnail
                                   </div>
                               )}
                           </div>
                       ))}
                   </div>
               )}

               {/* AI Pre-Check Button */}
               {images.length > 0 && !aiResult && (
                   <div className="mt-4">
                       <Button 
                         type="button" 
                         onClick={runAiCheck} 
                         disabled={isAiChecking}
                         className="w-full sm:w-auto gap-2"
                         variant="secondary"
                       >
                           {isAiChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                           {isAiChecking ? "Analyzing authenticity..." : "Run AI Pre-Check"}
                       </Button>
                       <p className="text-xs text-muted-foreground mt-2">
                           Get an instant authenticity opinion and price estimate before listing.
                       </p>
                   </div>
               )}

               {/* AI Result Card */}
               {aiResult && (
                   <Card className="mt-6 border-green-500/50 bg-green-50/50 dark:bg-green-950/10">
                       <CardContent className="pt-6">
                           <div className="flex items-start gap-4">
                               <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                   <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                               </div>
                               <div className="space-y-1">
                                   <h4 className="font-semibold text-green-700 dark:text-green-300">AI Status: {aiResult.status}</h4>
                                   <p className="text-sm text-green-800/80 dark:text-green-200/80">{aiResult.message}</p>
                                   <div className="flex gap-2 mt-2">
                                       <Badge variant="outline" className="border-green-600 bg-transparent text-green-700">
                                            {aiResult.confidence}% Confidence
                                       </Badge>
                                       <Badge variant="outline" className="border-green-600 bg-transparent text-green-700">
                                            Est. ${aiResult.suggestedPrice.min} - ${aiResult.suggestedPrice.max}
                                       </Badge>
                                   </div>
                               </div>
                           </div>
                       </CardContent>
                   </Card>
               )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. One Piece Monkey D. Luffy Gear 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                             <SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacturerId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select manufacturer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {manufacturers.map((mfg) => (
                             <SelectItem key={mfg.id} value={String(mfg.id)}>{mfg.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seriesId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Series (Optional)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select series" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {seriesList.map((series) => (
                             <SelectItem key={series.id} value={String(series.id)}>{series.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceMarket"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market Price ($USD)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (Auto-generated)</FormLabel>
                    <FormControl>
                      <Input placeholder="product-slug" {...field} readOnly className="bg-muted" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="scale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scale (e.g. 1/7)</FormLabel>
                    <FormControl>
                      <Input placeholder="1/7" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="25.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <FormControl>
                      <Input placeholder="PVC, ABS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="condition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Condition</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select condition" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="New">New / Sealed</SelectItem>
                        <SelectItem value="Like New">Like New (Opened)</SelectItem>
                        <SelectItem value="Used">Used / Displayed</SelectItem>
                        <SelectItem value="Damaged">Damaged / Missing Parts</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isReleased"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Already Released?
                      </FormLabel>
                      <FormDescription>
                        Uncheck if this is a pre-order item.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe any flaws, box condition, or extra details..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
          </div>

          <div className="flex gap-4 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => navigate('/')}>Cancel</Button>
              <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Listing Item...
                      </>
                  ) : "Create Listing"}
              </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SellerUploadPage;
