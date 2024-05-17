import { MdAccountCircle, MdWallet, MdListAlt } from 'react-icons/md';
import Link from 'next/link';

export default function UserSideBar() {
  return (
    <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
      <Link
        href={'/dashboard/user'}
        className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
      >
        <MdAccountCircle size={30} />
        My Account
      </Link>
      <Link
        href={'/dashboard/user/voucher'}
        className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
      >
        <MdWallet size={30} />
        My Voucher
      </Link>
      <Link
        href={'/dashboard/user/ticket'}
        className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
      >
        <MdListAlt size={30} />
        My Ticket
      </Link>
    </div>
  );
}
