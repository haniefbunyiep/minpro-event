'use client';

import { Formik, Form, Field } from 'formik';
import { useCreateVoucherEventMutate } from '../../hooks/useCreateVoucherEventMutate';
import { useGetEvent } from '../../hooks/useGetEvent';

export default function Voucher() {
  const { mutateCreateVoucherEvent } = useCreateVoucherEventMutate();
  const { data } = useGetEvent();
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          code: '',
          stok: '',
          eventId: '',
          ticketId: '',
        }}
        onSubmit={(values) => {
          mutateCreateVoucherEvent({
            name: values.name,
            code: values.code,
            stok: parseInt(values.stok),
            eventId: parseInt(values.eventId),
            ticketId: parseInt(values.ticketId),
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
                  name="price"
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
                  <option disabled>Choose Location</option>
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
                  <span className="label-text">Select Event</span>
                </div>
                <Field
                  component="select"
                  id="eventId"
                  name="eventId"
                  className="select select-bordered w-[50vh]"
                >
                  <option disabled>Choose Location</option>
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
            <button className="btn w-[50vh] bg-indigo-500 text-white">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
