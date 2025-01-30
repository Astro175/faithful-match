"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { OAuthButtons } from "./OauthButtons";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
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
import { useSignIn } from "@clerk/nextjs";
import { ForgotPasswordModal } from "./reset-password/ForgotPasswordModal";

type LoginFormData = {
  email: string;
  password: string;
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
  onOpenLogin,
}: LoginModalProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const router = useRouter();
  const { signIn, isLoaded: isClerkLoaded } = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const handleCloseForgotPassword = useCallback(() => {
    setIsForgotPasswordOpen(false);
  }, []);

  
  const onSubmit = async (data: LoginFormData) => {
    if (!isClerkLoaded || !signIn) {
      setError("Authentication system is not ready. Please try again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Attempt to sign in
      await signIn.create({
        identifier: data.email,
        password: data.password,
      });

      // If sign in is successful (no error thrown), proceed
      onClose();
      router.push("/home");
      router.refresh();
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        const errorMessage = String(err.message).toLowerCase();
        if (
          errorMessage.includes("user not found") ||
          errorMessage.includes("no account exists")
        ) {
          setError("No account found with this email. Please sign up first.");
        } else {
          setError(String(err.message));
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    onClose();
    onOpenSignup();
  };

  if (!isClerkLoaded) {
    return null;
  }

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

            <div className="mt-4">
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
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="space-y-3">
            <OAuthButtons
              variant="outline"
              className="w-full py-6 border-[#EEEEEE] rounded-full font-outfit font-semibold"
              onError={(error) => {
                console.error("OAuth failed:", error);
              }}
            />
          </div>

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

      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={handleCloseForgotPassword}
        onLoginClose={onClose}
        onLoginOpen={() => {
          handleCloseForgotPassword();
          setIsForgotPasswordOpen(false);
          onOpenLogin();  // Use the prop instead of setIsOpen
        }}
      />
    </Dialog>
  );
};
