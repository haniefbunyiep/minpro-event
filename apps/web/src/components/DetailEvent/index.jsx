'use client';

import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';
import { SandKEventDetail } from '@/components/S&K';
import moment from 'moment';
import { IoFilterSharp } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const EventDetailParams = ({
  eventId,
  name,
  startDate,
  endDate,
  time,
  address,
  city,
  images,
  ticket,
  description,
  category,
}) => {
  const [qty, setQty] = useState(1);
  const handleClick = () => {
    setQty((prevCount) => Math.max(prevCount - 1, 0));
  };
  console.log(qty);
  const navigate = useRouter();
  // console.log(eventId);

  // console.log(qty);
  const timeM = moment(time);

  const timeR = timeM.format('HH : mm');
  const dateS = format(new Date(startDate), 'dd');
  const dateE = format(new Date(endDate), 'dd MMM yyyy');
  return (
    <div>
      <div className="grid min-h-screen grid-cols-1 gap-5 overflow-hidden xl:grid-cols-3">
        <div className="col-span-2 w-full">
          <div className="bg-congressBlue flex h-[35px] w-[80px] items-center justify-center rounded-lg border border-blue-800 tracking-wide text-white">
            <h1 className="text-sm font-bold">{category}</h1>
          </div>
          <h1 className="pt-3 text-3xl font-bold">{name}</h1>
          <Image
            src={'http://localhost:8000/' + images}
            alt="Heptatix"
            className="mobile:w-[100vw] mobile:h-[200px] h-[300px] rounded-lg pt-10 sm:w-[100vw] lg:h-[300px] lg:w-[60vw] xl:h-[350px] xl:w-[50vw]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex gap-7 pt-10 sm:w-[30vw]">
                <div className="flex cursor-pointer items-center justify-center rounded-full bg-blue-50 tracking-wide sm:h-[40px] sm:w-[120px]">
                  <h1 className="text-sm font-bold text-blue-600">Deskripsi</h1>
                </div>
              </div>
              <div className=" px-2 pt-10 text-justify">
                <h1 className="pb-5 text-xl font-bold">Deskripsi Event</h1>
                <p className="pb-5">{description}</p>
              </div>
              <SandKEventDetail />
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-[120px]">
          <div className="card bg-base-100 xxl:w-[45vh] shadow-xl xl:w-[35vh]">
            <div className="card-body">
              <h1 className="pb-5 text-xl font-bold">Detail Event</h1>
              <div className="flex gap-2 py-3">
                <MdCalendarMonth size={20} />
                <div className="flex flex-col">
                  <h1 className="text-sm text-gray-400">Tanggal</h1>
                  <h1 className="text-sm font-bold">
                    {dateS} - {dateE}
                  </h1>
                </div>
              </div>
              <div className="flex gap-2 py-3">
                <MdOutlineAccessTimeFilled size={20} />
                <div className="flex flex-col">
                  <h1 className="text-sm text-gray-400">Waktu</h1>
                  <h1 className="text-sm font-bold">{timeR} - Selesai</h1>
                </div>
              </div>
              <div className="flex gap-2 py-3 pb-16">
                <FaMapLocation size={20} />
                <div className="flex flex-col">
                  <h1 className="text-sm text-gray-400">Lokasi</h1>
                  <h1 className="text-sm font-bold text-blue-500">
                    {address} - {city}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-10">
            <div className="card bg-base-100 xxl:w-[45vh] shadow-xl xl:w-[35vh]">
              <div className="card-body">
                <div className=" flex items-center gap-2 font-medium tracking-wide">
                  <h1 className="text-xl font-bold">Pilih Ticket</h1>
                </div>
                <div className="flex flex-col">
                  {ticket?.map((value, index) => {
                    return (
                      <div key={index} className="py-5">
                        <div className="card xxl:h-[180px] xxl:w-[36vh] h-[180px] bg-blue-50 px-5 shadow-xl xl:w-[30vh]">
                          <div className="pt-5">
                            <h1 className="font-bold">{value.name}</h1>
                          </div>
                          <div className="divider px-4"></div>
                          <div className="xxl:flex-row flex items-center justify-between xl:flex-col xl:gap-2">
                            <h1 className="font-bold">
                              {value.price.toLocaleString('ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </h1>
                            <button
                              className="btn bg-azureBlue text-white"
                              onClick={() => {
                                document.getElementById(index).showModal();
                                setQty(1);
                              }}
                            >
                              Pilih
                            </button>
                            <dialog id={index} className="modal">
                              <div className="modal-box flex flex-col gap-6">
                                <h3 className="text-lg font-bold">
                                  Ticket&nbsp;{value?.name}
                                </h3>
                                <p className="py-4">
                                  Masukkan jumlah tiket yang ingin dibeli
                                </p>
                                <div className="flex items-center justify-between px-10">
                                  <div
                                    onClick={handleClick}
                                    className="btn bg-azureBlue hover:bg-dodgerBlue w-[70px] text-white"
                                  >
                                    -
                                  </div>
                                  <div className="btn bg-azureBlue hover:bg-azureBlue w-[70px] text-white">
                                    {qty}
                                  </div>
                                  <div
                                    onClick={() => {
                                      if (qty >= value?.quantity) {
                                        return value?.quantity;
                                      } else {
                                        return setQty(qty + 1);
                                      }
                                    }}
                                    className="btn bg-azureBlue hover:bg-dodgerBlue w-[70px] text-white"
                                  >
                                    +
                                  </div>
                                </div>
                                <div
                                  onClick={() => {
                                    navigate.push(
                                      `/transaction?event=${eventId}&ticket=${value?.id}&qty=${qty}`,
                                    );
                                    console.log(value?.id);
                                  }}
                                  className="btn bg-azureBlue hover:bg-dodgerBlue text-white"
                                >
                                  Beli
                                </div>
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="btn">Close</button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          </div>
                          <div>Ticket Stock&nbsp;{value?.quantity}</div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="pt-10">
                    <button className="btn btn-primary w-full text-white">
                      Beli Ticket
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
