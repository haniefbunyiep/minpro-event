'use client';
import { getEventbyId } from './../../../hooks/getEventById';
import Loading from './../../../components/cores/Loading';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';

export default function TransactionDetailPage(params) {
  const { getEvent, isLoading, isError } = getEventbyId(
    params.params.transactionDetail,
  );

  // console.log(params.params.transactionDetail);
  const eventInfo = getEvent?.data?.data?.eventInfo;
  const ticketInfo = getEvent?.data?.data?.Ticketinfo;
  console.log(eventInfo);
  console.log(ticketInfo);

  if (isLoading) return <Loading></Loading>;
  return (
    <div className="flex min-h-screen items-center justify-center p-[100px]">
      <div className="flex h-[600px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl">
        <div className="flex flex-col gap-[25px] ">
          <div className="text-[25px] font-bold">{eventInfo?.name}</div>
          <div className="card-body">
            <h1 className="pb-5 text-xl font-bold">Detail Event</h1>
            <div className="flex gap-2 py-3">
              <MdCalendarMonth size={20} />
              <div className="flex flex-col">
                <h1 className="text-sm text-gray-400">Tanggal</h1>
                <h1 className="text-sm font-bold">test</h1>
              </div>
            </div>
            <div className="flex gap-2 py-3">
              <MdOutlineAccessTimeFilled size={20} />
              <div className="flex flex-col">
                <h1 className="text-sm text-gray-400">Waktu</h1>
                <h1 className="text-sm font-bold"> test</h1>
              </div>
            </div>
            <div className="flex gap-2 py-3 pb-16">
              <FaMapLocation size={20} />
              <div className="flex flex-col">
                <h1 className="text-sm text-gray-400">Lokasi</h1>
                <h1 className="text-sm font-bold text-blue-500">test</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
