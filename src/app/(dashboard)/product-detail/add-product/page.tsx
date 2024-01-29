"use client"
import React, { FC, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from '@/components/ui/use-toast';
import { fromTheme } from 'tailwind-merge';
import { log } from 'console';
interface AddProductPageProps {

}



const page: FC<AddProductPageProps> = ({ }) => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const MAX_FILE_SIZE = 5000000;
    const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const formSchema = z.object({
        name: z.string({ required_error: "name required" }),
        description: z.string(),
        price: z.string(),
        rating: z.string(),
        image: z
            .custom<File>((v) => v instanceof File, {
                message: 'Image is required',
            }),
        qty: z.string(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    const [isLoading, setIsLoading] = useState(false);




    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("rating", values.rating);
        formData.append("image", values.image);
        formData.append("qty", values.qty);

        try {
            setIsLoading(true);
            const response = await fetch(`${apiUrl}/products`, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });

            if (response.ok) {
              
                await router.push("/"); // Redirect to the products page, for example
                
            } else {
                toast({
                    title: "Error",
                    description: "Failed to add product. Please try again.",

                });
                return
            }
        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",
            });
            console.error(error);
        }

        console.log(values);

    };


    return (
        <div>
            <div className='mb-2'>Tambah Product</div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your Product Name" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    {/* <Input placeholder="Enter your Description" {...field} /> */}
                                    <Textarea placeholder="Type your description here." {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Enter price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rating</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Enter rating" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { ref, name, onBlur, onChange } }) => (
                            <FormItem>
                                <FormLabel>Select Image</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Select image" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        onChange(e.target.files?.[0]);
                                        //setImagePreview(file ? URL.createObjectURL(file) : null);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name="qty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="Enter Quantity" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button>
                        Save
                    </Button>

                </form>
            </Form>
        </div>
    )
}

export default page;