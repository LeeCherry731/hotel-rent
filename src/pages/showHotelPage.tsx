import React, { useState } from "react";
import { useLocation } from "react-router";
import Utils from "../utils/utils";
import { Carousel } from "react-responsive-carousel";
import NavBarCom from "../components/navbar.com";

type Props = {};

const ShowHotelPage = (props: Props) => {
  const [index, setindex] = useState(0);

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
            <div className=" duration-700 ease-in-out" datatype="slide">
              <img
                src={e.imageUrls[index]}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>

          <hr className="my-4" />
          <div className="w-full flex gap-2 overflow-x-scroll ">
            {e.imageUrls.map((img: string, i: number) => (
              <img
                onClick={() => {
                  setindex(i);
                }}
                src={img}
                className="max-w-[10rem] hover:scale-105"
                alt="..."
              />
            ))}
          </div>
          <hr className="my-4" />
          <div className="">
            <div className="">
              <div className="">
                <h1 className="text-2xl">{e.name}</h1>
                <p className="text-sm text-gray-400">{e.address}</p>
                <h1>
                  {Utils.bath(e.min_price)} - {Utils.bath(e.max_price)}{" "}
                  บาท/เดือน
                </h1>
                <p className="text-lg">ประเภทหอพัก : {e.type}</p>
              </div>
              <div>
                <a
                  className="text-lg text-blue-600 underline"
                  href={e.map_url}
                  target="_blank"
                >
                  ดูแผนที่
                </a>
                <p className="text-lg">เบอร์ : {e.phone}</p>
                <p className="text-lg">ไลน์ : {e.line}</p>
              </div>
              <div>
                <p className="text-lg">
                  ราคาต่ำที่สุด : {Utils.bath(e.min_price)}
                </p>
                <p className="text-lg">
                  ราคาสูงที่สุด : {Utils.bath(e.max_price)}
                </p>
                <hr className="my-1" />

                <p className="text-lg">เงินประกัน : {Utils.bath(e.bail)}</p>
                <p className="text-lg">จ่ายล่วงหน้า : {Utils.bath(e.prepay)}</p>
                <p className="text-lg">
                  ค่าไฟ :{Utils.bath(e.electricity_bill)}
                </p>
                <p className="text-lg">ค่าน้ำ : {Utils.bath(e.water_bill)}</p>
              </div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="my-3 flex  flex-col gap-1 md:flex-row  md:gap-10 pb-32">
            <div>
              <p className="text-lg">
                {e.car_park ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>ที่จอดรถยนต์</p>
                  </div>
                ) : (
                  <p className="line-through">ที่จอดรถยนต์</p>
                )}
              </p>
              <p className="text-lg">
                {e.water_heater ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>เครื่องทำน้ำอุ่น</p>
                  </div>
                ) : (
                  <p className="line-through">เครื่องทำน้ำอุ่น</p>
                )}
              </p>
              <p className="text-lg">
                {e.pet ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อนุญาตให้เลี้ยงสัตว์</p>
                  </div>
                ) : (
                  <p className="line-through">อนุญาตให้เลี้ยงสัตว์</p>
                )}
              </p>
              <p className="text-lg">
                {e.cigarette ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อนุญาตให้สูบบุหรี่</p>
                  </div>
                ) : (
                  <p className="line-through">อนุญาตให้สูบบุหรี่</p>
                )}
              </p>
              <p className="text-lg">
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
              <p className="text-lg">
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
              <p className="text-lg">
                {e.elevator ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>ลิฟต์</p>
                  </div>
                ) : (
                  <p className="line-through">ลิฟต์</p>
                )}
              </p>
              <p className="text-lg">
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
              <p className="text-lg">
                {e.motorcycle_park ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>ที่จอดรถยนต์</p>
                  </div>
                ) : (
                  <p className="line-through">ที่จอดรถยนต์</p>
                )}
              </p>
              <p className="text-lg">
                {e.air ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>เครื่องปรับอากาศ</p>
                  </div>
                ) : (
                  <p className="line-through">เครื่องปรับอากาศ</p>
                )}
              </p>
              <p className="text-lg">
                {e.fan ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>พัดลม</p>
                  </div>
                ) : (
                  <p className="line-through">พัดลม</p>
                )}
              </p>
              <p className="text-lg">
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
              <p className="text-lg">
                {e.furniture ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>เฟอร์นิเจอร์-ตู้, เตียง</p>
                  </div>
                ) : (
                  <p className="line-through">เฟอร์นิเจอร์-ตู้, เตียง</p>
                )}
              </p>
              <p className="text-lg">
                {e.wifi ? (
                  <div className="flex gap-2">
                    <input type="checkbox" defaultChecked />
                    <p>อินเทอร์เน็ตไวไฟ</p>
                  </div>
                ) : (
                  <p className="line-through">อินเทอร์เน็ตไวไฟ</p>
                )}
              </p>
              <p className="text-lg">
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
