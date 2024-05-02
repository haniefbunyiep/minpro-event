'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import TanstackProvider from './../providers/TanstackProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './../components/Navbar';
import { UserContext } from './../supports/context/userContext';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <html lang="en">
        <body className={inter.className}>
          <TanstackProvider>
            <ToastContainer />
            <Navbar />
            {children}
          </TanstackProvider>
        </body>
      </html>
    </UserContext.Provider>
  );
}
