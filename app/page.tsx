import Head from "next/head";
import { Navbar } from "@/components/Navbar";
import { StoreButton } from "@/components/StoreButton";
import { Carousel } from "@/components/Carousel";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Faithful Match - Redefine Your Love Life</title>
        <meta
          name="description"
          content="Take control and redefine what love means to you with perfect matches on Faithful Match. Download our app today and start your journey to meaningful connections."
        />
        <meta
          name="keywords"
          content="dating app, faithful match, relationships, love, dating"
        />
        <meta
          property="og:title"
          content="Faithful Match - Redefine Your Love Life"
        />
        <meta
          property="og:description"
          content="Take control and redefine what love means to you with perfect matches"
        />
        <meta property="og:image" content="/landing_image_one.png" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://faithfulmatch.com" />
      </Head>

      <main className="min-h-screen relative overflow-hidden">
        <Carousel />
        <div className="relative">
          <Navbar />

          <div className="flex flex-col items-center justify-center text-center px-4 py-16 md:py-32">
            <h1 className="font-outline font-bold text-4xl md:text-6xl text-white mb-6">
              Redefine Your <br /> Love Life
            </h1>
            <p className="font-outfit font-light text-lg md:text-[1.75em] text-white mb-8 max-w-2xl">
              Take control and redefine what love means to you with perfect
              matches
            </p>
            <button className="bg-primary text-white py-4 px-12 rounded-full mb-12 hover:bg-opacity-90 transition-colors font-outline font-semibold">
              Sign Up
            </button>

            <div className="flex flex-col md:flex-row gap-4">
              <StoreButton type="apple" />
              <StoreButton type="android" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
