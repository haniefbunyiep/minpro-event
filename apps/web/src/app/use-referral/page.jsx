'use client';
import { Formik, Form, Field } from 'formik';
import { useRegister } from './../../hooks/useRegister';

export default function TestUseVoucher() {
  const { mutationRegister } = useRegister();
  return (
    <Formik
      initialValues={{
        useVoucher: '',
      }}
      onSubmit={(values) => {
        // console.log(new Date(Date.now()).toISOString());
        mutationRegister({
          useVoucher: values.useReferral,
        });
      }}
    >
      <Form>
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 px-[500px]">
          <h1 className="text-[50px]">Heptatix</h1>
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            <Field
              name="useVoucher"
              type="text"
              className="grow"
              placeholder="Input Voucher Code"
            />
            <span className="badge badge-info">Optional</span>
          </label>
          <button
            type="submit"
            className="rounded-m btn bg-cerulean text-white"
          >
            LOG IN
          </button>
        </div>
      </Form>
    </Formik>
  );
}
