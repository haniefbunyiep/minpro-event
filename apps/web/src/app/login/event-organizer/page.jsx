'use client';
import { Formik, Form, Field } from 'formik';
import { useEOLogin } from '../../../hooks/useEOLogin';
import { MdEmail, MdLock } from 'react-icons/md';

export default function Login() {
  const { mutationEOLogin } = useEOLogin();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        mutationEOLogin({
          email: values.email,
          password: values.password,
        });
      }}
    >
      <Form>
        {/*  <div className="flex h-screen w-screen flex-col items-center justify-center gap-5 px-[500px]">
          <h1 className="text-[50px]">Heptatix</h1>
          <h1 className="text-[50px]">EO Login</h1>
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
              type="text"
              className="grow"
              placeholder="Email"
              name="email"
            />
          </label>
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
        </div> */}
        <div className="flex h-fit items-center justify-center p-[100px]">
          <div className="flex h-[600px] w-[500px] flex-col items-start justify-between rounded-md border-2 border-white p-10 shadow-xl">
            <div className="flex flex-col gap-[25px] ">
              <div className="text-[25px] font-bold">Login to create event</div>
              <div className="text-[15px]">
                Dont have an account?{' '}
                <a
                  href="/register/user"
                  className="text-azureBlue underline underline-offset-2"
                >
                  Sign up now
                </a>
              </div>
            </div>
            <div className="flex w-full flex-col gap-10">
              <div className="flex flex-col gap-2">
                <div className="flex items-center font-bold">
                  Email*
                  <MdEmail />
                </div>
                <div>
                  <label className="input input-bordered flex w-full items-center gap-2">
                    <Field
                      type="text"
                      className="grow"
                      placeholder="Email"
                      name="email"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center font-bold">
                  Password*
                  <MdLock />
                </div>
                <div>
                  <label className="input input-bordered flex w-full items-center gap-2">
                    <Field
                      type="password"
                      className="grow"
                      placeholder="Password"
                      name="password"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <button
                type="submit"
                className="rounded-m btn bg-cerulean bg-azureBlue hover:bg-scienceBlue flex w-full justify-center text-white"
              >
                LOG IN
              </button>
              <div className="divider"></div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}
