'use client';
import { Formik, Form, Field } from 'formik';
import { useCreatePromotionMutate } from '@/hooks/useCreatePromotionMutate';
import { useGetEvent } from '@/hooks/useGetEvent';

export default function PromotionsPage() {
  const { mutateCreatePromotions } = useCreatePromotionMutate();
  const { data } = useGetEvent();
  return (
    <div>
      <Formik
        initialValues={{
          codeVoucher: '',
          discountVoucher: '',
          stok: '',
          eventId: '',
        }}
        onSubmit={(values) => {
          mutateCreatePromotions({
            codeVoucher: values.codeVoucher,
            discountVoucher: parseInt(values.discountVoucher),
            stok: parseInt(values.stok),
            eventId: parseInt(values.eventId),
          });
        }}
      >
        <Form>
          <div className="flex flex-col items-center gap-3 px-5 py-10">
            <h1 className="font-serif text-2xl font-bold">PROMOTIONS EVENT</h1>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Code Voucher</span>
                </div>
                <Field
                  type="text"
                  name="codeVoucher"
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
                  name="discountVoucher"
                  placeholder="Type Discount Voucher"
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
                  name="stok"
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
                  <option>Choose Event</option>
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
