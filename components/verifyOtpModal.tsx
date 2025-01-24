import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog";
// import { useSignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSignUp, useAuth } from "@clerk/nextjs";

interface VerifyOtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerificationComplete: () => void;
  emailAddress: string;
  password: string;
}

export const VerifyOtpModal = ({
  isOpen,
  onClose,
  onVerificationComplete,
  emailAddress,
  password,
}: VerifyOtpModalProps) => {
  const { signUp, isLoaded } = useSignUp();
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerificationInput = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setError('');
  
    try {
      const code = verificationCode.join('');
      console.log('Attempting email verification with code:', code);
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
  
      console.log('Sign up completion status:', completeSignUp.status);
      
      if (completeSignUp.status === 'complete') {
        try {
          const response = await fetch(
            'https://terrier-smooth-mouse.ngrok-free.app/api/auth/users/register',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: emailAddress,
                password: password,
                clerkUserId: completeSignUp.createdUserId,
              }),
            }
          );
  
          const data = await response.json();
          console.log('Backend response:', data);
  
          if (!response.ok) {
            if (data.message) {
              throw new Error(data.message);
            } else if (data.error) {
              throw new Error(data.error);
            } else {
              throw new Error(`Registration failed with status: ${response.status}`);
            }
          }
  
          console.log('Registration successful:', data);
          onVerificationComplete();
          router.push('/profile-registration');
          onClose();
        } catch (apiError: any) {
          console.error('Backend registration error:', apiError);
          setError(apiError.message || 'Failed to complete registration. Please try again.');
          return;
        }
      } else {
        console.log('Verification incomplete:', completeSignUp);
        setError('Verification incomplete. Please try again.');
      }
    } catch (err: any) {
      console.error('Verification error:', err);
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;
    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md py-3 px-2 w-full max-w-md mx-auto">
        <DialogTitle className="sr-only">Verify your email</DialogTitle>

        <div className="space-y-4 px-8 py-4">
          <div className="text-center">
            <h2 className="text-xl font-outfit font-semibold text-black mb-2">
              Enter verification code
            </h2>
            <p className="text-gray-600 font-outfit">
              We sent a code to {emailAddress}
            </p>
          </div>

          <div className="flex justify-center gap-2 my-8">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleVerificationInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center border-2 border-gray-300 rounded-md focus:border-primary focus:outline-none text-lg font-semibold"
              />
            ))}
          </div>

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <button
            onClick={handleVerifyOtp}
            disabled={isLoading || verificationCode.some((code) => !code)}
            className="w-full bg-primary text-white py-3 px-4 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Verify Email"
            )}
          </button>

          <div className="text-center">
            <button
              onClick={handleResendCode}
              className="text-primary hover:underline font-outfit font-semibold"
            >
              Didn&apos;t receive code? Resend
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
