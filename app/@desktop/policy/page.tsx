

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/Footer";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="p-[3em] flex justify-center">
        <Image
          src="/logo-red.png"
          alt="Faithful Match Logo"
          width={140}
          height={130}
          priority
        />
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-[5em] max-w-[1100px] mx-auto mb-12">
        <h1 className="text-foreground text-2xl mb-8 font-bold">
          Privacy Policy
        </h1>

        <ol className="list-decimal space-y-6 pl-4">
          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Data Collection
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                Faithful Match collects user data, including personal
                information, to provide and improve our services.
              </li>
              <li>
                Information collected may include profile data, location, and
                usage patterns.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Data Use
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                We use data to facilitate matching, communication, and
                personalization of the app.
              </li>
              <li>
                Your data may be shared with third-party service providers for
                app functionality.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Data Protection
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match employs security measures to protect user data.
              However, no system is entirely foolproof, and we cannot guarantee
              absolute security.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Cookies and Analytics
            </h2>
            <p className="text-foreground font-outfit">
              We use cookies and analytics tools to gather information about app
              usage, improve our services, and deliver targeted content.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Third-Party Links
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match may contain links to third-party websites or
              services. We are not responsible for their privacy practices.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Data Retention
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                We retain user data as long as necessary for app functionality
                or as required by law.
              </li>
              <li>Users can request data deletion through the app settings.</li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Communication
            </h2>
            <p className="text-foreground font-outfit">
              By using Faithful Match, you consent to receive app-related
              communications, including notifications and updates.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Children&apos;s Privacy
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match is not intended for users under 18. We do not
              knowingly collect data from children.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Changes to Privacy Policy
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match may update the Privacy Policy. Users will be
              notified of changes, and continued use implies acceptance.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Contact
            </h2>
            <p className="text-foreground font-outfit">
              For questions or concerns about privacy or these policies, please
              contact Faithful Match support through the app.
            </p>
          </li>
        </ol>

        <p className="text-foreground font-outfit mt-8">
          By using Faithful Match, you acknowledge and agree to the Privacy
          Policy outlined above. Your privacy and security are important to us,
          and we are committed to providing a safe and enjoyable dating
          experience.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
