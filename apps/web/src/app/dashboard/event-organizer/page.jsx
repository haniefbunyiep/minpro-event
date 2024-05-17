'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';
import { useKeepLogin } from '../../../hooks/useKeepLogin';
import EOSidebar from '../../../components/EODashboard/EOSidebar';
import EOTopbar from '../../../components/EODashboard/EOTopbar';

export default function EODashboard() {
  const { userData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();

  useEffect(() => {
    mutationKeepLogin();
  }, []);

  return (
    <div className="flex h-screen ">
      <EOSidebar></EOSidebar>
      {/* Content */}
      <div className="relative flex w-full flex-col items-center justify-center ">
        <EOTopbar></EOTopbar>
        <div className="absolute bottom-0 h-[90%] w-full p-10">
          <p className="text-xl font-bold">Welcome back, {userData?.name}!</p>
        </div>
      </div>
    </div>
  );
}
