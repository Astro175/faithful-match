"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
          <svg
            className="text-green-500 w-10 h-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <Image
        src="/logo-red.png"
        alt="Faithful Match"
        width={128}
        height={128}
        className="mb-6"
      />

      <div className="text-center">
        <h1 className="font-outfit font-bold text-2xl mb-2">
          Welcome to Faithful Match!
        </h1>
        <p className="font-outfit text-gray-600 mb-8 max-w-sm">
          Your journey to finding meaningful connections starts here.
        </p>

        <button
          onClick={() => router.push("/home")}
          className="bg-primary text-white font-outfit font-semibold py-4 px-8 rounded-full w-full max-w-xs"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}
