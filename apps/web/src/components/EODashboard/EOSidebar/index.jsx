import Link from 'next/link';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import {
  MdHome,
  MdEventAvailable,
  MdOutlinePointOfSale,
  MdLogout,
  MdNewspaper,
} from 'react-icons/md';
import {
  deleteCookie,
  deleteRoleCookie,
  deleteEORoleCookie,
} from '../../../utils/Cookies';
import { useRouter } from 'next/navigation';

export default function EOSidebar() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useRouter();

  const handleLogout = async () => {
    await deleteCookie();
    await deleteRoleCookie();
    await deleteEORoleCookie();
    localStorage.removeItem('usr');
    setUserData(null);
    navigate.push('/');
  };

  return (
    <div className="h-full w-[15%]">
      <ul className="bg-downriver flex h-full w-full flex-col gap-2 p-4 text-white">
        <Link
          target="_blank"
          href={'/'}
          className="flex h-[8%] w-full items-center justify-center gap-2 font-bold text-white"
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
        <div className="bg-blueBay flex h-[75px] rounded-md">
          <div className="avatar placeholder flex h-full w-[50%] justify-between p-2">
            <div className="bg-neutral text-neutral-content w-auto rounded-full">
              <span className="text-3xl">
                {userData?.name[0].toLocaleUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex w-[80%] flex-col items-start justify-center gap-1">
            <p className="text-md">{userData?.name}</p>
            <p className="text-sm font-bold">Organizer</p>
          </div>
        </div>
        <div className="bg-bayBlue text-bayBlue text-winkleGray flex h-full flex-col gap-2 p-2">
          <li className="hover:bg-azureBlue text-md flex h-[40px] items-center justify-start gap-2 rounded-md p-2 hover:text-white">
            <MdHome size={22} className="text-blueBay hover:text-white" />
            <Link href={'/dashboard/event-organizer'}>Dashboard</Link>
          </li>
          <li className="hover:bg-azureBlue text-md flex h-[40px]  items-center justify-start gap-2 rounded-md p-2 hover:text-white">
            <MdEventAvailable
              size={22}
              className="text-blueBay hover:text-white"
            />
            <Link href={'/dashboard/event-organizer/event'}>My Event</Link>
          </li>
          <li className="hover:bg-azureBlue text-md flex h-[40px]  items-center justify-start gap-2 rounded-md p-2 hover:text-white">
            <MdOutlinePointOfSale
              size={22}
              className="text-blueBay hover:text-white"
            />
            <Link href={'/dashboard/event-organizer/sales'}>Ticket Sales</Link>
          </li>
          <li className="hover:bg-azureBlue text-md flex h-[40px]  items-center justify-start gap-2 rounded-md p-2 hover:text-white">
            <MdNewspaper size={22} className="text-blueBay hover:text-white" />
            <a>Create Ticket</a>
          </li>
          <li
            onClick={handleLogout}
            className="hover:bg-azureBlue text-md flex h-[40px]  items-center justify-start gap-2 rounded-md p-2 hover:text-white"
          >
            <MdLogout size={22} className="text-blueBay hover:text-white" />
            <a>Logout</a>
          </li>
        </div>
      </ul>
    </div>
  );
}
