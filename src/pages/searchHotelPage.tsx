import React, { useEffect, useState } from "react";
import NavBarCom from "../components/navbar.com";
import { getDocs } from "firebase/firestore";
import { dbHotels } from "../configs/firebase.config";
import { useFormik } from "formik";
import Utils from "../utils/utils";

type Props = {};

const SearchHotelPage = (props: Props) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelsD, setHotelsD] = useState<any[]>([]);
  // let hotelsD: any[] = [];

  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    const hotels = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setHotelsD(hotels);

    setHotels(hotels);
    console.log(hotels);
  };

  const formik = useFormik({
    initialValues: {
      type: "หอพักรวมชายหญิง",
      name: "",
      address: "",
      phone: "",
      line: "",
      map_url: "",

      range_min: 1,
      range_max: 10000,
      range: 0,

      min_price: 0,
      max_price: 0,
      bail: 0,
      prepay: 0,
      electricity_bill: 0,
      water_bill: 0,

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
    },
    onSubmit: (values) => {
      console.log(values);
      // console.log(values.range_min);
      // console.log(values.range_max);

      setHotels(hotelsD);

      let newHotels = hotelsD;

      newHotels = newHotels.filter((e) => {
        return (
          parseInt(e.min_price) >= values.range_min &&
          parseInt(e.max_price) <= values.range_max
        );
      });

      newHotels = newHotels.filter((e) => {
        return e.type === values.type;
      });
      newHotels = newHotels.filter((e) => {
        const eA = e.address.toLowerCase();
        const eV = e.address.toLowerCase();
        return eA.includes(eV);
      });

      if (values.car_park === true) {
        newHotels = newHotels.filter((e) => {
          return e.car_park === values.car_park;
        });
      }
      if (values.water_heater === true) {
        newHotels = newHotels.filter((e) => {
          return e.water_heater === values.water_heater;
        });
      }
      if (values.pet === true) {
        newHotels = newHotels.filter((e) => {
          return e.pet === values.pet;
        });
      }
      if (values.cigarette === true) {
        newHotels = newHotels.filter((e) => {
          return e.cigarette === values.cigarette;
        });
      }
      if (values.security === true) {
        newHotels = newHotels.filter((e) => {
          return e.security === values.security;
        });
      }
      if (values.cctv === true) {
        newHotels = newHotels.filter((e) => {
          return e.cctv === values.cctv;
        });
      }
      //--------------
      if (values.elevator === true) {
        newHotels = newHotels.filter((e) => {
          return e.elevator === values.elevator;
        });
      }
      if (values.laundry_service === true) {
        newHotels = newHotels.filter((e) => {
          return e.laundry_service === values.laundry_service;
        });
      }
      if (values.motorcycle_park === true) {
        newHotels = newHotels.filter((e) => {
          return e.motorcycle_park === values.motorcycle_park;
        });
      }
      if (values.air === true) {
        newHotels = newHotels.filter((e) => {
          return e.air === values.air;
        });
      }
      if (values.fan === true) {
        newHotels = newHotels.filter((e) => {
          return e.fan === values.fan;
        });
      }
      if (values.fridge === true) {
        newHotels = newHotels.filter((e) => {
          return e.fridge === values.fridge;
        });
      }
      if (values.furniture === true) {
        newHotels = newHotels.filter((e) => {
          return e.furniture === values.furniture;
        });
      }
      if (values.wifi === true) {
        newHotels = newHotels.filter((e) => {
          return e.wifi === values.wifi;
        });
      }
      if (values.tv === true) {
        newHotels = newHotels.filter((e) => {
          return e.tv === values.tv;
        });
      }

      setHotels(newHotels);
    },
  });

  useEffect(() => {
    getHotels();
  }, []);

  const onChangeFilter = () => {
    formik.submitForm();
  };

  return (
    <>
      <NavBarCom />

      <div className="w-full flex justify-center">
        <div className="bg-white w-full max-w-5xl rounded-lg mt-5 shadow-xl p-7">
          <div className="">
            <h1 className="text-2xl">อพาร์ทเม้นท์ หอพัก ที่อยู่</h1>
            <div className="bg-zinc-100 w-full rounded-md p-3">
              <h1>ค้นหา ทั้งหมด ({hotelsD.length})</h1>
              <hr
                className=" bg-white text-white "
                style={{ height: "1.5px" }}
              />
              <h1></h1>
            </div>
          </div>

          <div className="grid grid-cols-3 mt-5 gap-2">
            <div className="col-span-2">
              {hotels.map((e) => (
                <div key={e.id} className="py-2">
                  <div className="flex w-full  gap-3">
                    <img src={e.imageUrls[0]} alt="" className="w-28 h-28" />
                    <div className="flex gap-5 align-top justify-start">
                      <div className="bg-slate-50 rounded-md p-1">
                        <h1 className="text-sky-500">{e.name}</h1>
                        <p className="text-sm text-gray-400">{e.address}</p>
                        <h1>
                          {Utils.bath(e.min_price)} - {Utils.bath(e.max_price)}{" "}
                          บาท/เดือน
                        </h1>
                        <p className="text-xs">ประเภทหอพัก : {e.type}</p>
                      </div>

                      <div>
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
                      <div>
                        <p className="text-xs">
                          ราคาต่ำที่สุด : {Utils.bath(e.min_price)}
                        </p>
                        <p className="text-xs">
                          ราคาสูงที่สุด : {Utils.bath(e.max_price)}
                        </p>
                        <hr className="my-1" />

                        <p className="text-xs">
                          เงินประกัน : {Utils.bath(e.bail)}
                        </p>
                        <p className="text-xs">
                          จ่ายล่วงหน้า : {Utils.bath(e.prepay)}
                        </p>
                        <p className="text-xs">
                          ค่าไฟ :{Utils.bath(e.electricity_bill)}
                        </p>
                        <p className="text-xs">
                          ค่าน้ำ : {Utils.bath(e.water_bill)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="my-3 flex gap-10">
                    <div>
                      <p className="text-xs">
                        {e.car_park ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ที่จอดรถยนต์</p>
                          </div>
                        ) : (
                          <p className="line-through">ที่จอดรถยนต์</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.water_heater ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>เครื่องทำน้ำอุ่น</p>
                          </div>
                        ) : (
                          <p className="line-through">เครื่องทำน้ำอุ่น</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.pet ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>อนุญาตให้เลี้ยงสัตว์</p>
                          </div>
                        ) : (
                          <p className="line-through">อนุญาตให้เลี้ยงสัตว์</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.cigarette ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>อนุญาตให้สูบบุหรี่</p>
                          </div>
                        ) : (
                          <p className="line-through">อนุญาตให้สูบบุหรี่</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.security ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ระบบรักษาความปลอดภัยคีร์การ์ด/สแกนลายนิ้วมือ</p>
                          </div>
                        ) : (
                          <p className="line-through">
                            ระบบรักษาความปลอดภัยคีร์การ์ด/สแกนลายนิ้วมือ
                          </p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.cctv ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>กล้องวงจรปิด (CCTV)</p>
                          </div>
                        ) : (
                          <p className="line-through">กล้องวงจรปิด (CCTV)</p>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs">
                        {e.elevator ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ลิฟต์</p>
                          </div>
                        ) : (
                          <p className="line-through">ลิฟต์</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.laundry_service ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ร้านซัก-รีด / มีบริการเครื่องซักผ้า</p>
                          </div>
                        ) : (
                          <p className="line-through">
                            ร้านซัก-รีด / มีบริการเครื่องซักผ้า
                          </p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.motorcycle_park ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ที่จอดรถยนต์</p>
                          </div>
                        ) : (
                          <p className="line-through">ที่จอดรถยนต์</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.air ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>เครื่องปรับอากาศ</p>
                          </div>
                        ) : (
                          <p className="line-through">เครื่องปรับอากาศ</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.fan ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>พัดลม</p>
                          </div>
                        ) : (
                          <p className="line-through">พัดลม</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.fridge ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ตู้เย็น</p>
                          </div>
                        ) : (
                          <p className="line-through">ตู้เย็น</p>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs">
                        {e.furniture ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>เฟอร์นิเจอร์-ตู้, เตียง</p>
                          </div>
                        ) : (
                          <p className="line-through">
                            เฟอร์นิเจอร์-ตู้, เตียง
                          </p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.wifi ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>อินเทอร์เน็ตไวไฟ</p>
                          </div>
                        ) : (
                          <p className="line-through">อินเทอร์เน็ตไวไฟ</p>
                        )}
                      </p>
                      <p className="text-xs">
                        {e.tv ? (
                          <div className="flex gap-2">
                            <input type="checkbox" checked />
                            <p>ทีวี</p>
                          </div>
                        ) : (
                          <p className="line-through">ทีวี</p>
                        )}
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div>
              <p>ค้นหา</p>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  ประเภทหอพัก
                </label>
                <select
                  id="countries"
                  name="type"
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="หอพักรวมชายหญิง">หอพักรวมชายหญิง</option>
                  <option value="หอพักชายล้วน">หอพักชายล้วน</option>
                  <option value="หอพักหญิงล้วน">หอพักหญิงล้วน</option>
                </select>
              </div>
              <div className="my-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  ที่อยู่
                </label>
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="text"
                  name="address"
                  id="small-input"
                  placeholder="ที่อยู่"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-6 mt-3 flex gap-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    ราคาเริ่มต้น
                  </label>
                  <input
                    onChange={(e) => {
                      formik.handleChange(e);
                      onChangeFilter();
                    }}
                    type="number"
                    name="range_min"
                    id="small-input"
                    placeholder="1,000"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    ราคาสูงสุด
                  </label>
                  <input
                    onChange={(e) => {
                      formik.handleChange(e);
                      onChangeFilter();
                    }}
                    type="number"
                    name="range_max"
                    id="small-input"
                    placeholder="10,000"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="car_park"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  ที่จอดรถ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="cctv"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  กล้องวงจรปิด (CCTV)
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="elevator"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  ลิฟต์
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="laundry_service"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  ร้านซัก-รีด / มีบริการเครื่องซักผ้า
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="motorcycle_park"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  ที่จอดมอเตอร์ไซต์
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="wifi"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  อินเทอร์เน็ตไร้สาย (WIFI) ในห้อง
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="furniture"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  เฟอร์นิเจอร์-ตู้, เตียง
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="air"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  เครื่องปรับอากาศ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="fan"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  พัดลม
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="tv"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  มี TV
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="fridge"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  ตู้เย็น
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="pool"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
                  สระว่ายน้ำ
                </label>
              </div>
              <div className="my-2 flex items-center pl-4 border border-gray-200 rounded ">
                <input
                  onChange={(e) => {
                    formik.handleChange(e);
                    onChangeFilter();
                  }}
                  type="checkbox"
                  name="gym"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2"
                />
                <label className="w-full py-4 ml-2 text-sm font-medium text-gray-900 ">
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
