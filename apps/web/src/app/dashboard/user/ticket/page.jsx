'use client';
import { useGetUserInfo } from './../../../../hooks/useGetUserInfo';
import Loading from './../../../../components/cores/Loading';
import { useState, useEffect } from 'react';
import UserSideBar from './../../../../components/userDashboard/userSideBar';

export default function UserDashboard() {
  let [navbar, setNavbar] = useState(1);
  const [voucher, setVoucher] = useState([]);
  const [formatDate, setFormatDate] = useState(null);
  const { userInfo, isLoading } = useGetUserInfo([]);
  const getUserPointExpire = userInfo?.data.data.pointExpire.split('T', 1);

  const userTransaction = userInfo?.data?.data?.userTransaction;
  console.log(userTransaction);

  useEffect(() => {
    setVoucher({ userVoucher: userInfo?.data.data.voucher });
  }, [userInfo]);

  useEffect(() => {
    setFormatDate(getUserPointExpire);
  }, [userInfo]);

  useEffect(() => {
    console.log(navbar);
  }, [navbar]);

  if (getUserPointExpire == undefined)
    return (
      <div className="flex h-screen items-center justify-center p-[100px]">
        <Loading></Loading>
      </div>
    );

  if (isLoading && voucher == undefined)
    return (
      <div className="flex h-screen items-center justify-center p-[100px]">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="flex h-fit items-center justify-center p-[100px]">
      <div className="flex w-[1050px] justify-between gap-10">
        <UserSideBar></UserSideBar>
        <div className="flex w-[70%] flex-col gap-10 ">
          <div className="flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
            <div className="flex text-xl font-bold">User Transaction</div>
            <div className="divider w-full"></div>
            <div className="flex w-full items-center justify-center overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Event Name</th>
                    <th>Ticket Name</th>
                    <th>Total Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {userTransaction?.map((x, i) => {
                    return (
                      <tr className="hover" key={i}>
                        <th>{i + 1}</th>
                        <td>{x?.event?.name}</td>
                        <td>{x?.ticket?.name}</td>
                        <td>
                          {x?.subTotal.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </td>
                        <td>{x?.quantity}</td>
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
  );
}
