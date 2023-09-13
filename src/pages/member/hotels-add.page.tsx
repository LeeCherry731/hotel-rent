import { Field, Formik, Form, ErrorMessage } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { dbHotels, storage } from "../../configs/firebase.config";
import { addDoc } from "firebase/firestore";
import { IAddHotel } from "../../interfaces/add-user.interface";
import GoogleMapShowHotel from "../../components/map.com";
import MapAddHotel from "../../components/mapAddHotel";
type Props = {};

const HotelsAddPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const initialValues: IAddHotel = {
    name: "",
    address: "",
    phone: "",
    line: "",
    type: "",
    map_url: "",

    min_price: 0,
    max_price: 0,
    bail: 0,
    prepay: 0,
    electricity_bill: 0,
    water_bill: 0,

    promote: false,

    car_park: false,
    water_heater: false,
    pet: false,
    cigarette: false,
    security: false,
    cctv: false,
    elevator: false,
    laundry_service: false,
    motorcycle_park: false,
    air: false,
    fan: false,
    fridge: false,
    furniture: false,
    wifi: false,
    tv: false,

    imageUrls: [],
    created_at: new Date(),
    updated_at: new Date(),
  };

  const onSubmit = (value: IAddHotel) => {
    console.log(value);
    uploadFiles(value);
  };

  const uploadFiles = async (value: IAddHotel) => {
    setIsLoading(true);
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
    const urls: string[] = [];
    files.forEach((e, i) => {
      const imageRef = ref(storage, `hotels/${Math.random() * 1000}${e.name}`);
      uploadBytes(imageRef, e)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref).then(async (url) => {
            urls.push(url);
            console.log(i);
            if (files.length === i + 1) {
              await new Promise((resolve, reject) => {
                setTimeout(resolve, 1000);
              });
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
      line: value.line,
      type: value.type,
      map_url: value.map_url,

      promote: value.promote,

      min_price: value.min_price,
      max_price: value.max_price,
      bail: value.bail,
      prepay: value.prepay,
      electricity_bill: value.electricity_bill,
      water_bill: value.water_bill,

      water_heater: value.water_heater,
      pet: value.pet,
      cigarette: value.cigarette,
      security: value.cigarette,

      car_park: value.car_park,
      cctv: value.cctv,
      elevator: value.elevator,
      laundry_service: value.laundry_service,
      motorcycle_park: value.motorcycle_park,
      wifi: value.wifi,
      furniture: value.furniture,
      air: value.air,
      fan: value.fan,
      tv: value.tv,
      fridge: value.fridge,

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
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="phone"
                required
              />
              <ErrorMessage name="phone" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Line
              </label>
              <Field
                type="text"
                name="line"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="line"
                required
              />
              <ErrorMessage name="phone" />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="min_price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ราคาต่ำที่สุด
              </label>
              <Field
                type="number"
                id="min_price"
                name="min_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1000"
                required
              />
              <ErrorMessage name="min_price" />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ราคาสูงที่สุด
              </label>
              <Field
                type="number"
                id="max_price"
                name="max_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100000"
                required
              />
              <ErrorMessage name="max_price" />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                เงินประกัน
              </label>
              <Field
                type="number"
                name="bail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1000"
                required
              />
              <ErrorMessage name="bail" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                จ่ายล่วงหน้า
              </label>
              <Field
                type="number"
                name="prepay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100000"
                required
              />
              <ErrorMessage name="prepay" />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ค่าไฟ
              </label>
              <Field
                type="number"
                name="electricity_bill"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1000"
                required
              />
              <ErrorMessage name="electricity_bill" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                ค่าน้ำ
              </label>
              <Field
                type="number"
                name="water_bill"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100000"
                required
              />
              <ErrorMessage name="water_bill" />
            </div>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              แผนที่ (Map Url)
            </label>
            <Field
              type="url"
              name="map_url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="www.google.com"
              required
            />
            <ErrorMessage name="map_url" />
          </div>
          {/* <MapAddHotel /> */}
          <br />
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="car_park"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ที่จอดรถยนต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="motorcycle_park"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ที่จอดมอเตอร์ไซต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="cctv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              กล้องวงจรปิด (CCTV)
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="elevator"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ลิฟต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="laundry_service"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ร้านซัก-รีด / มีบริการเครื่องซักผ้า
            </label>
          </div>

          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="wifi"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อินเทอร์เน็ตไวไฟ
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="furniture"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เฟอร์นิเจอร์-ตู้, เตียง
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="air"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เครื่องปรับอากาศ
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="fan"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              พัดลม
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="tv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ทีวี
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="fridge"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ตู้เย็น
            </label>
          </div>

          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="water_heater"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เครื่องทำน้ำอุ่น
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="pet"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อนุญาตให้เลี้ยงสัตว์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="cigarette"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อนุญาตให้สูบบุหรี่
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
            <Field
              type="checkbox"
              name="security"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ระบบรักษาความปลอดภัยคีร์การ์ด/สแกนลายนิ้วมือ
            </label>
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              ประเภทหอพัง
            </label>
            <Field
              as="select"
              name="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="หอพักรวมชายหญิง" selected>
                หอพักรวมชายหญิง
              </option>
              <option value="หอพักชายล้วน">หอพักชายล้วน</option>
              <option value="หอพักหญิงล้วน">หอพักหญิงล้วน</option>
            </Field>
          </div>

          <div className="my-8">
            <label className="relative inline-flex items-center mr-5 cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                แนะนำ
              </span>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
              เพิ่ม
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default HotelsAddPage;
