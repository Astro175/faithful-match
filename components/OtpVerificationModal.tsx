import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogOverlay, DialogTitle } from "@/components/ui/dialog";

interface OtpVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export const OtpVerificationModal = ({ isOpen, onClose, email }: OtpVerificationModalProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendCode = async () => {
    if (timeLeft > 0) return;
    setTimeLeft(60);
    // TODO: Implement resend code logic
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const otpString = otp.join('');
      // TODO: Implement OTP verification logic
      console.log('Verifying OTP:', otpString);
    } catch (error) {
      console.error('OTP verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const maskedEmail = email.replace(/(.{2})(.*)(?=@)/, (_, start, rest) => 
    start + '*'.repeat(rest.length)
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
              We have sent an OTP code to your email {maskedEmail}.<br />
              Enter the OTP code below to verify.
            </p>
          </div>

          <div className="flex justify-center gap-4 my-8">
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
                className="w-14 h-14 text-center text-2xl font-semibold border rounded-md focus:outline-none focus:border-primary bg-[#FAFAFA]"
              />
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600">Didn&apos;t receive email?</p>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={timeLeft > 0}
              className="text-primary hover:text-primary/80 transition-colors disabled:text-gray-400"
            >
              You can resend code in {timeLeft}s
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={otp.some(digit => !digit) || isLoading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-4 rounded-md transition-colors disabled:bg-gray-400"
          >
            {isLoading ? "Verifying..." : "Continue"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
