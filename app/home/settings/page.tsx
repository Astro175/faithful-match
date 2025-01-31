"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const settingsItems = [
  {
    title: "Discovery Preferences",
    icon: "🎯",
    href: "/settings/discovery",
  },
  {
    title: "Profile & Privacy",
    icon: "👤",
    href: "/settings/profile",
  },
  {
    title: "Notification",
    icon: "🔔",
    href: "/settings/notifications",
  },
  {
    title: "Account & Security",
    icon: "🔒",
    href: "/settings/security",
  },
  {
    title: "Subscription",
    icon: "⭐",
    href: "/settings/subscription",
  },
  {
    title: "Web Appearance",
    icon: "👁️",
    href: "/settings/appearance",
  },
  {
    title: "Third Party Integrations",
    icon: "🔗",
    href: "/settings/integrations",
  },
  {
    title: "Data & Analytics",
    icon: "📊",
    href: "/settings/analytics",
  },
  {
    title: "Help & Support",
    icon: "❓",
    href: "/settings/support",
  },
];

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push("/login");
  };

  const handleDeleteAccount = () => {
    // Add delete account logic here
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          
          <div className="space-y-2">
            {settingsItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            ))}

            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-between w-full p-4 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">❌</span>
                <span className="font-medium text-red-600">Delete Account</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <span className="text-xl mr-3">🚪</span>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}