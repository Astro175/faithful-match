export default function MobileLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="mobile-layout min-h-screen">
        {children}
      </div>
    );
  }