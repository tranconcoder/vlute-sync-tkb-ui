"use client";

import Navbar from "@/components/LandingPage/Navbar";
import Hero from "@/components/LandingPage/Hero";
import OfflineFeature from "@/components/LandingPage/Features/OfflineFeature";
import NotificationFeature from "@/components/LandingPage/Features/NotificationFeature";
import ReminderFeature from "@/components/LandingPage/Features/ReminderFeature";
import CalendarFeature from "@/components/LandingPage/Features/CalendarFeature";
import Footer from "@/components/LandingPage/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <OfflineFeature />
      <NotificationFeature />
      <ReminderFeature />
      <CalendarFeature />
      <Footer />
    </main>
  );
}
