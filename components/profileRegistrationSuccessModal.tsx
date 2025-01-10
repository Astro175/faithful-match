import React, { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";

const ProfileRegistrationModal = ({ isOpen }: { isOpen: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        router.push("/home");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, router]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="pt-10 px-8 pb-8 flex flex-col items-center">
        {/* Visually Hidden Title for Accessibility */}
        <DialogTitle className="sr-only">Sign up Successful</DialogTitle>

        <Image
          src="/complete-icon.svg"
          alt="Success"
          className="mb-4"
          width={105}
          height={105}
        />
        <h2 className="text-primary font-semibold text-[1.5em] mb-4">
          Sign up Successful!
        </h2>
        <p className="max-w-[280px] text-center text-[#212121] mb-6">
          Please wait...
          <br />
          You will be directed to the homepage.
        </p>
        <Loader2 className="w-[60px] h-[60px] text-primary animate-spin" />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileRegistrationModal;
