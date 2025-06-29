"use client";
import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import SuccessModal from "./SuccessModal";
import { IoEye, IoEyeOff } from "react-icons/io5";
import zxcvbn from "zxcvbn";
// import { supabase } from "@/lib/supabaseClient";

interface NewPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  email: string;
  onSuccess: () => void;
  onOpenLogin: () => void;
}

const passwordRequirements = [
  { label: "Minimum 8 characters", test: (s: string) => s.length >= 8 },
  { label: "At least one number", test: (s: string) => /\d/.test(s) },
  {
    label: "At least one uppercase letter",
    test: (s: string) => /[A-Z]/.test(s),
  },
  {
    label: "At least one lowercase letter",
    test: (s: string) => /[a-z]/.test(s),
  },
  {
    label: "At least one special character",
    test: (s: string) => /[\W_]/.test(s),
  },
];

export const NewPasswordModal = ({
  isOpen,
  onClose,
  code,
  email,
  onSuccess,
  onOpenLogin,
}: NewPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirementsMet, setRequirementsMet] = useState<boolean[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<{ newPassword: string; confirmPassword: string }>();

  const newPassword = watch("newPassword", "");

  useEffect(() => {
    const strength = zxcvbn(newPassword).score;
    const met = passwordRequirements.map((req) => req.test(newPassword));
    setPasswordStrength(strength);
    setRequirementsMet(met);
  }, [newPassword]);

  const getStrengthColor = () => {
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-400",
      "bg-green-600",
    ];
    return colors[passwordStrength] || "bg-gray-300";
  };

  const handleOpenLogin = useCallback(() => {
    setShowSuccessModal(false);
    onOpenLogin();
  }, [onOpenLogin]);

  const onSubmit = useCallback(
    async (data: { newPassword: string; confirmPassword: string }) => {
      if (data.newPassword !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (requirementsMet.includes(false)) {
        setError("Password does not meet all requirements");
        return;
      }

      setIsLoading(true);
      setError("");
      try {
        // TODO: use Supabase to update password with OTP code
        // await supabase.auth.verifyOtp({
        //   email,
        //   token: code,
        //   type: 'signup' /* or relevant type */
        // });
        // await supabase.auth.updateUser({ password: data.newPassword });

        setShowSuccessModal(true);
        onClose();
      } catch (err: any) {
        setError(err.message || "Failed to reset password. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [code, email, onClose, requirementsMet]
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
          <DialogTitle className="sr-only">Set New Password</DialogTitle>

          <div className="space-y-4 px-8 py-4">
            <div>
              <h2 className="text-xl font-outfit font-semibold text-black">
                Create your new password 🔒
              </h2>
              <p className="text-gray-600 mt-2">
                Create a new password for{" "}
                <span className="font-semibold">{email}</span>. If forgotten,
                you’ll need to reset again.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-1 h-1.5">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full ${
                        i < passwordStrength
                          ? getStrengthColor()
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Password strength:{" "}
                  {
                    ["Weak", "Fair", "Good", "Strong", "Very Strong"][
                      passwordStrength
                    ]
                  }
                </p>
              </div>

              <div className="space-y-2">
                {passwordRequirements.map((req, i) => (
                  <div key={req.label} className="flex items-center gap-2">
                    <span
                      className={`text-sm ${
                        requirementsMet[i] ? "text-green-500" : "text-gray-400"
                      }`}
                    >
                      {requirementsMet[i] ? "✓" : "✗"}
                    </span>
                    <span
                      className={`text-sm ${
                        requirementsMet[i] ? "text-gray-600" : "text-gray-400"
                      }`}
                    >
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New password is required",
                    minLength: { value: 8, message: "At least 8 characters" },
                  })}
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 px-4 rounded-md focus:outline-none focus:border-primary pr-12"
                  placeholder="New Password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showNewPassword ? (
                    <IoEyeOff size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </button>
                {errors.newPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (v) =>
                      v === watch("newPassword") || "Passwords do not match",
                  })}
                  className="w-full bg-[#FAFAFA] border border-[#FAFAFA] py-4 px-4 rounded-md focus:outline-none focus:border-primary pr-12"
                  placeholder="Confirm Password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <IoEyeOff size={20} />
                  ) : (
                    <IoEye size={20} />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-error text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !requirementsMet.every(Boolean)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-full transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onOpenLogin={handleOpenLogin}
      />
    </>
  );
};
