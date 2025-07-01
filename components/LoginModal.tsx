"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { IoMail } from "react-icons/io5";
// import { supabase } from "@/lib/supabaseClient";

type LoginFormData = {
  email: string;
  rememberMe: boolean;
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignup: () => void;
  onOpenLogin: () => void;
}

export const LoginModal = ({
  isOpen,
  onClose,
  onOpenSignup,

}: LoginModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();


  const onSubmit = async () => {
    setIsLoading(true);
    setError("");

    // TODO: trigger Supabase passwordless magic link
    // const { error: authError } = await supabase.auth.signInWithOtp({ email: data.email });
    // if (authError) {
    //   setError(authError.message);
    //   setIsLoading(false);
    //   return;
    // }

    onClose();
    router.push("/home");
    router.refresh();
    setIsLoading(false);
  };

  const handleSignUpClick = () => {
    onClose();
    onOpenSignup();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
        <DialogTitle className="sr-only">Login to your account</DialogTitle>

        <div className="space-y-4 px-8 py-4">
          <div>
            <h2 className="text-xl font-outfit font-semibold text-black">
              Please enter your email & password
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

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
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}$/i,
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

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  {...register("rememberMe")}
                  className="w-6 h-6 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="rememberMe"
                  className="font-outfit font-semibold text-base"
                >
                  Remember Me
                </label>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotPasswordOpen(true)}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-8 w-full bg-primary text-white py-3 px-4 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send magic link"}
            </button>
          </form>

          <div className="text-center">
            <p className="font-outfit text-base">
              Don&apos;t have an account?{" "}
              <button
                onClick={handleSignUpClick}
                className="text-primary hover:underline font-semibold"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
