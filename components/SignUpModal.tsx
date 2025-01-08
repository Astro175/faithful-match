/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import Link from "next/link";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { VerifyOtpModal } from "./verifyOtpModal";

type SignupFormData = {
  email: string;
  password: string;
  agreeToTerms: boolean;
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignupModal = ({ isOpen, onClose }: ModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { loaded: clerkLoaded } = useClerk();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      agreeToTerms: false,
    },
  });

  const termsAccepted = watch("agreeToTerms");

  const handleCheckboxChange = (checked: boolean) => {
    setValue("agreeToTerms", checked, { shouldValidate: true });
  };

  const onSubmit = async (data: SignupFormData) => {
    if (!signUpLoaded || !clerkLoaded) {
      console.error("Clerk not loaded");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      setEmailAddress(data.email);

      const result = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (result.status === "complete") {
        // Handle the case where no verification is needed
        onClose();
        return;
      }

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setShowVerifyModal(true);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationComplete = () => {
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showVerifyModal} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
          <DialogTitle className="sr-only">Create an account ‍👩‍💻</DialogTitle>

          {!signUpLoaded || !clerkLoaded ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="space-y-4 px-8 py-4">
              <h1 className="font-outfit font-semibold text-3xl">
                Create an account ‍👩‍💻
              </h1>
              <p className="font-outfit text-base">
                Create your account in seconds. We&apos;ll help you find your
                perfect match.
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
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
                    />
                  </div>
                  {errors.email && (
                    <p className="text-error text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
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
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-error text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Checkbox
                    id="agreeToTerms"
                    checked={termsAccepted}
                    onCheckedChange={handleCheckboxChange}
                    className="w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="font-outfit font-semibold text-base"
                  >
                    I agree to Faithful Match{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-error text-sm mt-1">
                    {errors.agreeToTerms.message}
                  </p>
                )}

                {error && <p className="text-error text-sm mt-4">{error}</p>}

                <button
                  type="submit"
                  disabled={isLoading || !termsAccepted}
                  className="mt-12 w-full bg-primary text-white py-3 px-4 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Continue"}
                </button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <VerifyOtpModal
        isOpen={showVerifyModal}
        onClose={() => setShowVerifyModal(false)}
        onVerificationComplete={handleVerificationComplete}
        emailAddress={emailAddress}
      />
    </>
  );
};
