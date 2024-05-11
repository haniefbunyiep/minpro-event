'use client';

import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCreateEventMutate } from '../../../hooks/useCreateEventMutate';
import { useGetCategory } from '../../../hooks/useGetCategory';
import { ModalCreateLocation } from '../../../components/modalCreateLocation';

export default function EventRegisterPage() {
  const [upload, setUpload] = useState([]);
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
          <div className="flex flex-col items-center gap-3 px-5 py-5">
            <h1 className="font-serif text-2xl font-bold">REGISTER EVENT</h1>
            <div className="w-[100vh]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Type Event Name"
                  className="input input-bordered w-[100vh]"
                />
              </label>
            </div>
            <div className="flex flex-row gap-2">
              <div className="w-[50vh]">
                <label className="form-control w-[50vh]">
                  <div className="label">
                    <span className="label-text">Start Date Event</span>
                  </div>
                  <Field
                    type="date"
                    name="startDate"
                    placeholder="Type Date Event"
                    className="input input-bordered w-[50vh]"
                  />
                </label>
              </div>
              <div className="w-[50vh]">
                <label className="form-control w-[50vh]">
                  <div className="label">
                    <span className="label-text">End Date Event</span>
                  </div>
                  <Field
                    type="date"
                    name="endDate"
                    placeholder="Type Date Event"
                    className="input input-bordered w-[50vh]"
                  />
                </label>
              </div>
            </div>
            <div className="w-[100vh]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Start Time Event</span>
                </div>
                <Field
                  type="time"
                  name="time"
                  placeholder="Type Date Event"
                  className="input input-bordered w-[100vh]"
                />
              </label>
            </div>

            <div className="w-[100vh]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Location Event</span>
                </div>
                <Field
                  component="select"
                  id="locationId"
                  name="locationId"
                  className="select select-bordered w-[100vh]"
                >
                  <option>Choose Location</option>
                  {dataLocation?.map((location, index) => {
                    return (
                      <option value={location.id} key={index}>
                        {location.address} - {location.city}, {location.zip}
                      </option>
                    );
                  })}
                </Field>
              </label>
            </div>
            <div className="w-[100vh] pt-[75px]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Category Event</span>
                </div>
                <Field
                  component="select"
                  id="categoryId"
                  name="categoryId"
                  className="select select-bordered w-[100vh]"
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
            <div className="w-[100vh]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Description Event</span>
                </div>
                <Field
                  as="textarea"
                  type="text"
                  name="description"
                  placeholder="Type Description Event"
                  className="input input-bordered h-[20vh] w-[100vh]"
                />
              </label>
            </div>
            <div className="w-[100vh]">
              <label className="form-control w-[100vh]">
                <div className="label">
                  <span className="label-text">Select Images Event</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onSetFile(event)}
                  multiple
                  placeholder="Upload Image Event"
                  className="input input-bordered w-[100vh] rounded-md px-2 py-2"
                />
              </label>
            </div>
            <button className="btn bg-congressBlue w-[100vh] text-white">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
      <div className="absolute bottom-[101px] flex flex-col items-center justify-center pl-[590px]">
        <h1 className="py-1 text-center text-sm font-bold">
          Have Another Location?
        </h1>
        <ModalCreateLocation />
      </div>
    </div>
  );
}
