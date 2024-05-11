'use client';
import { format, parseISO } from 'date-fns';
import { MdCalendarMonth } from 'react-icons/md';
import moment from 'moment';
export const CardEvent = ({
  name,
  startDate,
  endDate,
  time,
  address,
  city,
  category,
  images,
}) => {
  const timeM = moment(time);
  const timeR = timeM.format('HH : mm');

  const dateS = format(new Date(startDate), 'dd');
  const dateE = format(new Date(endDate), 'dd MMM yyyy');
  return (
    <div className="card card-compact bg-base-100 w-[300px] shadow-xl">
      <figure>
        <img src="{images}" alt="Heptatix" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{category}</p>
        <span className="flex items-center gap-2 font-bold">
          <MdCalendarMonth size={20} /> {dateS} - {dateE}
        </span>
        <p>{timeR} - Selesai</p>
        <p>
          {address}, {city}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
