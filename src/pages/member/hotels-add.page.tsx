import { Field, Formik, Form, ErrorMessage } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { dbHotels, storage } from "../../configs/firebase.config";
import { addDoc } from "firebase/firestore";
import { IAddHotel } from "../../interfaces/add-user.interface";
type Props = {};

const HotelsAddPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const initialValues = {
    name: "",
    address: "",
    phone: "",
    latitude: 0,
    longitude: 0,
    car_park: false,
    cctv: false,
    elevator: false,
    laundry_service: false,
    motorcycle_park: false,
  };

  const onSubmit = (value: typeof initialValues) => {
    console.log(value);
    uploadFiles(value);
  };

  const uploadFiles = async (value: typeof initialValues) => {
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
    const urls: string[] = [];
    files.forEach((e, i) => {
      const imageRef = ref(storage, `hotels/${Math.random() * 1000}${e.name}`);
      uploadBytes(imageRef, e)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            urls.push(url);
            console.log(i);
            if (files.length === i + 1) {
              addHotel(urls, value);
              setIsLoading(false);
            }
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    });
  };

  const addHotel = async (urls: string[], value: typeof initialValues) => {
    console.log(urls);
    const hotel: IAddHotel = {
      name: value.name,
      address: value.address,
      phone: value.phone,
      latitude: value.latitude,
      longitude: value.longitude,
      car_park: value.car_park,
      cctv: value.cctv,
      elevator: value.elevator,
      laundry_service: value.laundry_service,
      motorcycle_park: value.motorcycle_park,
      imageUrls: urls,
      created_at: new Date(),
      updated_at: new Date(),
    };

    addDoc(dbHotels, hotel)
      .then((res) => {
        alert("เพิ่มข้อมูลสำเร็จ");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="w-full bg-white rounded-md p-5">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <Field
                type="text"
                id="first_name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Name"
                required
              />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <Field
                type="text"
                name="address"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Address"
                required
              />
              <ErrorMessage name="address" />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone
              </label>
              <Field
                type="text"
                id="company"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="phone"
                required
              />
              <ErrorMessage name="phone" />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Latitude
              </label>
              <Field
                type="number"
                id="phone"
                name="latitude"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="latitude"
                required
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Longitude
              </label>
              <Field
                type="number"
                name="longitude"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="longitude"
              />
            </div>
          </div>

          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="car_parkv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              car_park
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="cctv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              cctv
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="elevator"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              elevator
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="laundry_service"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              laundry_service
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="motorcycle_park"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              motorcycle_park
            </label>
          </div>

          <div className="p-5 grid grid-cols-3 gap-4 place-content-center">
            {files === null ? (
              <></>
            ) : (
              files.map((e, i) => {
                return (
                  <>
                    <img
                      key={i}
                      className="h-auto rounded-lg"
                      src={URL.createObjectURL(e)}
                      alt="image description"
                    />
                  </>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-center w-full  ">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="file"
                multiple
                onChange={(e) => {
                  if (e.target.files === null) return;
                  const files = [...e.target.files];
                  setFiles(files);
                }}
                required
              />
            </label>
          </div>
          {isLoading ? (
            <div className="my-5 px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              loading...
            </div>
          ) : (
            <button
              type="submit"
              className="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default HotelsAddPage;
