'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { deleteCookie } from '../../utils/Cookies';
import { useKeepLogin } from '../../hooks/useKeepLogin';
import { MdEvent } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();
  const navigate = useRouter();

  const handleLogout = async () => {
    await deleteCookie();
    setUserData(null);
    navigate.push('/');
  };

  useEffect(() => {
    mutationKeepLogin();
  }, []);

  return (
    <nav>
      <div className="bg-congressBlue flex h-[73px] items-center justify-between px-[300px]">
        <Link
          href={'/'}
          className="flex h-full w-[60%] items-center justify-start gap-2 font-bold text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="currentColor"
            className="h-5 w-5 flex-shrink-0 rounded-full text-gray-50"
          >
            <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
          </svg>
          <div>Heptatix</div>
        </Link>
        <div className="flex h-full w-[70%] items-center justify-between text-white">
          <div>Home</div>
          <div>Events</div>
          <div>About Us</div>
          <div>Blog</div>
          <div>Partnership</div>
        </div>
        <div className=" flex h-full w-[60%] items-center justify-end gap-4 text-white">
          <div className="hover:bg-denim hover:border-denim flex h-[35px] w-max items-center justify-center gap-2 rounded-md p-2">
            <MdEvent />
            <Link href={'/login/event-organizer'}>Event Organizer</Link>
          </div>
          {!userData ? (
            <Link
              href={'/login/user'}
              className=" bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-[35px] w-[73px] items-center justify-center rounded-md font-bold text-white"
            >
              Login
            </Link>
          ) : (
            <div
              className=" bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-[35px] w-[73px] items-center justify-center rounded-md font-bold text-white"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
