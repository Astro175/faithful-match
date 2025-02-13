"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/Footer";

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="p-[3em] flex justify-left">
        <Image
          src="/logo-red.png"
          alt="Faithful Match Logo"
          width={140}
          height={130}
          priority
        />
      </nav>

      {/* Main Content */}
      <main className="flex-1 px-[5em] mx-auto mb-12 max-w-[1100px]">
        <h1 className="text-foreground text-2xl mb-8 font-bold">
          Terms & Conditions
        </h1>

        <ol className="list-decimal space-y-6 pl-4">
          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Acceptance of Terms
            </h2>
            <p className="text-foreground font-outfit">
              By using the Faithful Match app, you agree to abide by these Terms
              & Conditions. If you do not agree, please refrain from using the
              app.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Eligibility
            </h2>
            <p className="text-foreground font-outfit">
              You must be at least 18 years old to use Faithful Match. By using
              the app, you confirm that you meet this age requirement.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Account Creation
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                You are responsible for the accuracy of the information provided
                during account creation.
              </li>
              <li>
                You agree not to impersonate others or create multiple accounts.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              App Usage
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                Faithful Match is for personal use only. Commercial use,
                unauthorized access, and data scraping are prohibited.
              </li>
              <li>
                Users must adhere to our community guidelines and respect other
                users.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Privacy
            </h2>
            <p className="text-foreground font-outfit">
              Your privacy is important to us. Please review our Privacy Policy
              for details on data collection, use, and protection.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Safety
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground font-outfit">
              <li>
                We prioritize user safety. Report any suspicious or
                inappropriate behavior promptly.
              </li>
              <li>
                Do not share personal or financial information with other users.
              </li>
            </ul>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Premium Services
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match offers premium subscription services with added
              features. Payment terms and renewals are detailed in the app.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Termination
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match reserves the right to suspend or terminate accounts
              for violations of our terms or community guidelines.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Changes to Terms
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match may update these Terms & Conditions. Users will be
              notified of changes, and continued use implies acceptance.
            </p>
          </li>

          <li>
            <h2 className="text-foreground font-outfit text-xl mb-2 font-bold">
              Disclaimer of Liability
            </h2>
            <p className="text-foreground font-outfit">
              Faithful Match is not responsible for interactions or outcomes
              between users. Use the app at your own risk.
            </p>
          </li>
        </ol>

        <p className="text-foreground font-outfit mt-8">
          By using Faithful Match, you acknowledge and agree to the Terms &
          Conditions outlined above. Your privacy and security are important to
          us, and we are committed to providing a safe and enjoyable dating
          experience.
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TermsAndConditionsPage;
