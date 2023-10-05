import { Field, Formik, Form, ErrorMessage } from "formik";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { db, dbHotels, storage } from "../../configs/firebase.config";
import { addDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { IAddHotel } from "../../interfaces/add-user.interface";
import GoogleMapShowHotel from "../../components/map.com";
import MapAddHotel from "../../components/mapAddHotel";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
type Props = {};

const HotelsEditPage = (props: Props) => {
  const location = useLocation();
  const { hotel } = location.state;
  const user = useSelector((state: RootState) => state.user.info);

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const initialValues: IAddHotel = {
    id: hotel.id,
    userId: user.id,
    name: hotel.name,
    address: hotel.address,
    phone: hotel.phone,
    line: hotel.line,
    type: hotel.type,
    map_url: hotel.map_url,
    price: hotel.price,
    min_price: hotel.min_price,
    max_price: hotel.max_price,
    bail: hotel.bail,
    prepay: hotel.prepay,
    electricity_bill: hotel.electricity_bill,
    water_bill: hotel.water_bill,

    promote: hotel.promote,

    car_park: hotel.car_park,
    water_heater: hotel.water_heater,
    pet: hotel.pet,
    cigarette: hotel.cigarette,
    security: hotel.security,
    cctv: hotel.cctv,
    elevator: hotel.elevator,
    laundry_service: hotel.laundry_service,
    motorcycle_park: hotel.motorcycle_park,
    air: hotel.air,
    fan: hotel.fan,
    fridge: hotel.fridge,
    furniture: hotel.furniture,
    wifi: hotel.wifi,
    tv: hotel.tv,

    imageUrls: hotel.imageUrls,
    created_at: hotel.created_at,
    updated_at: serverTimestamp(),
  };

  const onSubmit = (value: IAddHotel) => {
    // console.log(value);
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
              updateHotel(urls, value);
              setIsLoading(false);
            }
          });
        })
        .catch((err) => {
          alert(err.message);
        });
    });
    if (files.length === 0) {
      updateHotel(urls, value);
    }
    setIsLoading(false);
  };

  const updateHotel = async (urls: string[], value: typeof initialValues) => {
    console.log(urls);
    const hotel: IAddHotel = {
      id: value.id,
      userId: user.id,
      name: value.name,
      address: value.address,
      phone: value.phone,
      line: value.line,
      type: value.type,
      map_url: value.map_url,

      promote: value.promote,
      price: value.price,
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

      imageUrls: [...urls, ...value.imageUrls],
      created_at: value.created_at,
      updated_at: serverTimestamp(),
    };
    const hotelDoc = doc(db, "hotels", value.id);
    console.log(hotelDoc);

    updateDoc(hotelDoc, JSON.parse(JSON.stringify(hotel)))
      .then((res) => {
        alert("แก้ไขข้อมูลสำเร็จ");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="w-full bg-white rounded-md p-5  md:w-[1000px]">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Name
              </label>
              <Field
                type="text"
                id="first_name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Name"
                required
              />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Address
              </label>
              <Field
                type="text"
                name="address"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Address"
                required
              />
              <ErrorMessage name="address" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="phone"
                required
              />
              <ErrorMessage name="phone" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                ID
              </label>
              <Field
                type="text"
                name="line"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="line"
                required
              />
              <ErrorMessage name="phone" />
            </div>
          </div>
          {/* <div className="mb-3">
            <label
              htmlFor="min_price"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              ราคาบาท/ต่อเดือน
            </label>
            <Field
              type="number"
              id="price"
              name="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="1000"
              required
            />
            <ErrorMessage name="min_price" />
          </div> */}
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="min_price"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ราคาต่อเดือนต่ำที่สุด
              </label>
              <Field
                type="number"
                id="min_price"
                name="min_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1000"
                required
              />
              <ErrorMessage name="min_price" />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ราคาต่อเดือนสูงที่สุด
              </label>
              <Field
                type="number"
                id="max_price"
                name="max_price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="100000"
                required
              />
              <ErrorMessage name="max_price" />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                เงินประกัน
              </label>
              <Field
                type="number"
                name="bail"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1000"
                required
              />
              <ErrorMessage name="bail" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                จ่ายล่วงหน้า
              </label>
              <Field
                type="number"
                name="prepay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="100000"
                required
              />
              <ErrorMessage name="prepay" />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                ค่าไฟ/ยูนิต
              </label>
              <Field
                type="number"
                name="electricity_bill"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="1000"
                required
              />
              <ErrorMessage name="electricity_bill" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                ค่าน้ำ/ยูนิต
              </label>
              <Field
                type="number"
                name="water_bill"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="100000"
                required
              />
              <ErrorMessage name="water_bill" />
            </div>
          </div>
          <div>
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              แผนที่ (Map Url)
            </label>
            <Field
              type="url"
              name="map_url"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="www.google.com"
              required
            />
            <ErrorMessage name="map_url" />
          </div>
          {/* <MapAddHotel /> */}
          <br />
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="car_park"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ที่จอดรถยนต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="motorcycle_park"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ที่จอดมอเตอร์ไซต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="cctv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              กล้องวงจรปิด (CCTV)
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="elevator"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ลิฟต์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="laundry_service"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ร้านซัก-รีด / มีบริการเครื่องซักผ้า
            </label>
          </div>

          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="wifi"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อินเทอร์เน็ตไวไฟ
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="furniture"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เฟอร์นิเจอร์-ตู้, เตียง
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="air"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เครื่องปรับอากาศ
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="fan"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              พัดลม
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="tv"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ทีวี
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="fridge"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ตู้เย็น
            </label>
          </div>

          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="water_heater"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              เครื่องทำน้ำอุ่น
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="pet"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อนุญาตให้เลี้ยงสัตว์
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="cigarette"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              อนุญาตให้สูบบุหรี่
            </label>
          </div>
          <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
            <Field
              type="checkbox"
              name="security"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
            />
            <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              ระบบรักษาความปลอดภัยคีร์การ์ด/สแกนลายนิ้วมือ
            </label>
          </div>

          <div className="mt-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              ประเภทหอพัง
            </label>
            <Field
              as="select"
              name="type"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="หอพักรวมชายหญิง">หอพักรวมชายหญิง</option>
              <option value="หอพักชายล้วน">หอพักชายล้วน</option>
              <option value="หอพักหญิงล้วน">หอพักหญิงล้วน</option>
            </Field>
          </div>

          {/* <div className="my-8">
            <label className="relative inline-flex items-center mr-5 cursor-pointer">
              <Field type="checkbox" name="promote" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                แนะนำ
              </span>
            </label>
          </div> */}

          <div className="p-5 grid grid-cols-3 gap-4 place-content-center">
            {files === null ? (
              <></>
            ) : (
              hotel.imageUrls.map((e: any, i: number) => {
                return (
                  <>
                    <img
                      key={i}
                      className="h-auto rounded-lg"
                      src={e}
                      alt="image description"
                    />
                  </>
                );
              })
            )}
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
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
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
              แก้ไข
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default HotelsEditPage;
