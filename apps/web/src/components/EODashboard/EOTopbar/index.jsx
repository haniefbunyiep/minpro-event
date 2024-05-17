import { FaCirclePlus } from 'react-icons/fa6';
import Link from 'next/link';

export default function EOTopbar() {
  return (
    <div className="absolute top-0 flex h-[10%] w-full items-center justify-end  p-10">
      <div className="btn bg-azureBlue hover:bg-dodgerBlue flex items-center justify-center gap-2 text-white">
        <FaCirclePlus size={20} />
        <Link href={'/event/register'} className=" text-xl">
          Create Event
        </Link>
      </div>
    </div>
  );
}
