import type { Metadata } from 'next';
import './globals.css';
import MenuUserMobile from '@/components/Navbar/MenuUserMobile';
import Footer from '@/components/elements/Footer';
import { NextAuthProvider } from '@/components/providers/NextAuthProvider';
import  { Toaster } from 'react-hot-toast';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: 'invitation 6',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <NextTopLoader color="#A2845E" shadow="0 0 10px #FDEDD9,0 0 5px #FDEDD9"  showSpinner={false}/>
        <main>
          <NextAuthProvider>
            <div className="md:w-[500px] border border-gray-100 shadow-sm border-b-0 bg-white mx-auto space-y-20 min-h-screen">
              {children}
              <Footer />
              <MenuUserMobile />
              <Toaster />
            </div>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}