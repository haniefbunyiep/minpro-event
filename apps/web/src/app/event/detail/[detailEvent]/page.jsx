'use client';
import { useGetEventByIdMutate } from '../../../../hooks/useGetEventById';
import { useGetEvent } from '@/hooks/useGetEvent';
import { EventDetailParams } from '@/components/DetailEvent';
import Loading from './../../../../components/cores/Loading';

export default function EventDetail(params) {
  const { data } = useGetEventByIdMutate(params.params.detailEvent);

  if (data == undefined) return <Loading></Loading>;
  console.log();
  return (
    <div className="mobile:px-2 min-h-screen overflow-hidden py-10 lg:px-[200px]">
      <div>
        <EventDetailParams
          eventId={data?.data?.data.id}
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
