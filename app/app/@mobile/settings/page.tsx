"use client";

import { useState } from "react";
import {
  FiArrowRight,
  FiUser,
  FiLock,
  FiBell,
  FiCreditCard,
  FiSettings,
  FiGrid,
  FiBarChart2,
  FiHelpCircle,
  FiTrash2,
  FiLogOut,
} from "react-icons/fi";
import { Card } from "@/components/ui/card";

const settingsOptions = [
  {
    name: "Discovery Preferences",
    icon: <FiUser />,
    href: "/home/settings/discovery",
  },
  { name: "Profile & Privacy", icon: <FiLock />, href: "/settings/privacy" },
  { name: "Notification", icon: <FiBell />, href: "/settings/notifications" },
  { name: "Account & Security", icon: <FiLock />, href: "/settings/security" },
  {
    name: "Subscription",
    icon: <FiCreditCard />,
    href: "/settings/subscription",
  },
  {
    name: "App Appearance",
    icon: <FiSettings />,
    href: "/settings/appearance",
  },
  {
    name: "Third Party Integrations",
    icon: <FiGrid />,
    href: "/settings/integrations",
  },
  { name: "Data & Analytics", icon: <FiBarChart2 />, href: "/settings/data" },
  { name: "Help & Support", icon: <FiHelpCircle />, href: "/settings/help" },
  {
    name: "Delete Account",
    icon: <FiTrash2 />,
    href: "#",
    red: true,
  },
  { name: "Logout", icon: <FiLogOut />, href: "#", red: true },
];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  titleColor?: string;
}

const BottomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  titleColor = "#212121",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-lg p-6 w-full max-w-md">
        <h2
          className="text-center text-2xl font-bold mb-4"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        <p className="text-center text-[#212121] text-lg font-bold mb-6">
          {message}
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="rounded-full px-6 py-3 bg-[#FAE3E4] text-[#DD101E] font-bold hover:bg-[#DD101E] hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full px-6 py-3 bg-[#FAE3E4] text-[#DD101E] font-bold hover:bg-[#DD101E] hover:text-white transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SettingsPage() {
  const [showUpgradeCard, setShowUpgradeCard] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDeleteModalOpen(true);
  };

  const handleLogoutClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsLogoutModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Here you would implement the API call to delete the account
    console.log("Deleting account...");
    setIsDeleteModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    // Here you would implement the logout functionality
    console.log("Logging out...");
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto py-8 px-4 pb-16">
      {/* Settings Title */}
      <h1 className="text-center text-2xl font-semibold">Settings</h1>

      {/* Upgrade Card */}
      {showUpgradeCard && (
        <Card className="relative bg-[#DD101E] text-white rounded-lg p-5 mt-6">
          <button
            className="absolute top-2 right-2 text-white"
            onClick={() => setShowUpgradeCard(false)}
          >
            X
          </button>
          <h2 className="text-lg font-bold">Upgrade Membership Now!</h2>
          <p className="text-sm font-medium opacity-80 mt-1">
            Enjoy all the benefits and explore more possibilities
          </p>
        </Card>
      )}

      {/* Settings List */}
      <div className="mt-6 space-y-2">
        {settingsOptions.map(({ name, icon, href, red }) => (
          <a
            key={name}
            href={href}
            onClick={
              name === "Delete Account"
                ? handleDeleteClick
                : name === "Logout"
                ? handleLogoutClick
                : undefined
            }
            className={`flex items-center justify-between px-4 py-3 rounded-md transition ${
              red ? "text-red-600 font-semibold" : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-lg">{icon}</span>
              <span>{name}</span>
            </div>
            <FiArrowRight />
          </a>
        ))}
      </div>

      {/* Delete Account Modal */}
      <BottomModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Account"
        message="Are you sure you want to delete your account?"
        confirmText="Yes, Delete"
      />

      {/* Logout Modal */}
      <BottomModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Yes, Logout"
        titleColor="#F75555"
      />
    </div>
  );
}
