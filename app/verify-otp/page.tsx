"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerificationInput = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setError("");

    try {
      const code = verificationCode.join("");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/home");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;
    try {
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="p-8 w-full max-w-md mx-auto">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-gray-600"
      >
        <ArrowLeft className="mr-2" />
        Back
      </button>

      <div className="flex flex-col items-center">
        <Image
          src="/logo-red.png"
          alt="Logo"
          width={150}
          height={150}
          className="mb-4"
        />
        <h1 className="font-outfit text-xl font-semibold mb-2">
          Verify your email
        </h1>
        <p className="font-outfit text-gray-600 text-center mb-8">
          We sent a verification code to your email
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

      {error && <p className="text-error text-sm text-center mb-4">{error}</p>}

      <button
        onClick={handleVerifyOtp}
        disabled={isLoading || verificationCode.some((code) => !code)}
        className="w-full bg-primary text-white py-6 rounded-full font-outfit font-bold hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="animate-spin mx-auto" />
        ) : (
          "Verify Email"
        )}
      </button>

      <div className="text-center mt-4">
        <button
          onClick={handleResendCode}
          className="text-primary hover:underline font-outfit font-semibold"
        >
          Didn&apos;t receive code? Resend
        </button>
      </div>
    </div>
  );
}
