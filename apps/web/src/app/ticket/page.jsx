'use client';

import { Formik, Form, Field } from 'formik';
import { useCreateTicketEventMutate } from '../../hooks/useCreateTicketEvent';

export default function Ticket() {
  const { mutateCreateTicketEvent } = useCreateTicketEventMutate();
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
          console.log(values);
          mutateCreateTicketEvent({
            name: values.name,
            price: parseInt(values.price),
            quantity: parseInt(values.quantity),
            eventId: parseInt(values.eventId),
          });
        }}
      >
        <Form>
          <div className="flex flex-col items-center gap-3 px-5 py-10">
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
                  <span className="label-text">For Event</span>
                </div>
                <Field
                  type="text"
                  name="eventId"
                  placeholder="Type Date Event"
                  className="input input-bordered w-[50vh]"
                />
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
