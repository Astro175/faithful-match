"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";

type SignupFormData = {
  email: string;
  password: string;
  agreeToTerms: boolean;
};

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoaded } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      setError("");

      await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      router.push("/verify-otp");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-6">
      <div className="max-w-md mx-auto">
        <div className="space-y-4">
          <Image
            src="/logo-red.png"
            alt="Faithful Match"
            className="w-32 h-32 mx-auto mb-8"
            width={150}
            height={150}
          />

          <h1 className="text-2xl font-outfit font-bold mb-8">
            Create an account 👩‍💻
          </h1>
          <p className="font-outfit text-lg text-[#616161] mt-2">
            Create your account in seconds. We&apos;ll help you find your
            perfect match.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block font-outfit font-semibold text-base mb-2"
              >
                Email
              </label>
              <div className="relative">
                <IoMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 pl-12 pr-4 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-outfit font-semibold text-base mb-2"
              >
                Password
              </label>
              <div className="relative">
                <IoIosLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
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
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 pl-12 pr-12 rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
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

            <div className="flex items-start gap-3">
              <Checkbox
                id="agreeToTerms"
                checked={termsAccepted}
                onCheckedChange={handleCheckboxChange}
                className="w-5 h-5 mt-1 border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <label
                htmlFor="agreeToTerms"
                className="font-outfit text-sm md:text-base"
              >
                I agree to Faithful Match{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}
            <div id="clerk-captcha"></div>
            <button
              type="submit"
              disabled={isLoading || !termsAccepted}
              className="w-full bg-primary text-white py-4 px-6 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 mt-8"
            >
              {isLoading ? "Creating account..." : "Continue"}
            </button>
          </form>

          <p className="text-center mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
