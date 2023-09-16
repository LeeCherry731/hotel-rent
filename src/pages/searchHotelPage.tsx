import React, { useEffect, useState } from "react";
import NavBarCom from "../components/navbar.com";
import { getDocs } from "firebase/firestore";
import { dbHotels } from "../configs/firebase.config";
import { useFormik } from "formik";

type Props = {};

const SearchHotelPage = (props: Props) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelsD, setHotelsD] = useState<any[]>([]);
  // let hotelsD: any[] = [];

  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    setHotelsD(
      data.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );

    setHotels(hotelsD);
    console.log(hotelsD);
  };

  const formik = useFormik({
    initialValues: {
      type: "หอพักรวมชายหญิง",
      name: "",
      address: "",
      phone: "",
      line: "",
      map_url: "",

      range_min: 1000,
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
      // console.log(values.type);
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
        return e.address.includes(values.address);
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
            <h1 className="text-2xl">อพาร์ทเม้นท์ หอพัก ใกล้ </h1>
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
                <div key={e.name}>
                  <div className="flex w-full  gap-3">
                    <img src={e.imageUrls[0]} alt="" className="w-28 h-28" />
                    <div className="flex gap-2 align-top justify-start">
                      <div>
                        <h1 className="text-sky-500">{e.name}</h1>
                        <p className="text-sm text-gray-400">{e.address}</p>
                        <h1>
                          {e.min_price} - {e.max_price} บาท/เดือน
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
                        <p className="text-xs">min_price : {e.min_price}</p>
                        <p className="text-xs">max_price : {e.max_price}</p>
                        <p className="text-xs">bail : {e.bail.toString()}</p>
                        <p className="text-xs">
                          prepay : {e.prepay.toString()}
                        </p>
                        <p className="text-xs">
                          electricity_bill : {e.electricity_bill.toString()}
                        </p>
                        <p className="text-xs">
                          water_bill : {e.water_bill.toString()}
                        </p>
                        <p className="text-xs">
                          car_park : {e.car_park.toString()}
                        </p>
                        <p className="text-xs">
                          water_heater : {e.water_heater.toString()}
                        </p>
                        <p className="text-xs">pet : {e.pet.toString()}</p>
                        <p className="text-xs">
                          cigarette : {e.cigarette.toString()}
                        </p>
                        <p className="text-xs">
                          security : {e.security.toString()}
                        </p>
                        <p className="text-xs">cctv : {e.cctv.toString()}</p>
                        <p className="text-xs">
                          elevator : {e.elevator.toString()}
                        </p>
                        <p className="text-xs">
                          laundry_service : {e.laundry_service.toString()}
                        </p>
                        <p className="text-xs">
                          motorcycle_park : {e.motorcycle_park.toString()}
                        </p>
                        <p className="text-xs">air : {e.air.toString()}</p>
                        <p className="text-xs">fan : {e.fan.toString()}</p>
                        <p className="text-xs">
                          fridge : {e.fridge.toString()}
                        </p>
                        <p className="text-xs">
                          furniture : {e.furniture.toString()}
                        </p>
                        <p className="text-xs">wifi : {e.wifi.toString()}</p>
                        <p className="text-xs">tv : {e.tv.toString()}</p>
                      </div>
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
              <input
                onChange={(e) => {
                  formik.handleChange(e);
                  onChangeFilter();
                }}
                id="large-range"
                type="range"
                name="range"
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg "
              ></input>
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
