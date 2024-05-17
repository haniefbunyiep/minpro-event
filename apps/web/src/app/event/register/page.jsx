'use client';
import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCreateEventMutate } from '../../../hooks/useCreateEventMutate';
import { useGetCategory } from '../../../hooks/useGetCategory';
import EOSidebar from '@/components/EODashboard/EOSidebar';
import EOTopbar from '@/components/EODashboard/EOTopbar';
import { UserContext } from '@/supports/context/userContext';
import { useContext, useEffect } from 'react';

export default function EventRegisterPage() {
  const [upload, setUpload] = useState([]);
  const { userData } = useContext(UserContext);
  const { dataCategory, dataLocation } = useGetCategory();

  const { mutateCreateEvent } = useCreateEventMutate();

  const onSetFile = (event) => {
    try {
      const acceptedFormat = ['jpg', 'jpeg', 'webp', 'png'];
      const files = [...event.target.files];
      files.forEach((file) => {
        if (
          !acceptedFormat.includes(
            file.name.split('.')[file.name.split('.').length - 1],
          )
        ) {
          throw { message: `${file.name} Format Not Acceptable` };
        }
        if (file.size > 100000000) {
          throw { message: `${file.name} is too Large!` };
        }
      });
      if (files.length > 3) throw { message: `Selected File More Than 3` };
      setUpload(files);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mobile:bottom-10 absolute left-0 right-0 flex flex-col items-center justify-center sm:bottom-[110px] xl:bottom-0">
        <h1 className="py-1 text-center text-sm font-bold">
          Have Another Location?
        </h1>
        <ModalCreateLocation />
      </div>
      <Formik
        initialValues={{
          name: '',
          startDate: '',
          endDate: '',
          time: '',
          locationId: '',
          description: '',
          categoryId: '',
        }}
        onSubmit={(values) => {
          const fd = new FormData();
          fd.append(
            'data',
            JSON.stringify({
              name: values.name,
              startDate: values.startDate,
              endDate: values.endDate,
              time: values.time,
              locationId: parseInt(values.locationId),
              description: values.description,
              categoryId: parseInt(values.categoryId),
            }),
          );
          upload.forEach((file) => {
            fd.append('images', file);
          });
          mutateCreateEvent(fd);
        }}
      >
        <Form>
          <div className="flex h-screen ">
            <EOSidebar></EOSidebar>
            {/* Content */}
            <div className="relative flex w-full flex-col items-center justify-center ">
              <EOTopbar></EOTopbar>
              <div className="absolute bottom-0 flex h-[90%] w-full flex-col gap-10 p-10">
                <p className="text-xl font-bold">
                  Welcome back, {userData?.name}!
                </p>
                <div className="flex h-full flex-col items-center justify-start  rounded-md  p-6 shadow-2xl">
                  <div className="text-xl">Event List</div>
                  <div className="divider w-full"></div>
                  <div className="flex w-full flex-col gap-6">
                    <div className=" flex flex-col items-center gap-3 px-5 py-5">
                      <h1 className="font-serif text-2xl font-bold">
                        REGISTER EVENT
                      </h1>
                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">Name</span>
                          </div>
                          <Field
                            type="text"
                            name="name"
                            placeholder="Type Event Name"
                            className="input input-bordered mobile:w-[40vh] w-[70vh] lg:w-[100vh]"
                          />
                        </label>
                      </div>
                      <div className="mobile:flex-col flex flex-row gap-2">
                        <div className="mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]">
                          <label className="form-control mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]">
                            <div className="label">
                              <span className="label-text">
                                Start Date Event
                              </span>
                            </div>
                            <Field
                              type="date"
                              name="startDate"
                              placeholder="Type Date Event"
                              className="input input-bordered mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]"
                            />
                          </label>
                        </div>
                        <div className="mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]">
                          <label className="form-control mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]">
                            <div className="label">
                              <span className="label-text">End Date Event</span>
                            </div>
                            <Field
                              type="date"
                              name="endDate"
                              placeholder="Type Date Event"
                              className="input input-bordered mobile:w-[40vh] sm:w-[35vh] lg:w-[50vh]"
                            />
                          </label>
                        </div>
                      </div>
                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">Start Time Event</span>
                          </div>
                          <Field
                            type="time"
                            name="time"
                            placeholder="Type Date Event"
                            className="input input-bordered mobile:w-[40vh] w-[70vh] lg:w-[100vh]"
                          />
                        </label>
                      </div>
                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">Location Event</span>
                          </div>
                          <Field
                            component="select"
                            id="locationId"
                            name="locationId"
                            className="select select-bordered mobile:w-[40vh] w-[70vh] lg:w-[100vh]"
                          >
                            <option>Choose Location</option>
                            {dataLocation?.map((location, index) => {
                              return (
                                <option value={location.id} key={index}>
                                  {location.address} - {location.city},{' '}
                                  {location.zip}
                                </option>
                              );
                            })}
                          </Field>
                        </label>
                      </div>
                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">Category Event</span>
                          </div>
                          <Field
                            component="select"
                            id="categoryId"
                            name="categoryId"
                            className="select select-bordered mobile:w-[40vh] w-[70vh] lg:w-[100vh]"
                          >
                            <option>Choose Category</option>
                            {dataCategory?.map((category, index) => {
                              return (
                                <option value={category.id} key={index}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </Field>
                        </label>
                      </div>
                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">
                              Description Event
                            </span>
                          </div>
                          <Field
                            as="textarea"
                            type="text"
                            name="description"
                            placeholder="Type Description Event"
                            className="input input-bordered mobile:w-[40vh] h-[20vh] w-[70vh] lg:w-[100vh]"
                          />
                        </label>
                      </div>

                      <div className="mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                        <label className="form-control mobile:w-[40vh] w-[70vh] lg:w-[100vh]">
                          <div className="label">
                            <span className="label-text">
                              Select Images Event
                            </span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => onSetFile(event)}
                            multiple
                            placeholder="Upload Image Event"
                            className="input input-bordered mobile:w-[40vh] w-[70vh] rounded-md px-2 py-2 lg:w-[100vh]"
                          />
                        </label>
                      </div>
                      <button className="btn bg-congressBlue mobile:w-[40vh] w-[70vh] text-white lg:w-[100vh]">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
