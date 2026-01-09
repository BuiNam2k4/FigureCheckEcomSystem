import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Camera, ExternalLink } from 'lucide-react';
import { userProfile } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 characters"),
  bio: z.string().max(300, "Bio must not exceed 300 characters").optional(),
});

const ProfilePage = () => {
    const { user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [isLoading, setIsLoading] = useState(true);

    // Initial default values (will be updated after fetch)
    const initialDefaults = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.sub || user?.email || "", 
        phoneNumber: userProfile.phoneNumber, 
        bio: userProfile.bio,
    };

    const form = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: initialDefaults,
    });

    // Fetch latest user info from API on mount
    React.useEffect(() => {
        const loadUserProfile = async () => {
             const token = localStorage.getItem('token');
             if (token) {
                 try {
                     // Directly calling the API as requested
                     const response = await fetch('http://localhost:8888/identity/users/my-info', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                     });
                     if (response.ok) {
                         const data = await response.json();
                         const apiUser = data.result;
                         
                         // Update form with API data
                         form.reset({
                             firstName: apiUser.firstName || "",
                             lastName: apiUser.lastName || "",
                             email: apiUser.email || apiUser.username || "", // Username is often email in this system
                             phoneNumber: userProfile.phoneNumber, // Keep mock for now as API doesn't have it
                             bio: userProfile.bio, // Keep mock for now
                         });
                         console.log("Profile loaded from API:", apiUser);
                     }
                 } catch (error) {
                     console.error("Failed to load profile from API", error);
                 }
             }
             setIsLoading(false);
        };
        loadUserProfile();
    }, [form]);

    const onSubmit = async (values) => {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Updated Profile:", values);
        setIsSubmitting(false);
        alert("Profile updated successfully!");
    };

    const handlePhotoUpload = () => {
        // Simulate file input click
        alert("This would open file selection dialog.");
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
            
            {/* Avatar Section */}
            <div className="mb-8 flex items-center gap-6">
                <div className="relative">
                    <Avatar className="h-24 w-24">
                        <AvatarImage src={userProfile.avatar} alt="Profile" />
                            {initialDefaults.firstName?.[0]}{initialDefaults.lastName?.[0]}
                    </Avatar>
                    <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute bottom-0 right-0 rounded-full bg-background border shadow-sm h-8 w-8"
                        onClick={handlePhotoUpload}
                    >
                        <Camera className="h-4 w-4" />
                    </Button>
                </div>
                <div>
                    <h3 className="font-medium">Profile Photo</h3>
                    <p className="text-sm text-muted-foreground mt-1 mb-2">
                        We recommend an image of at least 400x400px.
                    </p>
                    <Button variant="outline" size="sm" onClick={handlePhotoUpload}>
                        Change Photo
                    </Button>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} disabled className="bg-muted" />
                                    </FormControl>
                                    <p className="text-[10px] text-muted-foreground">
                                        Managed by Identity Service
                                    </p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Collector Bio</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        placeholder="Tell us about your collection..." 
                                        className="resize-none" 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                                </>
                            ) : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProfilePage;
