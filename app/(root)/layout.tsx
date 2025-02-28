import type { Metadata } from "next";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";

export const metadata: Metadata = {
  title: "Nudiance Business",
  description: "Nudiance Business application for job postings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar logoLinkPath="/" />
      <main>
        {children}
      </main>
      <Footer />
    </>    
  );
}
