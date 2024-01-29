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
interface AddProductPageProps {

}

const page: FC<AddProductPageProps> = ({ }) => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        price: z.number().int(),
        rating: z.number().lt(5),
        image: z.string(),
        qty: z.number().int(),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            rating: 0,
            image: "",
            qty: 0
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    

    const onSubmit = async (values: z.infer<typeof formSchema>)  => {
        try {
            setIsLoading(true)
            await fetch (`${apiUrl}/products`, {
                method: "POST",
                mode:"no-cors",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            })

        } catch (error) {
            setIsLoading(false);
            toast({
              title: "Error",
              description: "Please Try Again",
            });
            console.log(error);
        }
        console.log(values)
    }
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
                                    <Input placeholder="Enter price" {...field} />
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
                                    <Input placeholder="Enter rating" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select Image</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Select image" {...field} />
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
                                    <Input placeholder="Enter rating" {...field} />
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