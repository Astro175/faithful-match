"use client";

import { useSignIn } from "@clerk/nextjs";
import { OAuthStrategy } from "@clerk/types";
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

const providers = [
  {
    name: "Google",
    strategy: "oauth_google" as const,
    icon: (
      <Image
        src="./google-icon.svg"
        alt="Google"
        width={20}
        height={20}
        className="mr-2 h-5 w-5"
      />
    ),
  },
  {
    name: "Apple",
    strategy: "oauth_apple" as const,
    icon: <FaApple className="mr-2 h-5 w-5" />,
  },
];

export default function OAuthButtons({
  variant = "default",
  className = "",
}: {
  variant?: Parameters<typeof Button>[0]["variant"];
  className?: string;
}) {
  const router = useRouter()
  const { signIn, isLoaded } = useSignIn();
  const {isSignedIn} = useAuth()
  const [loading, setLoading] = useState<string | null>(null);

  const handleSignIn = async (strategy: OAuthStrategy) => {

    if (isSignedIn) {
      router.push("/app");
      return;
    }
    if (!isLoaded) {
      return;
    }

    setLoading(strategy);
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/app",
      });
    } catch (error) {
      console.log("Oauth error:", error);
    }
  };
  return (
    <>
      {providers.map(({ name, strategy, icon }) => (
        <Button
          key={strategy}
          type="button"
          variant={variant}
          className={className}
          onClick={() => handleSignIn(strategy)}
          disabled={!isLoaded || loading === strategy}
        >
          {loading === strategy ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            icon
          )}
          Continue with {name}
        </Button>
      ))}
    </>
  );
}
