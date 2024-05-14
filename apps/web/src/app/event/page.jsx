'use client';
import { IoFilterSharp } from 'react-icons/io5';
import { useGetEvent } from '../../hooks/useGetEvent';
import { CardEvent } from '../../components/EventCard';
import Link from 'next/link';

export default function Event() {
  const { data } = useGetEvent();
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-3 px-[100px] py-10">
        <div className="w-[20vw]">
          <h1 className="pb-5 text-2xl font-bold tracking-wide">Jelajah</h1>
          <div className="card w-96 shadow-xl">
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
                      type="seacrh"
                      name="name"
                      placeholder="Type Location Event"
                      className="input input-bordered"
                    />
                    <div className="label">
                      <select className="h-[30px] w-full rounded-lg">
                        <option>Choose Location</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                      </select>
                    </div>
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
                      placeholder="Type Category Event"
                      className="input input-bordered"
                    />
                    <div className="label">
                      <select className="h-[30px] w-full rounded-lg">
                        <option>Choose Category</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                        <option value="1">Jakarta</option>
                      </select>
                    </div>
                  </label>
                  <div className="pt-10">
                    <button className="btn btn-primary w-full text-white">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" col-span-2 w-full">
          <div className="flex items-center justify-center">
            <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-3 ">
              {data?.data.data.map((value, index) => {
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
                        ticket={value?.Ticket[0].price}
                      />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
