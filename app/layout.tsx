import { Outfit } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cookies } from "next/headers";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
  mobile,
  desktop,
}: {
  children: React.ReactNode;
  mobile: React.ReactNode;
  desktop: React.ReactNode;
}) {
  // Server-side detection from middleware cookies
  const cookieStore = await cookies();
  const deviceType = cookieStore.get("device-type")?.value || "desktop"; // Default to desktop

  return (
    <html lang="en" suppressHydrationWarning data-device={deviceType}>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          >
            {/* Children includes our ClientRedirect component */}
            {children}

            {/* Render content based on device type */}
            <div id="device-content">
              {deviceType === "mobile" ? mobile : desktop}
            </div>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
