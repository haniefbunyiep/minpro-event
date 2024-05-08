'use client';

import { Formik, Form, Field } from 'formik';
import { useCreateVoucherEventMutate } from '../../hooks/useCreateVoucherEventMutate';
import { useGetEvent } from '../../hooks/useGetEvent';
import { useGetCategory } from '../../hooks/useGetCategory';
import { useState } from 'react';

export default function Voucher() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { mutateCreateVoucherEvent } = useCreateVoucherEventMutate();
  const { data } = useGetEvent();
  const { dataTicket } = useGetCategory();

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          code: '',
          stok: '',
          eventId: '',
          ticketId: '',
          discountVoucher: '',
        }}
        onSubmit={(values) => {
          mutateCreateVoucherEvent({
            name: values.name,
            code: values.code,
            stok: parseInt(values.stok),
            eventId: parseInt(values.eventId),
            ticketId: parseInt(values.ticketId),
            discountVoucher: parseInt(values.discountVoucher),
          });
        }}
      >
        <Form>
          <div className="flex flex-col items-center gap-3 px-5 py-10">
            <h1 className="font-serif text-2xl font-bold">VOUCHER EVENT</h1>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Name Voucher</span>
                </div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Type Name Voucher Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Code Voucher</span>
                </div>
                <Field
                  type="text"
                  name="code"
                  placeholder="Type Code Voucher"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Discount Voucher</span>
                </div>
                <Field
                  type="text"
                  name="code"
                  placeholder="Type Code Voucher"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Stock</span>
                </div>
                <Field
                  type="text"
                  name="stok"
                  placeholder="Type Stock Voucher"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Select Event</span>
                </div>
                <Field
                  component="select"
                  id="eventId"
                  name="eventId"
                  className="select select-bordered w-[50vh]"
                >
                  <option disabled>Choose Event</option>
                  {data?.data?.data.map((event, index) => {
                    return (
                      <option value={event.id} key={index}>
                        {event.name}
                      </option>
                    );
                  })}
                </Field>
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Select Ticket</span>
                </div>
                <Field
                  component="select"
                  id="ticketId"
                  name="ticketId"
                  className="select select-bordered w-[50vh]"
                >
                  <option disabled>Choose Ticket</option>
                  {dataTicket?.map((ticket, index) => {
                    return (
                      <option value={ticket.id} key={index}>
                        {ticket.name}
                      </option>
                    );
                  })}
                </Field>
              </label>
            </div>
            <button className="btn w-[50vh] bg-indigo-500 text-white">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
