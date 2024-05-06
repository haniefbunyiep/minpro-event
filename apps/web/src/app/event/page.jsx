'use client';

import { Formik, Form, Field } from 'formik';
import { useState } from 'react';
import { useCreateEventMutate } from '../../hook/useCreateEventMutate';

export default function EventPage() {
  const [upload, setUpload] = useState([]);

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
          date: '',
          time: '',
          location: '',
          description: '',
          categoryId: '',
        }}
        onSubmit={(values) => {
          const fd = new FormData();
          fd.append(
            'data',
            JSON.stringify({
              name: values.name,
              date: values.date,
              time: values.time,
              location: values.location,
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
          <div className="flex flex-col items-center gap-3 px-5 py-10">
            <h1>REGISTER EVENT</h1>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Name</span>
                </div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Type Event Name"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Date Event</span>
                </div>
                <Field
                  type="date"
                  name="date"
                  placeholder="Type Date Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Time Event</span>
                </div>
                <Field
                  type="time"
                  name="time"
                  placeholder="Type Date Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Location Event</span>
                </div>
                <Field
                  type="text"
                  name="location"
                  placeholder="Type Date Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Description Event</span>
                </div>
                <Field
                  type="text"
                  name="description"
                  placeholder="Type Description Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Category Event</span>
                </div>
                <Field
                  type="text"
                  name="categoryId"
                  placeholder="Type Category Event"
                  className="input input-bordered w-[50vh]"
                />
              </label>
            </div>
            <div className="w-[50vh]">
              <label className="form-control w-[50vh]">
                <div className="label">
                  <span className="label-text">Select Images Event</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => onSetFile(event)}
                  multiple
                  placeholder="Upload Image Event"
                  className="input input-bordered w-[50vh] rounded-md px-2 py-2"
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
