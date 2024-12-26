"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { IoMail } from "react-icons/io5";

type SignupFormData = {
  email: string;
  password: string;
  agreeToTerms: boolean;
};

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      console.log("Form submitted:", data);
      onClose();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
        <DialogTitle className="sr-only">
          Create your Faithful Match account
        </DialogTitle>

        <div className="space-y-4 px-8 py-4">
          <div>
            <h2 className="text-[28px] font-outfit font-semibold text-black">
              Create an account 👩‍💻
            </h2>
            <p className="text-base font-outfit font-normal text-gray-600 mt-4">
              Create your account in seconds. We&apos;ll help you find your
              perfect match.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block font-outfit font-semibold text-base mb-1"
              >
                Email
              </label>
              <div className="relative">
                <IoMail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 px-14 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Email"
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p
                  id="email-error"
                  className="text-error text-sm mt-1"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-outfit font-semibold text-base mb-1"
              >
                Password
              </label>
              <div className="relative">
                <IoIosLock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 px-14 rounded-md focus:outline-none focus:border-primary"
                  placeholder="Password"
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  className="text-error text-sm mt-1"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 mt-4">
              <Checkbox
                id="agreeToTerms"
                {...register("agreeToTerms", {
                  required: "You must agree to the Privacy Policy",
                })}
                className="w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="agreeToTerms"
                className="font-outfit font-semibold text-base"
              >
                I agree to Faithful Match{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p id="terms-error" className="text-error text-sm" role="alert">
                {errors.agreeToTerms.message}
              </p>
            )}

            <button
              type="submit"
              className="mt-12 w-full bg-primary text-white py-3 px-4 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
