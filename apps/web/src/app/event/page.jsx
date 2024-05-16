'use client';
import { IoFilterSharp } from 'react-icons/io5';
import { useGetEvent } from '../../hooks/useGetEvent';
import { CardEvent } from '../../components/EventCard';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';
import { toast } from 'react-toastify';

export default function Event() {
  const [getCity, setCity] = useState('');
  const [getCategory, setCategory] = useState('');

  const city = useDebounce(getCity, 1000);
  const category = useDebounce(getCategory, 1000);

  const { data } = useGetEvent(city, category);

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 py-10 lg:px-[100px] xl:grid-cols-4">
        <div className="w-[20vw]">
          <h1 className="hidden pb-5 text-2xl font-bold tracking-wide sm:block">
            Jelajah
          </h1>
          <div className="card xxl:w-[20vw] w-[100vw] shadow-xl lg:w-[80vw] xl:w-[25vw]">
            <div className="bg-congressBlue collapse">
              <input type="checkbox" />
              <div className="collapse-title flex items-center gap-2 text-xl font-medium tracking-wide text-white">
                <IoFilterSharp size={20} /> Filter
              </div>
              <div className="collapse-content">
                <div className="flex flex-col">
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text text-[18px] text-white">
                        Location
                      </span>
                    </div>
                    <input
                      type="search"
                      name="name"
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Type Location Event"
                      className="input input-bordered"
                    />
                  </label>
                  <label className="form-control">
                    <div className="label">
                      <span className="label-text text-[18px] text-white">
                        Category
                      </span>
                    </div>
                    <input
                      type="seacrh"
                      name="name"
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Type Category Event"
                      className="input input-bordered"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full sm:col-span-3">
          <div className="flex items-center justify-center">
            <div className="xxl:grid-cols-3 grid grid-cols-1 gap-10  gap-5 py-12 md:grid-cols-2 lg:grid-cols-2">
              {data === undefined ? (
                <div className="flex w-full items-center justify-center">
                  <h1 className="fond-bold text-xl">Event Not Found</h1>
                </div>
              ) : (
                data?.data.data.map((value, index) => {
                  return (
                    <div key={index}>
                      <Link href={`/event/detail/${value.id}`}>
                        <CardEvent
                          key={index}
                          name={value.name}
                          startDate={value.startDate}
                          endDate={value.endDate}
                          time={value.time}
                          address={value.location.address}
                          city={value.location.city}
                          images={value?.EventImage?.url}
                          ticket={value?.Ticket[0]?.price}
                        />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
