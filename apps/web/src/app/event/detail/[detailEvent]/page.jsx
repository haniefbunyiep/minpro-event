'use client';
import { useGetEventByIdMutate } from '../../../../hooks/useGetEventById';
import { useGetEvent } from '@/hooks/useGetEvent';
import { EventDetailParams } from '@/components/DetailEvent';

export default function EventDetail(params) {
  const { data } = useGetEventByIdMutate(params.params.detailEvent);

  if (data == undefined) return <div>Loading...</div>;
  return (
    <div className="mobile:px-2 min-h-screen overflow-hidden px-[200px] py-10">
      <div>
        <EventDetailParams
          name={data?.data?.data.name}
          startDate={data?.data?.data.startDate}
          endDate={data?.data?.data.endDate}
          time={data?.data?.data.time}
          category={data?.data?.data.category.name}
          description={data?.data?.data.description}
          address={data?.data?.data.location.address}
          city={data?.data?.data.location.city}
          images={data?.data?.data?.EventImage?.url}
          ticket={data?.data?.data.Ticket}
        />
      </div>
    </div>
  );
}
