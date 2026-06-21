"use client";
import {
  Button,
  Description,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  Link,
  Separator,
  FieldError,
} from "@heroui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [role, setRole] = useState("Client");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log("Form data:", user, "Selected role:", role);

    // Password match check
    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await authClient.signUp.email({
        ...user,
        role: role.toLowerCase(),
      });
      toast.success("Account created successfully!", {
        position: "bottom-center",
      });

      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast.error("Signup failed!");
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      
    });
  };

  return (
    <div className="container mx-auto flex h-screen w-screen font-sans">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#0d162a] p-16 text-white flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          The modern way to hire legal counsel.
        </h1>
        <p className="text-xl opacity-90 leading-relaxed max-w-md">
          Vetted attorneys, transparent fees, and secure payments — all in one
          workspace.
        </p>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <Surface className="w-full max-w-lg p-0 bg-white">
          <Form onSubmit={onSubmit} className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Create your account
            </h2>

            <Description className="text-gray-600 mb-6">
              Join as a client or list your practice.
            </Description>

            {/* Name */}
            <TextField isRequired name="name">
              <Label>Full name</Label>
              <Input placeholder="John Doe" variant="bordered" />
            </TextField>

            {/* Email */}
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="john@example.com" variant="bordered" />
            </TextField>
            {/* photo url */}
                  {/* Photo URL */}
            <TextField
              isRequired
              name="image"
              type="url"
              validate={(value) => {
                if (!value.startsWith("http")) {
                  return "Please enter a valid URL";
                }
                return null;
              }}
            >
              <Label>Photo URL</Label>

              <Input
                placeholder="Enter your photo URL"
                className={{
                  inputWrapper:
                    "rounded-xl border border-default-200 shadow-sm",
                }}
              />

              <FieldError />
            </TextField>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input variant="bordered" />
              </TextField>

              <TextField isRequired name="confirmPassword" type="password">
                <Label>Confirm</Label>
                <Input variant="bordered" />
              </TextField>
            </div>

            {/* Role */}
            <div>
              <Label>I am a...</Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => setRole("Client")}
                  className={`border-2 rounded-xl p-6 text-left transition ${
                    role === "Client"
                      ? "border-[#0d162a] bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <h4 className="font-semibold">Client</h4>
                  <p className="text-sm text-gray-600">
                    Looking to hire counsel
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("Lawyer")}
                  className={`border-2 rounded-xl p-6 text-left transition ${
                    role === "Lawyer"
                      ? "border-[#0d162a] bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <h4 className="font-semibold">Lawyer</h4>
                  <p className="text-sm text-gray-600">List your practice</p>
                </button>
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#0d162a] text-white py-3 text-lg"
            >
              Create account
            </Button>

            {/* OR */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Google */}
            <Button
              onclick={handleGoogleSignIn}
              variant="bordered"
              className="w-full flex items-center gap-2"
              onClick={() => authClient.signIn.social({ provider: "google" })}
            >
              <FcGoogle />
              Continue with Google
            </Button>

            {/* Login */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/signin" className="text-blue-700 font-semibold">
                Sign in
              </Link>
            </p>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
