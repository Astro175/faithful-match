import { Sidebar } from "@/components/ui/sidebar";
import { Navbar } from "@/components/ui/Navbar";
import { UserDataFetcher } from "@/components/client/userDataFetcher";


export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <UserDataFetcher />
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="px-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
