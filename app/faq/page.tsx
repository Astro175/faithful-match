"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LuSearch } from "react-icons/lu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";

const faqItems = [
  {
    question: "What is Faithful Match?",
    answer:
      "Faithful Match is a dating app designed to help you meet new people, make meaningful connections, and find potential matches based on your interests and preferences.",
  },
  {
    question: "How do I create a Faithful Match account?",
    answer:
      "Creating a Faithful Match account is easy! Simply download the app, verify your phone number or email, upload some photos, fill out your profile information including your interests and preferences, and you're ready to start matching!",
  },
  {
    question: "Is Faithful Match free to use?",
    answer:
      "Yes, Faithful Match is free to use with core features like profile creation, matching, and basic messaging. We also offer premium features through our subscription plans that provide additional benefits like unlimited likes, seeing who likes you, and advanced filtering options.",
  },
  {
    question: "How does matching work on Faithful Match?",
    answer:
      "Our matching algorithm considers various factors including your preferences, interests, location, and faith-based values to suggest compatible matches. When two users express interest in each other by liking each other's profiles, it's a match, and you can start chatting!",
  },
  {
    question: "Can I change my location on Faithful Match?",
    answer:
      "Yes, you can change your location settings in the app. Free users can update their location when they move, while premium subscribers have access to our Passport feature, allowing them to match with people in any location worldwide.",
  },
  {
    question: "How do I report a user or profile?",
    answer:
      "If you encounter inappropriate behavior or suspicious profiles, you can report them by clicking the 'Report' button on their profile or in your chat conversation. Our safety team reviews all reports and takes appropriate action to maintain a safe community.",
  },
];

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFaqItems = faqItems.filter((item) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      item.question.toLowerCase().includes(lowerSearch) ||
      item.answer.toLowerCase().includes(lowerSearch)
    );
  });

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
      <main className="flex-1 px-[5em]">
        <h1 className="text-foreground text-2xl mb-6 font-outfit font-bold">
          FAQ
        </h1>

        {/* Search Input */}
        <div className="relative mb-8">
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
            <LuSearch className="w-5 h-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-[18px] pl-12 pr-[20px] bg-[#FAFAFA] rounded-[12px] outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQ Accordion */}
        <div className="mb-12">
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqItems.length === 0 ? (
              <div className="text-gray-500 text-center p-4">
                No results found
              </div>
            ) : (
              filteredFaqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-outfit font-bold text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 font-medium font-outfit">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FAQPage;
