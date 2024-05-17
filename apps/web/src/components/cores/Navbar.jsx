'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import {
  deleteCookie,
  deleteRoleCookie,
  deleteEORoleCookie,
} from '../../utils/Cookies';
import { useKeepLogin } from '../../hooks/useKeepLogin';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdClose } from 'react-icons/md';

export default function Navbar() {
  const { userData, setUserData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();
  const navigate = useRouter();

  const handleLogout = async () => {
    await deleteCookie();
    await deleteRoleCookie();
    await deleteEORoleCookie();
    localStorage.removeItem('usr');
    setUserData(null);
    navigate.push('/');
  };

  useEffect(() => {
    mutationKeepLogin();
  }, []);

  return (
    <nav>
      <div className="py-10 lg:hidden">
        <div className="relative flex w-full items-center justify-center rounded-b-full bg-blue-100 px-24 text-black shadow">
          <div className="absolute left-10 z-50 flex">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button">
                  <RxHamburgerMenu size={25} />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className=" menu bg-base-200 relative min-h-full w-80 p-4 font-bold">
                  <li className="pt-10">
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/event">Event</Link>
                  </li>
                  <li>
                    <Link href="/contactus">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/partner">Partnership</Link>
                  </li>
                  <li>
                    <div className=" flex h-full w-full items-center justify-start gap-4 text-white">
                      {!userData ? (
                        <Link
                          href={'/login/user'}
                          className=" bg-azureBlue border-azureBlue hover:bg-dodgerBlue hover:border-dodgerBlue flex h-[40px] w-full items-center justify-center rounded-md font-bold text-white"
                        >
                          Login
                        </Link>
                      ) : (
                        <details className="dropdown">
                          <summary className="bg-azureBlue border-azureBlue hover:bg-dodgerBlue  hover:border-dodgerBlue flex h-[40px] w-[20vw] items-center justify-center rounded-md font-bold text-white">
                            {userData?.name}
                          </summary>
                          <ul className="menu dropdown-content bg-azureBlue z-[1] w-max rounded-md p-2 shadow">
                            <li>
                              {userData.role == 2 ? (
                                <Link
                                  href={'/dashboard/event-organizer'}
                                  className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-full items-center justify-center rounded-md font-bold text-white"
                                >
                                  Dashboard
                                </Link>
                              ) : (
                                <Link
                                  href={'/dashboard/user'}
                                  className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-full items-center justify-center rounded-md font-bold text-white"
                                >
                                  Dashboard
                                </Link>
                              )}
                            </li>
                            <li>
                              <a
                                className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-auto items-center justify-center rounded-md font-bold text-white"
                                onClick={handleLogout}
                              >
                                Logout
                              </a>
                            </li>
                          </ul>
                        </details>
                      )}
                    </div>
                  </li>
                  {/* Close button */}
                  <input id="my-drawer" type="checkbox" className="hidden" />
                  <div className="absolute right-5">
                    <label htmlFor="my-drawer">
                      <MdClose size={25} className="text-black" />
                    </label>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block ">
        <div className="bg-congressBlue flex h-[73px] items-center justify-between lg:px-[90px] xl:px-[200px]">
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
            <Link href={'/'}>
              <div>Home</div>
            </Link>
            <Link href={'/event'}>
              <div>Events</div>
            </Link>
            <Link href={'/contactus'}>
              <div>Contact Us</div>
            </Link>
            <Link href={'/partner'}>
              <div>Partnership</div>
            </Link>
          </div>
          <div className=" flex h-full w-[60%] items-center justify-end gap-4 text-white">
            {!userData ? (
              <Link
                href={'/login/user'}
                className=" bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue m-2 flex h-[40px] w-[90px] items-center justify-center rounded-md font-bold text-white"
              >
                Login
              </Link>
            ) : (
              <details className="dropdown">
                <summary className="bg-azureBlue border-azureBlue hover:bg-dodgerBlue  hover:border-dodgerBlue m-2 flex h-[40px] w-[90px] items-center justify-center rounded-md font-bold text-white">
                  {userData?.name}
                </summary>
                <ul className="menu dropdown-content bg-azureBlue z-[1] w-max rounded-md p-2 shadow">
                  <li>
                    {userData.role == 2 ? (
                      <Link
                        href={'/dashboard/event-organizer'}
                        className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-auto items-center justify-center rounded-md font-bold text-white"
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        href={'/dashboard/user'}
                        className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-auto items-center justify-center rounded-md font-bold text-white"
                      >
                        Dashboard
                      </Link>
                    )}
                  </li>
                  <li>
                    <a
                      className="bg-azureBlue border-azureBlue  hover:bg-dodgerBlue hover:border-dodgerBlue flex h-max w-auto items-center justify-center rounded-md font-bold text-white"
                      onClick={handleLogout}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </details>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
