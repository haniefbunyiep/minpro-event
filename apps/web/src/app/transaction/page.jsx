'use client';
import { Formik, Form, Field } from 'formik';
import { getTransactionInfo } from './../../hooks/getTransactionInfo';
import Loading from './../../components/cores/Loading';
import { MdCalendarMonth, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { FaMapLocation } from 'react-icons/fa6';
import PageError from '../../components/cores/PageError';
import { useGetPointAndVoucher } from './../../hooks/useGetPointAndVoucher';
import { useCheckout } from './../../hooks/useCheckout';
import { useState } from 'react';

export default function TransactionPage(params) {
  const { getTransaction, isLoading, error } = getTransactionInfo(
    params.searchParams.event,
    params.searchParams.ticket,
    params.searchParams.qty,
  );

  const [usePoint, setUsePoint] = useState(0);
  const [voucher, setVoucher] = useState(1);
  const [paymentTotal, setPaymentTotal] = useState(0);

  const { mutationPointAndVoucher, data, errPointAndVoucher, isPending } =
    useGetPointAndVoucher();

  const { mutationCheckout, errCheckout } = useCheckout();

  const eventInfo = getTransaction?.data?.data?.eventInfo;
  const ticketInfo = getTransaction?.data?.data?.ticketInfo;
  const userInfo = getTransaction?.data?.data?.userInfo;
  const pointAndDiscountInfo = data?.data?.data;
  const subTotal = params.searchParams.qty * ticketInfo?.price;

  const usePointToNumber = Number(usePoint);

  let getTime = eventInfo?.time;
  const getTimeSplit = getTime?.split('T');
  const time = getTimeSplit?.slice(1).toString().split('.', 1).toString();

  const handleCheckout = () => {
    mutationCheckout({
      eventId: eventInfo?.id,
      ticketType: ticketInfo.id,
      qty: params.searchParams.qty,
      subTotal: subTotal,
      pointUse: usePoint,
      voucher: voucher,
    });
  };

  if (isLoading) return <Loading></Loading>;

  if (error) {
    return (
      <PageError message={`${error?.response?.data?.message}`}></PageError>
    );
  }
  let totalPayment = 0;

  if (errPointAndVoucher)
    return (
      <PageError
        message={`${errPointAndVoucher?.response?.data?.message}`}
      ></PageError>
    );

  console.log(voucher);

  return (
    <Formik
      initialValues={{
        point: '',
        voucher: '',
      }}
      onSubmit={(values) => {
        // console.log(values);
        setUsePoint(values.point);
        setVoucher(values.voucher);
        console.log(usePoint);

        if (!values.point && !values.voucher) {
          totalPayment = subTotal;
        } else if (!values.voucher) {
          totalPayment = subTotal - values.point;
        } else if (!values.point) {
          totalPayment = subTotal * (1 - 10 / 100);
        } else if (values.point && values.voucher) {
          totalPayment = subTotal * (1 - 10 / 100) - values.point;
        }

        setPaymentTotal(totalPayment);

        mutationPointAndVoucher({
          point: values.point,
          voucher: values.voucher,
        });
      }}
    >
      <Form>
        <div className="flex min-h-screen items-center justify-center p-[100px]">
          <div className="flex h-max w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl">
            <div className="flex flex-col gap-[25px]">
              <div className="text-[25px] font-bold">{eventInfo?.name}</div>
              <div className="card-body ">
                <h1 className="pb-5 text-xl font-bold">Detail Event</h1>
                <div className="flex gap-2 py-3">
                  <MdCalendarMonth size={20} />
                  <div className="flex flex-col">
                    <h1 className="text-sm text-gray-400">Tanggal</h1>
                    <h1 className="text-sm font-bold">
                      {eventInfo?.startDate.split('T', 1)}
                    </h1>
                  </div>
                </div>
                <div className="flex gap-2 py-3">
                  <MdOutlineAccessTimeFilled size={20} />
                  <div className="flex flex-col">
                    <h1 className="text-sm text-gray-400">Waktu</h1>
                    <h1 className="text-sm font-bold">{time}</h1>
                  </div>
                </div>
                <div className="flex gap-2 py-3">
                  <FaMapLocation size={20} />
                  <div className="flex flex-col">
                    <h1 className="text-sm text-gray-400">Lokasi</h1>
                    <h1 className="text-sm font-bold text-blue-500">
                      {eventInfo?.location?.address},{' '}
                      {eventInfo?.location?.city}, {eventInfo?.location?.zip}
                    </h1>
                  </div>
                </div>
                <div className="divider w-full"></div>
                <h1 className="pb-5 text-xl font-bold">Detail Ticket</h1>
                <div className="text-md flex justify-between">
                  <div className="font-bold">Ticket Name</div>
                  <div>{ticketInfo?.name}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-md font-bold">Total Ticket</div>
                  <div>x{params.searchParams.qty}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-md font-bold">Ticket Price</div>
                  <div>
                    {ticketInfo?.price.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-md font-bold">Subtotal</div>
                  <div>
                    {subTotal.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div className="divider w-full"></div>
                {/* Point */}
                <h1 className="text-xl font-bold">User Point</h1>
                <div className="flex justify-between">
                  <div className="text-md font-bold">Point</div>
                  <div>
                    {userInfo?.point?.point.toLocaleString('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    })}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-md font-bold">Point Expire In</div>
                  <div>{userInfo?.point?.expireAt.split('T', 1)}</div>
                </div>
                <div className="flex w-full flex-col justify-between gap-2">
                  <div className="text-md ic flex w-full justify-center font-bold">
                    Input Point
                  </div>
                  <label className="input input-bordered flex w-full items-center">
                    <Field
                      name="point"
                      type="text"
                      className="grow"
                      placeholder="Input Your Point Credit"
                    />
                  </label>
                </div>
                <div className="divider w-full"></div>
                {/* Voucher */}
                <h1 className="pb-5 text-xl font-bold">Voucher</h1>
                <label className="input input-bordered flex w-full items-center">
                  <Field
                    name="voucher"
                    type="text"
                    className="grow"
                    placeholder="Input Your Voucher Code"
                  />
                </label>
                {/* Button */}
                <button
                  type="submit"
                  className="btn bg-azureBlue hover:bg-dodgerBlue mt-6 text-white"
                  onClick={() => {
                    {
                      document.getElementById('my_modal_1').showModal();
                    }
                  }}
                >
                  Process
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box ">
                    <h3 className="flex justify-center text-lg font-bold">
                      Transaction Detail
                    </h3>
                    <div className="flex justify-between">
                      <div className="font-bold">Ticket Name</div>
                      <div>{ticketInfo?.name}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold">Ticket Price</div>
                      <div>
                        {ticketInfo?.price.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold">Quantity</div>
                      <div>x{params.searchParams.qty}</div>
                    </div>
                    <div className="flex justify-between">
                      <div className="font-bold">Total Price</div>
                      <div>
                        {subTotal.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </div>
                    </div>
                    {pointAndDiscountInfo?.discount > 1 ? (
                      <div className="flex justify-between">
                        <div className="font-bold">Voucher Use</div>
                        <div>{pointAndDiscountInfo?.discount}%</div>
                      </div>
                    ) : null}
                    {pointAndDiscountInfo?.point ? (
                      <div className="flex justify-between">
                        <div className="font-bold">Point Use</div>
                        <div>
                          {usePointToNumber?.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </div>
                      </div>
                    ) : null}
                    <div className="divider w-full"></div>
                    <div className="flex justify-between">
                      <div className="font-bold">Total Payment</div>
                      <div>
                        {/* {subTotal * discount -
                          usePoint.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })} */}
                        {/* {totalPayment.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })} */}
                        {paymentTotal.toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                      </div>
                    </div>
                    <p className="py-4 text-sm text-red-500">
                      *Press ESC key to close or cancel
                    </p>
                    <div
                      onClick={handleCheckout}
                      className="btn bg-azureBlue  hover:bg-dodgerBlue flex justify-center text-white"
                    >
                      Checkout
                    </div>
                  </div>
                </dialog>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
