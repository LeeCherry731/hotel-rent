import React from "react";
import { useLocation } from "react-router";
import Utils from "../utils/utils";
import { Carousel } from "react-responsive-carousel";
import NavBarCom from "../components/navbar.com";

type Props = {};

const ShowHotelPage = (props: Props) => {
  const location = useLocation();
  const { hotel } = location.state;
  const e = hotel;

  return (
    <>
      <NavBarCom />
      <br />
      <div className="relative w-full max-w-[85rem] mx-auto">
        <div className="bg-white px-4 min-h-full pt-4">
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            <Carousel interval={1000}>
              {e.imageUrls.map((img: string) => (
                <div className=" duration-700 ease-in-out" datatype="slide">
                  <img
                    src={img}
                    className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt="..."
                  />
                </div>
              ))}
            </Carousel>
          </div>
          {/* <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button type="button" className="w-3 h-3 rounded-full"></button>
            <button type="button" className="w-3 h-3 rounded-full"></button>
            <button type="button" className="w-3 h-3 rounded-full"></button>
            <button type="button" className="w-3 h-3 rounded-full"></button>
            <button type="button" className="w-3 h-3 rounded-full"></button>
          </div> */}
          {/* <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button> */}
          <hr className="my-4" />
          <div className="flex flex-col md:flex-row w-full gap-3 px-5">
            <div>
              {e.imageUrls.map((img: string) => (
                <img src={img} className="max-w-[10rem]" alt="..." />
              ))}
            </div>
            <div className="flex flex-col md:flex-row  gap-5 align-top justify-start">
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

                <p className="text-xs">เงินประกัน : {Utils.bath(e.bail)}</p>
                <p className="text-xs">จ่ายล่วงหน้า : {Utils.bath(e.prepay)}</p>
                <p className="text-xs">
                  ค่าไฟ :{Utils.bath(e.electricity_bill)}
                </p>
                <p className="text-xs">ค่าน้ำ : {Utils.bath(e.water_bill)}</p>
              </div>
            </div>
          </div>
          <div className="my-3 flex  flex-col gap-1 md:flex-row  md:gap-10 ">
            <div>
              <p className="text-xs">
                {e.car_park ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>ที่จอดรถยนต์</p>
                  </div>
                ) : (
                  <p className="line-through">ที่จอดรถยนต์</p>
                )}
              </p>
              <p className="text-xs">
                {e.water_heater ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>เครื่องทำน้ำอุ่น</p>
                  </div>
                ) : (
                  <p className="line-through">เครื่องทำน้ำอุ่น</p>
                )}
              </p>
              <p className="text-xs">
                {e.pet ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อนุญาตให้เลี้ยงสัตว์</p>
                  </div>
                ) : (
                  <p className="line-through">อนุญาตให้เลี้ยงสัตว์</p>
                )}
              </p>
              <p className="text-xs">
                {e.cigarette ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อนุญาตให้สูบบุหรี่</p>
                  </div>
                ) : (
                  <p className="line-through">อนุญาตให้สูบบุหรี่</p>
                )}
              </p>
              <p className="text-xs">
                {e.security ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
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
                    <input type="checkbox" defaultChecked />
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
                    <input type="checkbox" defaultChecked />
                    <p>ลิฟต์</p>
                  </div>
                ) : (
                  <p className="line-through">ลิฟต์</p>
                )}
              </p>
              <p className="text-xs">
                {e.laundry_service ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
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
                    <input type="checkbox" defaultChecked />
                    <p>ที่จอดรถยนต์</p>
                  </div>
                ) : (
                  <p className="line-through">ที่จอดรถยนต์</p>
                )}
              </p>
              <p className="text-xs">
                {e.air ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>เครื่องปรับอากาศ</p>
                  </div>
                ) : (
                  <p className="line-through">เครื่องปรับอากาศ</p>
                )}
              </p>
              <p className="text-xs">
                {e.fan ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>พัดลม</p>
                  </div>
                ) : (
                  <p className="line-through">พัดลม</p>
                )}
              </p>
              <p className="text-xs">
                {e.fridge ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
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
                    <input type="checkbox" defaultChecked />
                    <p>เฟอร์นิเจอร์-ตู้, เตียง</p>
                  </div>
                ) : (
                  <p className="line-through">เฟอร์นิเจอร์-ตู้, เตียง</p>
                )}
              </p>
              <p className="text-xs">
                {e.wifi ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อินเทอร์เน็ตไวไฟ</p>
                  </div>
                ) : (
                  <p className="line-through">อินเทอร์เน็ตไวไฟ</p>
                )}
              </p>
              <p className="text-xs">
                {e.tv ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>ทีวี</p>
                  </div>
                ) : (
                  <p className="line-through">ทีวี</p>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowHotelPage;
