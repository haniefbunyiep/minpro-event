'use client';
import { useGetUserInfo } from './../../../../hooks/useGetUserInfo';
import Loading from './../../../../components/cores/Loading';
import { useState, useEffect } from 'react';
import { MdAccountCircle, MdWallet, MdListAlt } from 'react-icons/md';
import Link from 'next/link';

export default function UserDashboard() {
  const [voucher, setVoucher] = useState([]);
  const [formatDate, setFormatDate] = useState(null);
  const { userInfo, isLoading } = useGetUserInfo([]);
  const getUserPointExpire = userInfo?.data.data.pointExpire.split('T', 1);

  console.log(userInfo?.data.data.voucher);

  useEffect(() => {
    setVoucher({ userVoucher: userInfo?.data.data.voucher });
  }, [userInfo]);

  useEffect(() => {
    setFormatDate(getUserPointExpire);
  }, [userInfo]);

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
    // User Voucher
    <div className="flex h-fit items-center justify-center p-[100px]">
      <div className="flex w-[1050px] justify-between gap-10">
        <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
          <Link
            href={'/dashboard/user'}
            className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
          >
            <MdAccountCircle size={30} />
            My Account
          </Link>
          <Link
            href={'/dashboard/user/voucher'}
            className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
          >
            <MdWallet size={30} />
            My Voucher
          </Link>
          <Link
            href={'/'}
            className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
          >
            <MdListAlt size={30} />
            My Ticket
          </Link>
        </div>
        <div className="flex h-max w-[70%] flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
          <div className="flex text-xl font-bold">User Voucher</div>
          <div className="divider w-full"></div>
          <div className="flex w-full items-center justify-center overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Voucher Code</th>
                  <th>Discount</th>
                  <th>Expire At</th>
                </tr>
              </thead>
              <tbody>
                {voucher?.userVoucher?.map((x, i) => {
                  return (
                    <tr className="hover" key={i}>
                      <th>{i + 1}</th>
                      <td>{x.voucherCode}</td>
                      <td>{x.discountInPercent}%</td>
                      <td>{formatDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
