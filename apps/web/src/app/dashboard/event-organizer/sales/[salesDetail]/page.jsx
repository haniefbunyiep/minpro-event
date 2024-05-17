'use client';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect, useState } from 'react';
import { useKeepLogin } from '../../../../../hooks/useKeepLogin';
import { getEventSales } from './../../../../../hooks/getEventSales';
import EOSidebar from './../../../../../components/EODashboard/EOSidebar';
import EOTopbar from './../../../../../components/EODashboard/EOTopbar';
import Loading from './../../../../../components/cores/Loading';

export default function SalesDetail(params) {
  const { userData } = useContext(UserContext);
  const { mutationKeepLogin } = useKeepLogin();
  let [monthFilter, setMonthFilter] = useState('');
  let [yearFilter, setYearFilter] = useState('');

  //   console.log(monthFilter);
  //   console.log(yearFilter);

  const month = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const year = ['2021', '2022', '2023', '2024'];

  const { getEventSalesInfo, isLoading, error, isError } = getEventSales(
    params.params.salesDetail,
    monthFilter,
    yearFilter,
  );

  //   console.log(getEventSalesInfo);
  const eventInfo = getEventSalesInfo?.data?.data?.eventInfo;
  const eventTransaction = getEventSalesInfo?.data?.data?.eventTransaction;

  //   console.log(eventInfo);
  // console.log(eventTransaction);
  //   console.log(getEventSalesInfo);

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
        <div className="absolute bottom-0 h-[90%] w-full p-10">
          <p className="text-xl font-bold">Welcome back, {userData?.name}!</p>
          <div className="flex h-full flex-col items-center justify-start  rounded-md  p-6">
            <div className="relative flex w-full items-center justify-center pb-3 text-xl">
              Transaction {eventInfo?.name}
            </div>
            <div className="flex w-full items-center justify-start gap-4">
              <div
                onClick={() => {
                  setMonthFilter((monthFilter = ''));
                  setYearFilter((yearFilter = ''));
                }}
                className="btn bg-azureBlue hover:bg-dodgerBlue m-1 w-[100px] text-white"
              >
                Clear
              </div>
              <details className="dropdown items-center justify-start">
                <summary className="btn bg-azureBlue hover:bg-dodgerBlue m-1 w-[100px] text-white">
                  Month
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  {month.map((x, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => setMonthFilter((monthFilter = i + 1))}
                      >
                        <a>{x}</a>
                      </li>
                    );
                  })}
                </ul>
              </details>
              <details className="dropdown items-center justify-start">
                <summary className="btn bg-azureBlue hover:bg-dodgerBlue m-1 w-[100px] text-white">
                  Year
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  {year.map((x, i) => {
                    return (
                      <li
                        key={i}
                        onClick={() => {
                          setYearFilter((yearFilter = x));
                        }}
                      >
                        <a>{x}</a>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </div>
            <div className="divider w-full"></div>
            <div className="flex w-full flex-col gap-6">
              {eventTransaction.length == 0 ? (
                <div className="flex w-full items-center justify-center">
                  There is no transaction
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Transaction ID</th>
                        <th>Attendees</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Point Use</th>
                        <th>Total Payment</th>
                        <th>Buy Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {eventTransaction?.map((x, i) => {
                        return (
                          <tr className="hover" key={i}>
                            <th>{i + 1}</th>
                            <td>{x.id}</td>
                            <td>{x.user.name}</td>
                            <td>{x.quantity}</td>
                            <td>
                              {x.subTotal.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </td>
                            <td>
                              {x.pointUse.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </td>
                            <td>
                              {x.totalPayment.toLocaleString('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                              })}
                            </td>
                            <td>{x.buyDate.split('T', 1)}</td>
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
  );
}
