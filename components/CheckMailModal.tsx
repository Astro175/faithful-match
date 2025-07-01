"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogHeader,
} from "@/components/ui/dialog";
import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { useUserStore } from "@/store/useUserStore";

interface CheckMailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  return (
    local[0] + local[1] + "*".repeat(local.length - 1) + "@" + domain + ".com"
  );
}

export default function CheckMailModal({
  isOpen,
  onClose,
}: CheckMailModalProps) {
  const email = useUserStore((s) => s.email);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="bg-black/50" />
      <DialogContent className="bg-white rounded-md p-6 max-w-md mx-auto">
        <DialogHeader></DialogHeader>
        <div>
          <div className="p-2 rounded-full border border-gray-300 w-32 h-32 m-auto flex items-center justify-center mt-4">
            <MdOutlineMarkEmailUnread className="text-lg w-16 h-16" />
          </div>
          <p className="font-bold text-center text-xl mt-4 capitalize">
            Check your mail
          </p>
          <p className="text-center mt-4 text-[#616161] text-lg">
            We have sent an email to <br /> {maskEmail(email)} <br /> Click the
            link inside to get started.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
