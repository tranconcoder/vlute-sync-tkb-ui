import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import { APP_CONFIG } from "@/configs/app.config";

export const metadata: Metadata = {
  title: APP_CONFIG.projectName,
  description: APP_CONFIG.projectDescription,
};

import { NotificationProvider } from "@/context/NotificationContext";
import { NotificationContainer } from "@/components/Notification/NotificationContainer";
import { ReduxProvider } from "@/store/Provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${beVietnamPro.variable} font-sans antialiased dark`}
      >
        <ReduxProvider>
          <NotificationProvider>
            {children}
            <NotificationContainer />
          </NotificationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
