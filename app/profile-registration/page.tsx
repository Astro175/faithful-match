import { Button } from "@/components/ui/button";
import { IoLanguageOutline } from "react-icons/io5";
import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-center items-center px-4 py-2 border-b-2 border-[#F5F5F5]">
      <div className="container flex justify-between items-center">
        <Link href="/">
          {" "}
          <Image
            src="/logo-red.png"
            alt="Logo"
            //   className="h-8"
            width={120}
            height={120}
          />
        </Link>
        <Button
          variant="outline"
          className="border border-[#212121] rounded-full px-6 py-3"
        >
          <span className="font-outfit font-semibold text-xl flex items-center gap-2">
            <IoLanguageOutline /> English 🇺🇸
          </span>
        </Button>
      </div>
    </nav>
  );
};

const ProfileRegistration = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <RegistrationForm />
      <Footer />
    </div>
  );
};

export default ProfileRegistration;
