"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { signUpFormSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";


interface SignUpPageProps {}

const SignUpPage: FC<SignUpPageProps> = ({}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  const [isLoading, setIsLoading] = useState(false);


  
  const onSubmit = async (val: z.infer<typeof signUpFormSchema>) => {
    try {
      setIsLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        mode: 'no-cors',
        body: JSON.stringify(val),
      });

      await router.push("/auth/signin");
    } catch (error) {
      console.log('ERROR Signup', error);
      setIsLoading(false);
      toast({
        title: "Error",
        description: "Please Try Again",
      });

    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="mb-2 text-2xl font-semibold text-center">Sign Up</div>
        <div className="text-sm text-gray-500">
          Create your admin account to manage products
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            
            <Button className="w-full">
              {isLoading ? (
                <ClipLoader
                  color="#ffffff"
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Sign Up"
              )}
            </Button>

            <div className="text-sm text-center">
              Already have an account{" "}
              <Link href="/auth/signin" className="text-primary">
                Sign In
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;
