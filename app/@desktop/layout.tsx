export default function DesktopLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="desktop-layout min-h-screen">
        {children}
      </div>
    );
  }