"use client";

import { Sidebar } from "@/components/ui/sidebar";

export default function FilterPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Filter</h1>
      </main>
    </div>
  );
}
