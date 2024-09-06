import { DM_Mono, DM_Sans } from "next/font/google";

import "@turbostarter/ui/globals";

import { Footer } from "~/components/common/layout/footer";
import { TailwindIndicator } from "~/components/common/tailwind-indicator";
import { Toaster } from "~/components/common/toast";
import { DEFAULT_VIEWPORT, DEFAULT_METADATA } from "~/lib/metadata";
import { Providers } from "~/providers/providers";
import "~/styles/globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = DM_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["300", "400", "500"],
});

export const viewport = DEFAULT_VIEWPORT;
export const metadata = DEFAULT_METADATA;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col items-center justify-center bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="flex w-full max-w-[80rem] grow flex-col items-center gap-10 p-6 sm:p-8 md:p-10 lg:gap-12 lg:p-12">
            {children}
            <Footer />
          </div>
          <Toaster />
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}
