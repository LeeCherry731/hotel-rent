import React, { useEffect, useState } from "react";
import NavBarCom from "../components/navbar.com";
import { getDocs } from "firebase/firestore";
import { dbHotels } from "../configs/firebase.config";
import { useFormik } from "formik";

type Props = {};

const SearchHotelPage = (props: Props) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelsD, setHotelsD] = useState<any[]>([]);

  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    setHotelsD(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
    setHotels(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  const formik = useFormik({
    initialValues: {
      type: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  useEffect(() => {
    getHotels();
  }, []);

  const onChangeFilter = () => {
    setHotels(hotelsD);
    const timer = setTimeout(() => {
      console.log("onChange");
      console.log(formik.values.type);
      setHotels(hotelsD.filter((e) => e.type === formik.values.type));

      clearTimeout(timer);
    }, 200);
  };

  return (
    <>
      <NavBarCom />

      <div className="w-full flex justify-center">
        <div className="bg-white w-full max-w-5xl rounded-lg mt-5 shadow-xl p-7">
          <div className="">
            <h1 className="text-2xl">อพาร์ทเม้นท์ หอพัก ใกล้ </h1>
            <div className="bg-zinc-100 w-full rounded-md p-3">
              <h1>
                ถนน/ซอยใกล้เคียง ถนนศรีจันทร์ ขอนแก่น (69) ถนนเลี่ยงเมืองขอนแก่น
                (9)
              </h1>
              <hr
                className=" bg-white text-white "
                style={{ height: "1.5px" }}
              />
              <h1>
                ย่านต่างๆใกล้ วิทยาลัยพยาบาลบรมราชชนนีขอนแก่น
                สนามบินขอนแก่น(295) บิ๊กซี ขอนแก่น(111) อนุสาวรีย์จอมพลสฤษดิ์
                ธนะรัชต์(166) เทสโก้โลตัส ขอนแก่น(38) ไดโน วอเตอร์ ปาร์ค(121)
                สถานีขนส่งขอนแก่น 3(82) เซ็นทรัล พลาซ่า ขอนแก่น(145) อินเด็กซ์
                ลิฟวิ่ง มอลล์ ขอนแก่น(120) เซ็นโทซ่า ขอนแก่น(231) แม็คโคร
                ขอนแก่น(70) ดูทั้งหมด...
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-5 gap-2">
            <div className="col-span-2">
              {hotels.map((e) => (
                <>
                  <div className="flex w-full h-32 gap-3">
                    <img src={e.imageUrls[0]} alt="" className="w-28 h-28" />
                    <div>
                      <h1 className="text-sky-500">{e.name}</h1>
                      <p className="text-sm text-gray-400">{e.address}</p>
                      <h1>
                        {e.min_price} - {e.max_price} บาท/เดือน
                      </h1>
                      <p className="text-xs">ประเภทหอพัก : {e.type}</p>

                      <a
                        className="text-xs text-blue-600 underline"
                        href={e.map_url}
                        target="_blank"
                      >
                        ดูแผนที่
                      </a>
                      <p className="text-xs">เบอร์ : {e.phone}</p>
                      <p className="text-xs">ไลน์ : {e.line}</p>
                    </div>
                  </div>
                  <hr />
                </>
              ))}
            </div>
            <div>
              <p>ค้นหา</p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  ประเภทหอพัก
                </label>
                <select
                  id="countries"
                  name="type"
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="หอพักรวมชายหญิง">หอพักรวมชายหญิง</option>
                  <option value="หอพักชายล้วน">หอพักชายล้วน</option>
                  <option value="หอพักหญิงล้วน">หอพักหญิงล้วน</option>
                </select>
              </div>
              <div className="mb-6 mt-3 flex gap-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ราคาเริ่มต้น
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="1,000"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    ราคาสูงสุด
                  </label>
                  <input
                    type="text"
                    id="small-input"
                    placeholder="10,000"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
              </div>
              <input
                id="large-range"
                type="range"
                value="50"
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg dark:bg-gray-700"
              ></input>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="car_park"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  ที่จอดรถ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="cctv"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  กล้องวงจรปิด (CCTV)
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="elevator"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  ลิฟต์
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="laundry_service"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  ร้านซัก-รีด / มีบริการเครื่องซักผ้า
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="motorcycle_park"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  ที่จอดมอเตอร์ไซต์
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="wifi"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  อินเทอร์เน็ตไร้สาย (WIFI) ในห้อง
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="furniture"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  เฟอร์นิเจอร์-ตู้, เตียง
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="air"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  เครื่องปรับอากาศ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="fan"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  พัดลม
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="tv"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  มี TV
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="fridge"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  ตู้เย็น
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="pool"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  สระว่ายน้ำ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                <input
                  type="checkbox"
                  name="gym"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  โรงยิม / ฟิตเนส
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHotelPage;
