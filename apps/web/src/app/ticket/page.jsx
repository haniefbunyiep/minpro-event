'use client';

import { Formik, Form, Field } from 'formik';
import { useCreateTicketEventMutate } from '../../hooks/useCreateTicketEvent';
import { useGetEvent } from '../../hooks/useGetEvent';

export default function Ticket() {
  const { mutateCreateTicketEvent } = useCreateTicketEventMutate();
  const { data } = useGetEvent();
  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          price: '',
          quantity: '',
          eventId: '',
        }}
        onSubmit={(values) => {
          mutateCreateTicketEvent({
            name: values.name,
            price: parseInt(values.price),
            quantity: parseInt(values.quantity),
            eventId: parseInt(values.eventId),
          });
        }}
      >
        <Form>
          <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-5 py-10">
            <h1 className="font-serif text-2xl font-bold">TICKET EVENT</h1>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Name Ticket</span>
                </div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Type Ticket Name"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Price Ticket</span>
                </div>
                <Field
                  type="text"
                  name="price"
                  placeholder="Type Price Ticket"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Quantity</span>
                </div>
                <Field
                  type="text"
                  name="quantity"
                  placeholder="Type Quantity Ticket"
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
            <button className="btn w-[50vh] bg-indigo-500 text-white">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
