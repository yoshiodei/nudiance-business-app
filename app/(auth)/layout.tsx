import type { Metadata } from "next";
import Footer from "../shared/components/Footer";
import Navbar from "../shared/components/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar logoLinkPath="/login" />
        <main>
          {children}
        </main>    
      <Footer />
    </>
  );
}
