import dynamic from "next/dynamic";

const DesktopHome = dynamic(() => import("./@desktop/page"), {
  loading: () => <div>Loading</div>,
});
const MobileHome = dynamic(() => import("./@mobile/page"), {
  loading: () => <div>Loading...</div>,
});

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
