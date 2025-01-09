import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaApple } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "@/components/ui/button";

interface OAuthButtonsProps {
  variant?: ButtonProps["variant"];
  className?: string;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}

export const OAuthButtons = ({
  variant = "default",
  className = "",
  onSuccess,
  onError,
}: OAuthButtonsProps) => {
  const { signIn, isLoaded } = useSignIn();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingApple, setIsLoadingApple] = useState(false);

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    try {
      setIsLoadingGoogle(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/home",
      });
      onSuccess?.();
    } catch (error) {
      console.error("OAuth error:", error);
      onError?.(error);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (!isLoaded) return;
    try {
      setIsLoadingApple(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_apple",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/home",
      });
      onSuccess?.();
    } catch (error) {
      console.error("OAuth error:", error);
      onError?.(error);
    } finally {
      setIsLoadingApple(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={handleGoogleSignIn}
        disabled={!isLoaded || isLoadingGoogle}
      >
        {isLoadingGoogle ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Image
            src="/google-icon.svg"
            alt="Google"
            className="mr-2 h-5 w-5"
            width={20}
            height={20}
          />
        )}
        Continue with Google
      </Button>

      <Button
        type="button"
        variant={variant}
        className={className}
        onClick={handleAppleSignIn}
        disabled={!isLoaded || isLoadingApple}
      >
        {isLoadingApple ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaApple className="mr-2 h-5 w-5" />
        )}
        Continue with Apple
      </Button>
    </>
  );
};
