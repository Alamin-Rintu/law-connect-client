"use client";

import {
  Button,
  Form,
  Input,
  Label,
  Surface,
  TextField,
  Link,
  Description,
  Separator,
} from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries());

    await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
  };

  return (
    <div className="flex h-screen w-screen font-sans">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#0d162a] text-white p-16 flex-col justify-center">
        <h1 className="text-5xl font-bold leading-tight mb-6">
          Welcome Back 👋
        </h1>
        <p className="text-xl opacity-80 max-w-md">
          Sign in to continue managing your dashboard, clients, and workflows in
          one secure place.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <Surface className="w-full max-w-md p-8 rounded-2xl shadow-sm border border-gray-100">
          <Form onSubmit={onSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Sign in</h2>
              <Description className="text-gray-600 mt-1">
                Enter your credentials to continue
              </Description>
            </div>

            {/* Email */}
            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="you@example.com" variant="bordered" />
            </TextField>

            {/* Password */}
            <TextField isRequired name="password" type="password">
              <Label>Password</Label>
              <Input placeholder="••••••••" variant="bordered" />
            </TextField>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-sm text-blue-600">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-[#0d162a] text-white py-3 text-lg rounded-lg"
            >
              Sign in
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <Separator className="flex-1" />
              <span className="text-xs text-gray-400">OR</span>
              <Separator className="flex-1" />
            </div>

            {/* Google Login */}
            <Button
              variant="bordered"
              className="w-full flex items-center justify-center gap-2 py-3"
              onClick={() => authClient.signIn.social({ provider: "google" })}
            >
            <FcGoogle/>
              Continue with Google
            </Button>

            {/* Signup */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-medium">
                Create account
              </Link>
            </p>
          </Form>
        </Surface>
      </div>
    </div>
  );
}
