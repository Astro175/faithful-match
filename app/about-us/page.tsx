"use client";

import React from "react";
import Image from "next/image";
import { Footer } from "@/components/Footer";

const AboutUsPage = () => {
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
        <h1 className="text-foreground text-2xl mb-6 font-bold">About Us</h1>

        <p className="text-foreground font-outfit text-xl mb-8">
          Welcome to Faithful Match, where genuine connections begin! We&apos;re
          more than just a dating app; we&apos;re a community built on
          authenticity, inclusivity, and meaningful relationships. Our mission
          is simple: to help people find real connections, whether for
          friendship, romance, or something more.
        </p>

        <h2 className="text-foreground font-outfit text-xl font-bold mb-4">
          Why Faithful Match?
        </h2>

        <ul className="space-y-4 mb-8">
          <li className="text-foreground font-outfit">
            <span className="font-bold">Authentic Connections:</span> We believe
            that everyone deserves to find someone who truly understands and
            appreciates them. That&apos;s why we focus on fostering genuine
            connections through thoughtful profiles, personalized matches, and
            engaging conversation starters.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">Safe and Inclusive Space:</span> Your
            safety is our priority. We provide a secure environment with robust
            safety features, including profile verification, secure messaging,
            and an active moderation team to ensure that your experience is
            positive and respectful.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">Smart Matching, Real Results:</span> Our
            advanced algorithm goes beyond the basics. We use a combination of
            personal preferences, interests, and behavioral insights to help you
            find someone who shares your values, goals, and passions.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">A Community for Everyone:</span> Whether
            you&apos;re looking for a soulmate, a casual date, or just new
            friends, Faithful Match is the place to be. We celebrate diversity
            and welcome everyone, regardless of their background, orientation,
            or relationship goals.
          </li>
        </ul>

        <h2 className="text-foreground font-outfit text-xl font-bold mb-4">
          How It Works
        </h2>

        <ol className="list-decimal pl-4 space-y-4 mb-8">
          <li className="text-foreground font-outfit">
            <span className="font-bold">Create Your Profile:</span> Tell us
            about yourself! Share your interests, hobbies, and what you&apos;re
            looking for in a connection. The more genuine and detailed you are,
            the better matches you&apos;ll receive.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">Discover & Match:</span> Browse
            profiles, explore your potential matches, and get to know people who
            catch your eye. Our smart matching technology suggests profiles that
            align with your preferences and values.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">Chat & Connect:</span> Start meaningful
            conversations with people who intrigue you. Use our unique
            icebreakers, voice notes, and video chat features to take your
            conversations beyond the surface.
          </li>
          <li className="text-foreground font-outfit">
            <span className="font-bold">Meet in Real Life:</span> When
            you&apos;re ready, take the next step and meet your match in person.
            Our app encourages safe and respectful interactions to ensure that
            every date is a positive experience.
          </li>
        </ol>

        <h2 className="text-foreground font-outfit text-xl font-bold mb-4">
          Join Us Today!
        </h2>

        <p className="text-foreground font-outfit">
          At Faithful Match, we believe in the magic of meaningful connections.
          Join our growing community today and start your journey toward finding
          someone special. Download the app now and let the adventure begin!
        </p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
