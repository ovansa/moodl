import './globals.css';

import { Fugaz_One, Poppins } from 'next/font/google';

import { AuthProvider } from '@/context/AuthContext';
import Head from './head';
import Link from 'next/link';
import Logout from '@/components/Logout';
import type { Metadata } from 'next';

const fugaz = Fugaz_One({ subsets: ['latin'], weight: ['400'] });
const poppin = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'] });

export const metadata: Metadata = {
  title: 'Moodl',
  description: 'Track your daily mood everyday.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className='p-4 sm:p-8 flex items-center justify-between gap-4'>
      <Link href='/'>
        <h1 className={'text-base sm:text-lg textGradient ' + fugaz.className}>
          Moodl
        </h1>
      </Link>
      <Logout />
    </header>
  );
  const footer = (
    <footer className='p-4 sm:p-8 grid place-items-center'>
      <p className={'text-indigo-600 ' + fugaz.className}>Created with 💛</p>
    </footer>
  );

  return (
    <html lang='en'>
      <Head />
      <AuthProvider>
        <body
          className={
            'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800' +
            poppin.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
