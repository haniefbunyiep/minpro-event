'use client';
import { Formik, Form, Field } from 'formik';
import { useReferralCode } from './../../hooks/useReferralCode';

export default function TestUseVoucher() {
  const { mutationReferralCode } = useReferralCode();
  return (
    <Formik
      initialValues={{
        useReferral: '',
      }}
      onSubmit={(values) => {
        console.log(values);
        mutationReferralCode({
          useReferral: values.useReferral,
        });
      }}
    >
      <Form>
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 px-[500px]">
          <h1 className="text-[50px]">Heptatix</h1>
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            <Field
              name="useReferral"
              type="text"
              className="grow"
              placeholder="Input Voucher Code"
            />
          </label>
          <button
            type="submit"
            className="rounded-m btn bg-cerulean bg-azureBlue hover:bg-scienceBlue text-white"
          >
            LOG IN
          </button>
        </div>
      </Form>
    </Formik>
  );
}
