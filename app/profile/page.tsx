"use client";

import { Sidebar } from "@/components/ui/sidebar";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Profile</h1>
      </main>
    </div>
  );
}
