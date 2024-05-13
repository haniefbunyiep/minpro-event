'use client';
import { format, parseISO } from 'date-fns';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';

import Image from 'next/image';
import moment from 'moment';
export const CardEvent = ({
  name,
  startDate,
  endDate,
  time,
  address,
  city,
  images,
}) => {
  const timeM = moment(time);
  const timeR = timeM.format('HH : mm');
  console.log(images);
  console.log(timeR);
  const dateS = format(new Date(startDate), 'dd');
  const dateE = format(new Date(endDate), 'dd MMM yyyy');
  return (
    <div className="card card-compact bg-base-100 w-[350px] shadow-xl">
      <figure>
        {images ? (
          <Image
            src={'http://localhost:8000/' + images}
            alt="Heptatix"
            width={10000}
            height={10000}
            quality={100}
            priority={true}
            className="h-[100px]"
          />
        ) : null}
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <span className="flex items-center gap-2 font-bold">
          <MdCalendarMonth size={20} /> {dateS} - {dateE}
        </span>
        <span className="fond-bold flex items-center gap-2">
          {' '}
          <MdOutlineAccessTimeFilled size={20} /> {timeR} - Selesai
        </span>
        <span className="fond-bold flex items-center gap-2">
          <FaMapLocation size={20} /> {address}, {city}
        </span>
        <div className="card-actions justify-end">
          <button className="btn btn-primary text-white">Buy Ticket</button>
        </div>
      </div>
    </div>
  );
};
