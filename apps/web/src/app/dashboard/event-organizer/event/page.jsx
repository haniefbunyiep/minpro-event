'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { useKeepLogin } from '../../../../hooks/useKeepLogin';
import EOSidebar from '../../../../components/EODashboard/EOSidebar';
import EOTopbar from '../../../../components/EODashboard/EOTopbar';
import { useGetEventByEOId } from './../../../../hooks/useGetEventByEOId';
import Loading from './../../../../components/cores/Loading';
import { useRouter } from 'next/navigation';

export default function EODashboardEvent() {
  const { userData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();
  const { eventInfo, isLoading } = useGetEventByEOId();
  const navigate = useRouter();
  const router = useRouter();
  const eventDataResult = eventInfo?.data?.data;

  useEffect(() => {
    mutationKeepLogin();
  }, []);

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="flex h-screen ">
      <EOSidebar></EOSidebar>
      {/* Content */}
      <div className="relative flex w-full flex-col items-center justify-center ">
        <EOTopbar></EOTopbar>
        <div className="absolute bottom-0 flex h-[90%] w-full flex-col gap-10 p-10">
          <p className="text-xl font-bold">Welcome back, {userData?.name}!</p>
          <div className="flex h-full flex-col items-center justify-start  rounded-md  p-6 shadow-2xl">
            <div className="text-xl">Event List</div>
            <div className="divider w-full"></div>
            <div className="flex w-full flex-col gap-6">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>City</th>
                      <th>Start Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {eventDataResult?.map((x, i) => {
                      return (
                        <tr
                          onClick={() =>
                            navigate.push(
                              '/dashboard/event-organizer/event/' + x.id,
                            )
                          }
                          href={'/'}
                          className="hover"
                          key={i}
                        >
                          <th>{i + 1}</th>
                          <th>{x.name}</th>
                          <th>{x.category.name}</th>
                          <th>{x.location.city}</th>
                          <th>{x.startDate.split('T', 1)}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
