'use client';

import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';
import { SandKEventDetail } from '@/components/S&K';
import moment from 'moment';
import { IoFilterSharp } from 'react-icons/io5';

export const EventDetailParams = ({
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
  const timeM = moment(time);
  // console.log(ticket);
  const timeR = timeM.format('HH : mm');
  const dateS = format(new Date(startDate), 'dd');
  const dateE = format(new Date(endDate), 'dd MMM yyyy');
  return (
    <div>
      <div className="grid min-h-screen grid-cols-3 gap-5 overflow-hidden">
        <div className="col-span-2 w-full">
          <div className="bg-congressBlue flex h-[35px] w-[80px] items-center justify-center rounded-lg border border-blue-800 tracking-wide text-white">
            <h1 className="text-sm font-bold">{category}</h1>
          </div>
          <h1 className="pt-3 text-3xl font-bold">{name}</h1>
          <Image
            src={'http://localhost:8000/' + images}
            alt="Heptatix"
            className="mobile:w-[100vw] mobile:h-[150px] h-[250px] rounded-lg pt-10 md:w-[55vw] lg:h-[300px] lg:w-[60vw] xl:h-[400px] xl:w-[50vw]"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
          />
          <div>
            <div className="flex w-[30vw] gap-7 pt-10">
              <div className="flex h-[40px] w-[120px] cursor-pointer items-center justify-center rounded-full bg-blue-50 tracking-wide">
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
        <div className="flex flex-col pt-[120px]">
          <div className="card bg-base-100 w-[50vh] shadow-xl">
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
            <div className="card bg-base-100 w-[50vh] shadow-xl">
              <div className="card-body">
                <div className=" flex items-center gap-2 font-medium tracking-wide">
                  <h1 className="text-xl font-bold">Pilih Ticket</h1>
                </div>
                <div className="flex flex-col">
                  {ticket?.map((value, index) => {
                    return (
                      <div key={index} className="py-5">
                        <div className="card h-[180px] w-[40vh] bg-blue-50 px-5 shadow-xl">
                          <div className="pt-5">
                            <h1 className="font-bold">{value.name}</h1>
                          </div>
                          <div className="divider px-4"></div>
                          <div className="flex items-center justify-between">
                            <h1 className="font-bold">
                              {value.price.toLocaleString('ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </h1>
                            <button
                              className="btn btn-primary w-[100px] text-white"
                              type="button"
                            >
                              Pilih
                            </button>
                          </div>
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
