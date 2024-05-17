'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { useKeepLogin } from '../../../../../hooks/useKeepLogin';
import { getEventbyId } from './../../../../../hooks/getEventById';
import EOSidebar from './../../../../../components/EODashboard/EOSidebar';
import EOTopbar from './../../../../../components/EODashboard/EOTopbar';
import Loading from './../../../../../components/cores/Loading';

export default function EventDetail(params) {
  const { userData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();
  const { getEvent, isLoading, error } = getEventbyId(
    params.params.eventDetail,
  );
  console.log(error);
  const eventData = getEvent?.data?.data;
  const eventTicket = eventData?.Ticketinfo;
  useEffect(() => {
    mutationKeepLogin();
  }, []);

  // console.log(eventData);
  // console.log(eventData?.eventInfo);
  console.log(eventTicket);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="flex h-screen ">
      <EOSidebar></EOSidebar>
      {/* Content */}
      <div className="relative flex w-full flex-col items-center justify-center ">
        <EOTopbar></EOTopbar>
        <div className="absolute bottom-0 h-[90%] w-full p-10">
          <p className="text-xl font-bold">Welcome back, {userData?.name}!</p>
          <div className="flex h-full flex-col items-center justify-start  rounded-md  p-6">
            <div className="text-xl">{eventData?.eventInfo?.name}</div>
            <div className="divider w-full"></div>
            <div className="flex w-full flex-col gap-6">
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event Category :</div>
                <div className="flex items-center justify-start">
                  {eventData?.eventInfo?.category?.name}
                </div>
              </div>
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event Location :</div>
                <div className="flex items-center justify-start">
                  {eventData?.eventInfo?.location?.address},&nbsp;
                  {eventData?.eventInfo?.location?.city},&nbsp;
                  {eventData?.eventInfo?.location?.zip},&nbsp;
                </div>
              </div>
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event Description :</div>
                <div className="flex items-center justify-start">
                  {eventData?.eventInfo?.description}
                </div>
              </div>
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event Start Date :</div>
                <div className="flex items-center justify-start">
                  {eventData?.eventInfo?.startDate.split('T', 1)}
                </div>
              </div>
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event End Date :</div>
                <div className="flex items-center justify-start">
                  {eventData?.eventInfo?.endDate.split('T', 1)}
                </div>
              </div>
              <div className="relative flex w-full flex-col gap-2  text-xl">
                <div className="font-bold">Event Ticket Type :</div>
                <div className="flex items-center justify-start">
                  {eventData?.Ticketinfo.length == 0 ? (
                    'This Event Doesnt Have a Ticket Type'
                  ) : (
                    <div className="w-full overflow-x-auto ">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {eventTicket?.map((x, i) => {
                            return (
                              <tr key={i} className="hover">
                                <th>{i + 1}</th>
                                <td>{x.name}</td>
                                <td>
                                  {x.price.toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                  })}
                                </td>
                                <td>{x.quantity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
