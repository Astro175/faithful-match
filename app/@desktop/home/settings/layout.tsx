"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LuCompass, LuEye, LuNotepadText } from "react-icons/lu";
import { IoPersonOutline, IoAnalytics } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi2";
import { MdOutlineSecurity, MdLogout } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { TbArrowsDownUp } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
import { FiChevronRight } from "react-icons/fi";
import { useUser, useAuth, useClerk } from "@clerk/nextjs";
import { useState } from "react";

interface SettingsItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const settingsItems: SettingsItem[] = [
  {
    title: "Discovery Preferences",
    icon: LuCompass,
    href: "/home/settings/discovery",
  },
  {
    title: "Profile & Privacy",
    icon: IoPersonOutline,
    href: "/home/settings/profile",
  },
  {
    title: "Notification",
    icon: HiOutlineBell,
    href: "/home/settings/notifications",
  },
  {
    title: "Account & Security",
    icon: MdOutlineSecurity,
    href: "/home/settings/security",
  },
  {
    title: "Subscription",
    icon: CiStar,
    href: "/home/settings/subscription",
  },
  {
    title: "Web Appearance",
    icon: LuEye,
    href: "/home/settings/appearance",
  },
  {
    title: "Third Party Integrations",
    icon: TbArrowsDownUp,
    href: "/home/settings/integrations",
  },
  {
    title: "Data & Analytics",
    icon: IoAnalytics,
    href: "/home/settings/analytics",
  },
  {
    title: "Help & Support",
    icon: LuNotepadText,
    href: "/home/settings/support",
  },
];

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = async () => {
    await signOut();
    router.push("/");
  };

  const handleDeleteAccount = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:4000/api/users/${user?.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user data");
      }

      await user?.delete();
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-lg py-8 px-16">
            <h2 className="text-[24px] text-[#F75555] font-outfit font-[700] text-center mb-4">
              Logout
            </h2>
            <p className="text-[20px] text-[#212121] text-center mb-8">
              Are you sure you want to log out?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="rounded-full px-10 py-4 font-outfit font-bold text-[16px] bg-[#FAE3E4] text-[#DD101E] hover:bg-[#DD101E] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="rounded-full px-10 py-4 font-outfit font-bold text-[16px] bg-[#FAE3E4] text-[#DD101E] hover:bg-[#DD101E] hover:text-white transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] w-full max-w-lg py-8 px-16">
            <h2 className="text-[24px] text-[#212121] font-outfit font-bold text-center mb-4">
              Delete Account
            </h2>
            <p className="text-[20px] text-[#212121] text-center mb-8">
              Are you sure you want to delete your account?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-full px-16 py-4 font-outfit font-bold text-[16px] bg-[#FAE3E4] text-[#DD101E] hover:bg-[#DD101E] hover:text-white transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded-full px-16 py-4 font-outfit font-bold text-[16px] bg-[#FAE3E4] text-[#DD101E] hover:bg-[#DD101E] hover:text-white transition-colors disabled:opacity-50"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>

            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        </div>
      )}

      <div className="w-[480px] p-6 font-outline">
        <div className="border-2 border-[#F5F5F5] rounded-lg bg-white py-6 px-10">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>

          <div className="space-y-2">
            {settingsItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                    isActive ? "bg-gray-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-[#212121]" />
                    <span className="font-bold font-outfit text-[#212121]">
                      {item.title}
                    </span>
                  </div>
                  <FiChevronRight className="w-6 h-6 text-[#212121]" />
                </Link>
              );
            })}

            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <AiOutlineDelete className="w-6 h-6 text-[#F75555]" />
                <span className="font-semibold text-[#F75555] font-outfit text-base">
                  Delete Account
                </span>
              </div>
              <FiChevronRight className="w-6 h-6 text-[#212121]" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-[#F75555] hover:text-[#F75555]/90 hover:bg-red-50 gap-3"
            >
              <MdLogout className="w-6 h-6" />
              <span className="font-outfit font-semibold text-base">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 border-l-2 border-[#F5F5F5] min-h-screen bg-white p-6">
        {children}
      </div>
    </div>
  );
};

export default SettingsLayout;
