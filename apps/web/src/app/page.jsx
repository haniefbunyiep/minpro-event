'use client';
import { CardEvent } from './../components/EventCard';
import { CarouselPage } from './../components/Carousel';
import { useGetEvent } from '../hooks/useGetEvent';
import Link from 'next/link';

export default function Home() {
  const { data } = useGetEvent();
  return (
    <div className="min-h-screen">
      <div className="overflow-hidden px-2 py-5">
        <CarouselPage />
      </div>

      <div className="mobile:px-4 px-4 pt-10 lg:px-[100px]">
        <h1 className="mobile:text-xl font-bold sm:text-2xl">EVENT TERDEKAT</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-1 gap-10 py-12 md:grid-cols-2 lg:grid-cols-4 ">
          {data?.data.data.map((value, index) => {
            return (
              <div key={index}>
                <Link href={'/event/detail/' + value.id}>
                  <CardEvent
                    key={index}
                    name={value.name}
                    startDate={value.startDate}
                    endDate={value.endDate}
                    time={value.time}
                    address={value.location.address}
                    city={value.location.city}
                    images={value?.EventImage?.url}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
