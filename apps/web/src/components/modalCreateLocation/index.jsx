'use client';

import { Formik, Form, Field } from 'formik';
import { useCreateLocationEventMutate } from '../../hooks/useCreateLocationMutate';

export const ModalCreateLocation = () => {
  const { mutateCreateLocationEvent } = useCreateLocationEventMutate();

  return (
    <div className="">
      <button
        className="btn bg-congressBlue w-[50vh] text-white"
        onClick={() => document.getElementById('my_modal_1').showModal()}
      >
        Create Location
      </button>
      <Formik
        initialValues={{
          address: '',
          city: '',
          zip: '',
        }}
        onSubmit={(values) => {
          mutateCreateLocationEvent({
            address: values.address,
            city: values.city,
            zip: values.zip,
          });
        }}
      >
        <Form>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box flex flex-col items-center justify-center">
              <div className="w-[65vh]">
                <label className="form-control w-[65vh]">
                  <div className="label">
                    <span className="label-text">Address</span>
                  </div>
                  <Field
                    type="text"
                    name="address"
                    placeholder="Type Address Event Location"
                    className="input input-bordered w-[65vh]"
                  />
                </label>
              </div>
              <div className="w-[65vh]">
                <label className="form-control w-[65vh]">
                  <div className="label">
                    <span className="label-text">City</span>
                  </div>
                  <Field
                    type="text"
                    name="city"
                    placeholder="Type City Event Location"
                    className="input input-bordered w-[65vh]"
                  />
                </label>
              </div>
              <div className="w-[65vh]">
                <label className="form-control w-[65vh]">
                  <div className="label">
                    <span className="label-text">Zip / Portal Code</span>
                  </div>
                  <Field
                    type="text"
                    name="zip"
                    placeholder="Type Zip / Portal Code Event Location"
                    className="input input-bordered w-[65vh]"
                  />
                </label>
              </div>
              <div className="pt-5">
                <button className="btn bg-congressBlue w-[65vh] text-white">
                  Submit
                </button>
              </div>
              <div className="pt-3">
                <form method="dialog">
                  <button className="btn bg-congressBlue w-[20vh] text-white">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </Form>
      </Formik>
    </div>
  );
};
