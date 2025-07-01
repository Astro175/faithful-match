/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onSuccess: (code: string) => void;
}

export const OtpVerificationModal = ({
  isOpen,
  onClose,
  email,
  onSuccess,
}: OtpVerificationModalProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleInputChange = useCallback(
    (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return;
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError("");
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    },
    [otp]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        const prevInput = document.getElementById(`otp-${index - 1}`);
        prevInput?.focus();
      }
    },
    [otp]
  );

  const handleResendCode = useCallback(async () => {
    if (timeLeft > 0) return;
    try {
      // TODO: trigger Supabase to resend magic link or OTP for password reset
      // e.g. await supabase.auth.resetPasswordForEmail(email);
      setTimeLeft(60);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    }
  }, [timeLeft]);

  const handleSubmit = useCallback(() => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }
    setIsLoading(true);
    try {
      onSuccess(otpString);
      onClose();
    } catch (err: any) {
      setError(err.message || "Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [otp, onSuccess, onClose]);

  const maskedEmail = email.replace(
    /(\w{2})(\w+)(\w@)/,
    (_, a, b, c) => a + "*".repeat(b.length) + c
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
        <DialogTitle className="sr-only">OTP Verification</DialogTitle>

        <div className="space-y-4 px-8 py-4">
          <div>
            <h2 className="text-xl font-outfit font-semibold text-black">
              OTP code verification 🔒
            </h2>
            <p className="text-gray-600 mt-2">
              We&apos;ve sent a 6-digit code to{" "}
              <span className="font-semibold">{maskedEmail}</span>
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-center gap-3 my-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-semibold border rounded-md focus:outline-none focus:border-primary bg-[#FAFAFA]"
                disabled={isLoading}
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600">Didn&apos;t receive email?</p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={timeLeft > 0 || isLoading}
              className="text-primary hover:text-primary/80 transition-colors disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {timeLeft > 0 ? `Resend code in ${timeLeft}s` : "Resend code"}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={otp.some((digit) => !digit) || isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
