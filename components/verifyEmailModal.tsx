"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
// import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setError } from "@/store/features/authStore";
import { IoMailUnreadOutline } from "react-icons/io5";

interface VerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerifyEmailModal = ({
  isOpen,
  onClose,
}: VerifyEmailModalProps) => {
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.auth);
  const [isResending, setIsResending] = useState(false);

  // Function to mask email
  const maskEmail = (email: string) => {
    if (!email || !email.includes("@")) return email;

    const [username, domain] = email.split("@");

    if (username.length <= 2) {
      const maskedUsername =
        username.charAt(0) + "*".repeat(Math.max(username.length - 1, 1));
      return `${maskedUsername}@${domain}`;
    } else {
      const maskedUsername =
        username.slice(0, 2) + "*".repeat(username.length - 2);
      return `${maskedUsername}@${domain}`;
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResending(true);
      const response = await fetch(
        "https://faithfulmatch.render.app/api/auth/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) throw new Error("Failed to resend verification");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to resend verification";
      dispatch(setError(errorMessage));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white p-5">
        <DialogTitle className="sr-only">Email Verification Required</DialogTitle>
        <div className="flex flex-col items-center space-y-6 p-16">
          <div className="w-[60px] h-[60px] rounded-full border border-gray-200 flex items-center justify-center p-8">
            <IoMailUnreadOutline className="text-black text-[24px]" />
          </div>

          <h2 className="font-outfit font-bold text-[#212121] text-2xl">
            Check Your Email
          </h2>
          <p className="font-outfit font-medium text-center text-gray-600">
            We have sent an email to {maskEmail(email)}.<br />
            Click the link inside to get started
          </p>
          <button
            onClick={handleResendVerification}
            disabled={isResending}
            className="font-outfit font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {isResending ? "Sending..." : "Resend email"}
          </button>
          <button
            className="w-full border-2 border-primary text-primary rounded-lg p-4 font-outfit font-semibold text-base hover:bg-primary/5 transition-colors"
            onClick={onClose}
          >
            I&apos;ve verified my email
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};