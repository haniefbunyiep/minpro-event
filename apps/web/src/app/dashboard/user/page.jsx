'use client';
import { useGetUserInfo } from './../../../hooks/useGetUserInfo';
import Loading from './../../../components/cores/Loading';
import { useState, useEffect } from 'react';
import { MdAccountCircle, MdWallet, MdListAlt } from 'react-icons/md';
import UserSideBar from './../../../components/userDashboard/userSideBar';
import Link from 'next/link';

export default function UserDashboard() {
  let [navbar, setNavbar] = useState(1);
  const [voucher, setVoucher] = useState([]);
  const [formatDate, setFormatDate] = useState(null);
  const { userInfo, isLoading } = useGetUserInfo([]);
  const getUserPointExpire = userInfo?.data.data.pointExpire.split('T', 1);

  // console.log(userInfo?.data.data);

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

  // if (navbar == 0)
  //   return (
  //     <div className="flex h-screen items-center justify-center p-[100px]">
  //       <Loading></Loading>
  //     </div>
  //   );
  // if (navbar == 1)
  //   return (
  //     <div className="flex h-fit items-center justify-center p-[100px]">
  //       <div className="flex w-[1050px] justify-between gap-10">
  //         <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
  //           <div
  //             onClick={() => setNavbar((navbar = 1))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdAccountCircle size={30} />
  //             My Account
  //           </div>
  //           <div
  //             onClick={() => setNavbar((navbar = 2))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdWallet size={30} />
  //             My Voucher
  //           </div>
  //           <div
  //             onClick={() => setNavbar((navbar = 3))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdListAlt size={30} />
  //             My Ticket
  //           </div>
  //         </div>
  //         <div className="flex w-[70%] flex-col gap-10 ">
  //           <div className="flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
  //             <div className="flex text-xl font-bold">User Information</div>
  //             <div className="divider w-full"></div>
  //             <div className="flex w-full">
  //               <div className="flex w-full flex-col gap-2 ">
  //                 <div className="font-bold">Name :</div>
  //                 <div className="font-bold">Email :</div>
  //                 <div className="font-bold">Username :</div>
  //               </div>
  //               <div className="flex w-full flex-col gap-2 ">
  //                 <div>{userInfo?.data.data.name}</div>
  //                 <div>{userInfo?.data.data.email}</div>
  //                 <div>{userInfo?.data.data.username}</div>
  //               </div>
  //             </div>
  //           </div>
  //           <div className="flex h-max w-full flex-col items-start justify-between gap-6 rounded-md border-2 border-white bg-white p-10 shadow-md">
  //             <div className="flex w-full flex-col items-center justify-center gap-2 text-xl font-bold">
  //               <h1>User Referral Code</h1>
  //               <h1>{userInfo?.data.data.referralCode}</h1>
  //             </div>
  //             <div className="flex w-full">
  //               <div className="flex w-full flex-col gap-2 ">
  //                 <div className="font-bold">Total Point :</div>
  //                 <div className="font-bold">Point Expire :</div>
  //               </div>
  //               <div className="flex w-full flex-col gap-2 ">
  //                 <div>
  //                   {userInfo?.data.data.point.toLocaleString('id-ID', {
  //                     style: 'currency',
  //                     currency: 'IDR',
  //                   })}
  //                 </div>
  //                 <div>{userInfo?.data.data.pointExpire.split('T', 1)}</div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // if (navbar == 2)
  //   return (
  //     <div className="flex h-fit items-center justify-center p-[100px]">
  //       <div className="flex w-[1050px] justify-between gap-10">
  //         <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
  //           <div
  //             onClick={() => setNavbar((navbar = 1))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdAccountCircle size={30} />
  //             My Account
  //           </div>
  //           <div
  //             onClick={() => setNavbar((navbar = 2))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdWallet size={30} />
  //             My Voucher
  //           </div>
  //           <div
  //             onClick={() => setNavbar((navbar = 3))}
  //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
  //           >
  //             <MdListAlt size={30} />
  //             My Ticket
  //           </div>
  //         </div>
  //         <div className="flex h-max w-[70%] flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
  //           <div className="flex text-xl font-bold">User Voucher</div>
  //           <div className="divider w-full"></div>
  //           <div className="flex w-full items-center justify-center overflow-x-auto">
  //             <table className="table">
  //               {/* head */}
  //               <thead>
  //                 <tr>
  //                   <th></th>
  //                   <th>Voucher Code</th>
  //                   <th>Discount</th>
  //                   <th>Expire At</th>
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 {voucher?.userVoucher?.map((x, i) => {
  //                   return (
  //                     <tr className="hover" key={i}>
  //                       <th>{i + 1}</th>
  //                       <td>{x.voucherCode}</td>
  //                       <td>{x.discountInPercent}%</td>
  //                       <td>{formatDate}</td>
  //                     </tr>
  //                   );
  //                 })}
  //               </tbody>
  //             </table>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    // <>
    //   {navbar == 1 ? (
    //     <div className="flex h-fit items-center justify-center p-[100px]">
    //       <div className="flex w-[1050px] justify-between gap-10">
    //         <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
    //           <div
    //             onClick={() => setNavbar((navbar = 1))}
    //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
    //           >
    //             <MdAccountCircle size={30} />
    //             My Account
    //           </div>
    //           <div
    //             onClick={() => setNavbar((navbar = 2))}
    //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
    //           >
    //             <MdWallet size={30} />
    //             My Voucher
    //           </div>
    //           <div
    //             onClick={() => setNavbar((navbar = 3))}
    //             className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
    //           >
    //             <MdListAlt size={30} />
    //             My Ticket
    //           </div>
    //         </div>
    //         <div className="flex w-[70%] flex-col gap-10 ">
    //           <div className="flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
    //             <div className="flex text-xl font-bold">User Information</div>
    //             <div className="divider w-full"></div>
    //             <div className="flex w-full">
    //               <div className="flex w-full flex-col gap-2 ">
    //                 <div className="font-bold">Name :</div>
    //                 <div className="font-bold">Email :</div>
    //                 <div className="font-bold">Username :</div>
    //               </div>
    //               <div className="flex w-full flex-col gap-2 ">
    //                 <div>{userInfo?.data.data.name}</div>
    //                 <div>{userInfo?.data.data.email}</div>
    //                 <div>{userInfo?.data.data.username}</div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="flex h-max w-full flex-col items-start justify-between gap-6 rounded-md border-2 border-white bg-white p-10 shadow-md">
    //             <div className="flex w-full flex-col items-center justify-center gap-2 text-xl font-bold">
    //               <h1>User Referral Code</h1>
    //               <h1>{userInfo?.data.data.referralCode}</h1>
    //             </div>
    //             <div className="flex w-full">
    //               <div className="flex w-full flex-col gap-2 ">
    //                 <div className="font-bold">Total Point :</div>
    //                 <div className="font-bold">Point Expire :</div>
    //               </div>
    //               <div className="flex w-full flex-col gap-2 ">
    //                 <div>
    //                   {userInfo?.data.data.point.toLocaleString('id-ID', {
    //                     style: 'currency',
    //                     currency: 'IDR',
    //                   })}
    //                 </div>
    //                 <div>{userInfo?.data.data.pointExpire.split('T', 1)}</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="flex h-screen items-center justify-center p-[100px]">
    //       <Loading></Loading>
    //     </div>
    //   )}
    // </>
    <div className="flex h-fit items-center justify-center p-[100px]">
      <div className="flex w-[1050px] justify-between gap-10">
        {/* <div className="bg-downriver border-downriver flex h-[600px] w-[30%] flex-col items-start justify-start gap-4 rounded-md border-2 p-10 text-white">
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
          <div
            onClick={() => setNavbar((navbar = 3))}
            className="btn bg-downriver border-downriver hover:bg-scienceBlue hover:border-scienceBlue flex w-full justify-start text-white"
          >
            <MdListAlt size={30} />
            My Ticket
          </div>
        </div> */}
        <UserSideBar></UserSideBar>
        <div className="flex w-[70%] flex-col gap-10 ">
          <div className="flex h-max w-full flex-col items-start justify-between rounded-md border-2 border-white bg-white p-10 shadow-md">
            <div className="flex text-xl font-bold">User Information</div>
            <div className="divider w-full"></div>
            <div className="flex w-full">
              <div className="flex w-full flex-col gap-2 ">
                <div className="font-bold">Name :</div>
                <div className="font-bold">Email :</div>
                <div className="font-bold">Username :</div>
              </div>
              <div className="flex w-full flex-col gap-2 ">
                <div>{userInfo?.data.data.name}</div>
                <div>{userInfo?.data.data.email}</div>
                <div>{userInfo?.data.data.username}</div>
              </div>
            </div>
          </div>
          <div className="flex h-max w-full flex-col items-start justify-between gap-6 rounded-md border-2 border-white bg-white p-10 shadow-md">
            <div className="flex w-full flex-col items-center justify-center gap-2 text-xl font-bold">
              <h1>User Referral Code</h1>
              <h1>{userInfo?.data.data.referralCode}</h1>
            </div>
            <div className="flex w-full">
              <div className="flex w-full flex-col gap-2 ">
                <div className="font-bold">Total Point :</div>
                <div className="font-bold">Point Expire :</div>
              </div>
              <div className="flex w-full flex-col gap-2 ">
                <div>
                  {userInfo?.data.data.point.toLocaleString('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                  })}
                </div>
                <div>{userInfo?.data.data.pointExpire.split('T', 1)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
