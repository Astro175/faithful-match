import { useState } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";
import { IoMail } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { OtpVerificationModal } from "./OtpVerificationModal";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClose: () => void;
}

interface ForgotPasswordFormData {
  email: string;
}

export const ForgotPasswordModal = ({ isOpen, onClose, onLoginClose }: ForgotPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setError("");
    
    try {
      // TODO: Implement password reset logic here
      // This would typically involve calling your authentication service's password reset endpoint
      setEmail(data.email);
      onLoginClose(); // Close the login modal
      setShowOtpModal(true); // Show the OTP verification modal
    } catch (err) {
      if (err && typeof err === "object" && "message" in err) {
        setError(String(err.message));
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay className="bg-black/50" />
        <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
          <DialogTitle className="sr-only">Reset your password</DialogTitle>

          <div className="space-y-4 px-8 py-4">
            <div>
              <h2 className="text-xl font-outfit font-semibold text-black">
                Please reset your password 🔑
              </h2>
              <p className="text-gray-600 mt-2">
                Please enter your email and we will send an OTP code in the next step to reset your password.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-md transition-colors"
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <OtpVerificationModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        email={email}
      />
    </>
  );
};