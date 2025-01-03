"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CollegeData, Program, Regulation } from "../@types/college";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useSignUp } from "../hooks/auth/useAuth";

const signUpSchema = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    role: z.enum(["Student", "Admin", "Uploader"]),
    collegeName: z.string().min(1, { message: "College name is required" }),
    program: z.string().min(1, { message: "Program is required" }),
    specialization: z
      .string()
      .min(1, { message: "Specialization is required" }),
    regulation: z.string().min(1, { message: "Regulation is required" }),
    yearOfJoining: z.number().int().min(1900).max(new Date().getFullYear()),
  })
  .superRefine((data, ctx) => {
    if (data.role === "Student") {
      if (!data.yearOfJoining) {
        ctx.addIssue({
          path: ["yearOfJoining"],
          message: "Year of Joining is required for Students",
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

type SignupRequest = z.infer<typeof signUpSchema>;

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
 
  const router = useRouter();

  const signUpForm = useForm<SignupRequest>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role: "Student",
      collegeName: "",
      program: "",
      specialization: "",
      regulation: "",
      yearOfJoining: new Date().getFullYear(),
    },
  });

  const signUpMutation = useSignUp();

  const onSignUpSubmit = async (data: SignupRequest) => {
    try {
      setIsLoading(true);
      setError(null); // Reset errors before submission
      sessionStorage.setItem("signup_email", data.email);
      await signUpMutation.mutateAsync(data);

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(false);

      router.push("/otp-verification");
    } catch (error: any) {
      setIsLoading(false);

      // Display the specific error message from the server
      if (error.message) {
        console.log("ERROR MESSAGE: ", error);
        setError(error.message); // Show the error from the backend
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  
   
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-[400px] shadow-lg">
        <CardHeader>
          <h2 className="text-center text-3xl font-bold">Student Sign Up</h2>
        </CardHeader>
        <CardContent>
          <Form {...signUpForm}>
            <form
              onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={signUpForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={signUpForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="name@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={signUpForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              placeholder="Your password"
                              className="pr-10" // Add padding to make space for the eye icon
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            >
                              {showPassword ? (
                                <Eye className='h-6 w-6 text-dark' />
                              ) : (
                                <EyeOff className='h-6 w-6 text-dark' />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:text-blue-700 hover:cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
