'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/cores/Footer';
import TanstackProvider from './../providers/TanstackProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/cores/Navbar';
import { UserContext } from './../supports/context/userContext';
import { useState } from 'react';
import ProtectedRoute from './../components/ProtectedRoute';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  const [userData, setUserData] = useState(null);
  const path = usePathname();
  const EODashboard = '/dashboard/event-organizer';

  const test = ['/event/register'];

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <html lang="en">
        <body className={inter.className}>
          <TanstackProvider>
            <ToastContainer />
            {path.includes(EODashboard) ? null : <Navbar />}
            <ProtectedRoute>{children}</ProtectedRoute>
            {path.includes(EODashboard) ? null : <Footer />}
          </TanstackProvider>
        </body>
      </html>
    </UserContext.Provider>
  );
}
