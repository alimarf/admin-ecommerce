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
import { signInFormSchema } from "@/lib/form-schema";
import React, { FC, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

interface SignInPageProps {}

const SignInPage: FC<SignInPageProps> = ({}) => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const onSubmit = async (val: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);
    const authenticated = await signIn("credentials", {
      ...val,
      redirect: false,
    });

    console.log(authenticated);

    if (authenticated?.error) {
      setIsLoading(false);
      toast({
        title: "Sign In Failed",
        description: "Email or Password maybe wrong",
      });

      return;
    }

    await router.push("/");
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="mb-2 text-4xl font-semibold text-center">
          Admin Panel
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-5"
          >
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
                "SignIn"
              )}
            </Button>

            <div className="text-sm text-center">
              Don`t have an account{" "}
              <Link href="/auth/signup" className="text-primary">
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInPage;
