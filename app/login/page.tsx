"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { IoMail } from "react-icons/io5";
import { IoIosLock } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { FaApple } from "react-icons/fa";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://faithful-match.onrender.com/api/auth/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 w-full max-w-md mx-auto">
      <div className="flex flex-col items-center">
        <Image
          src="/logo-red.png"
          alt="Logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <h1 className="font-outfit text-lg mb-6">
          Let&apos;s jump right into your account!
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="font-outfit font-semibold text-lg">
            Email
          </Label>
          <div className="relative">
            <IoMail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              size={20}
            />
            <Input
              id="email"
              type="email"
              placeholder="Email"
              className="pl-10 py-6 w-full bg-[#FAFAFA] placeholder:text-[#9E9E9E]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="font-outfit font-semibold text-lg"
          >
            Password
          </Label>
          <div className="relative flex items-center justify-center">
            <IoIosLock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-black"
              size={20}
            />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 py-6 w-full bg-[#FAFAFA] placeholder:text-[#9E9E9E] "
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9E9E9E]"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#212121]" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-[#212121]">OR</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full py-6 border-[#EEEEEE] rounded-full font-outfit font-semibold"
        >
          <Image
            src="/google-icon.svg"
            alt="Google"
            className="mr-2 h-5 w-5"
            width={20}
            height={20}
          />
          Continue with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full py-6 border-[#EEEEEE] rounded-full font-outfit font-semibold"
        >
          <FaApple className="mr-2 h-5 w-5" />
          Continue with Apple
        </Button>

        <Button
          type="submit"
          className="w-full py-6 bg-primary text-white rounded-full font-outfit font-bold mt-4"
          disabled={loading}
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Login
        </Button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-bold text-primary">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
