import DesktopHome from "./@desktop/page";
import MobileHome from "./@mobile/page";

export default function HomePage() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
      <div className="block md:hidden">
        <MobileHome />
      </div>
    </>
  );
}
