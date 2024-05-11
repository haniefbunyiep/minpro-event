'use client';
import { CardEvent } from './../components/EventCard';
import { CarouselPage } from './../components/Carousel';
import { useGetEvent } from './../hooks/useGetEvent';

export default function Home() {
  const { data } = useGetEvent();
  return (
    <div className="min-h-screen">
      <div className="overflow-hidden px-2 py-5">
        <CarouselPage />
      </div>
      <div className="px-[150px] pt-10">
        <h1 className="text-2xl font-bold">EVENT TERDEKAT</h1>
      </div>
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-3 gap-20 py-12 ">
          {data?.data?.data.map((value, index) => {
            return (
              <div key={index}>
                <CardEvent
                  key={index}
                  name={value.name}
                  startDate={value.startDate}
                  endDate={value.endDate}
                  time={value.time}
                  address={value.location.address}
                  city={value.location.city}
                  category={value.category.name}
                  // images={value.EventImage[0].url}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
