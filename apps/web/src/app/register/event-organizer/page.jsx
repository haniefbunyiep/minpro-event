'use client';
import { Formik, Form, Field } from 'formik';
import { useEORegister } from '@/hooks/useEORegister';

export default function Register() {
  const { mutationEORegister } = useEORegister();
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log(values);
        mutationEORegister({
          name: values.name,
          email: values.email,
          password: values.password,
        });
      }}
    >
      <Form>
        <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 px-[500px]">
          <h1 className="text-[50px]">Heptatix</h1>
          {/* Name */}
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            Name
            <Field
              name="name"
              type="text"
              className="grow"
              placeholder="Search"
            />
          </label>
          {/* Email */}
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <Field
              name="email"
              type="text"
              className="grow"
              placeholder="Email"
            />
          </label>
          {/* Password */}
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <Field
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
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
