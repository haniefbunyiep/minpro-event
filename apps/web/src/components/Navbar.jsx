'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { deleteCookie } from './../utils/Cookies';
import { useKeepLogin } from './../hooks/useKeepLogin';
import { MdEvent } from 'react-icons/md';
import Link from 'next/link';

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();

  const handleLogout = async () => {
    await deleteCookie();
    setUserData({});
    window.location.reload();
  };

  useEffect(() => {
    mutationKeepLogin();
  }, [userData]);

  return (
    <nav>
      <div className="bg-congressBlue flex h-[73px] items-center justify-between px-[300px]">
        <div className="flex h-full w-[60%] items-center justify-start font-bold text-white">
          Heptatix
        </div>
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
            Create Event
          </div>
          {!userData ? (
            <Link
              href={'/login'}
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
