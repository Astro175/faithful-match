"use client";

import React, { useActionState, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { signUpInitialState, SignUpState } from "@/types";
import { useUserStore } from "@/store/useUserStore";
import { IoMail } from "react-icons/io5";
import Link from "next/link";
import { SignUp } from "@/app/actions/signup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SignupModal = ({ isOpen, onClose, onSuccess }: ModalProps) => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localEmail, setLocalEmail] = useState("");
  const setEmail = useUserStore((state) => state.setEmail);
  const [state, formAction, pending] = useActionState<SignUpState, FormData>(
    SignUp,
    signUpInitialState
  );

  const handleCheckboxChange = (checked: boolean) => {
    setTermsAccepted(checked as boolean);
  };

  useEffect(() => {
    if (!isOpen) {
      setTermsAccepted(false);
      setLocalEmail("");
      // Reset the form action state by calling it with a reset flag
      // This ensures the state goes back to initial state
    }
  }, [isOpen]);

  // Handle success - but only trigger once per submission
  useEffect(() => {
    if (state.success && isOpen) {
      setEmail(localEmail);
      onSuccess();
    }
  }, [state.success, onSuccess, localEmail, setEmail, isOpen]);

  const handleClose = () => {
    // Reset local state before closing
    setTermsAccepted(false);
    setLocalEmail("");
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
        <DialogTitle className="sr-only">Get your magic link</DialogTitle>
        <div className="space-y-4 px-8 py-4 text-black">
          <h1 className="font-outfit font-semibold text-3xl">
            Create an account ‍👩‍💻
          </h1>
          <p className="font-outfit text-base">
            Create your account in seconds. We&#39;ll help you find your perfect
            match
          </p>
          <form action={formAction}>
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
                  name="email"
                  required
                  value={localEmail}
                  onChange={(e) => setLocalEmail(e.currentTarget.value)}
                  autoComplete="off"
                  className="w-full bg-white border border-gray-300 py-4 px-14 rounded-md focus:outline-none focus:border-primary"
                  placeholder="you@example.com"
                />
              </div>
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
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!termsAccepted || pending}
              className="mt-12 w-full bg-primary text-white py-3 px-4 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {pending && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {pending ? "Sending..." : "Confirm Mail"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
