import React from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const SuccessModal = ({ isOpen, onClose, onOpenLogin }: SuccessModalProps) => {
  // TODO: handle any logout/cleanup with Supabase if needed
  // e.g. await supabase.auth.signOut();

  const handleLoginClick = () => {
    onClose();
    onOpenLogin();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md w-full max-w-md mx-auto">
        <div className="p-4 flex flex-col items-center">
          <Image
            src="/complete-icon.svg"
            alt="Success"
            width={120}
            height={120}
            className="mb-4"
          />

          <h2 className="font-outfit font-semibold text-3xl text-center mb-2">
            Reset password successful
          </h2>

          <p className="font-outfit font-semibold text-[#616161] text-center mb-6 mt-6">
            You can now use your magic link to login to your account.
          </p>

          <button
            onClick={handleLoginClick}
            className="w-full bg-primary py-4 rounded-full text-white font-outfit font-semibold hover:bg-primary/90 transition-colors"
          >
            Login
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
