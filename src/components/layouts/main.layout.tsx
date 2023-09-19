import NavBarCom from "../navbar.com";
import MapCom from "../map.com";
import Carousel from "../carousel.com";
import TableHotelHome from "../tableHotelHome";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { dbHotels } from "../../configs/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useNavigate } from "react-router";
import { setDefaltUser } from "../../stores/users/userSlice";
import { Link } from "react-router-dom";
import Utils from "../../utils/utils";

const MainLayout = () => {
  const [hotels, setHotels] = useState<any[]>([]);

  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    setHotels(
      data.docs.map((doc) => {
        console.log(doc.data());
        return { ...doc.data(), id: doc.id };
      })
    );
  };

  useEffect(() => {
    dispatch(setDefaltUser());
    console.log(user);
    getHotels();
  }, []);

  return (
    <div>
      <h1 className=" text-white text-end h-4 pr-5 bg-gradient-to-r from-indigo-400 from-10% via-sky-500 via-30% to-emerald-500 to-90%"></h1>
      <NavBarCom />
      <div className="flex align-middle justify-center my-10">
        <h1 className="text-3xl text-slate-800">
          รวมอพาร์ทเม้นท์ ที่พัก หอพัก ทั่วประเทศ
        </h1>
      </div>
      <div className="w-full bg-gray-500">
        <Carousel />
      </div>
      <div className="w-full  mt-5 flex flex-col lg:flex-row gap-4 lg:gap-0 justify-center">
        <div className=" flex flex-col gap-4">
          <TableHotelHome hotels={hotels} />
          <Content hotels={hotels} />
        </div>
        <ContentCardMini hotels={hotels} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const Content = (props: { hotels: any[] }) => {
  const hotels = props.hotels.filter((f) => f.promote === true);
  if (hotels.length === 0) {
    return (
      <div className="mx-5 bg-white p-5 rounded-md min-h-[20rem]">
        <h1 className="text-3xl">แนะนำ</h1>
        <h1 className="mt-10">ไม่รายการแนะนำ</h1>
      </div>
    );
  }

  return (
    <div className="mx-5 bg-white p-5 rounded-md">
      <h1 className="text-3xl">แนะนำ</h1>
      <br />
      <div className="">
        {props.hotels
          .filter((f) => f.promote === true)
          .map((e, i) => (
            <Card key={i} hotel={e} />
          ))}
      </div>
    </div>
  );
};
const ContentCardMini = (props: { hotels: any[] }) => {
  if (props.hotels.length === 0) {
    return (
      <div className="mx-5 bg-white p-5 rounded-md min-h-[20rem]">
        <h1 className="text-3xl">ใหม่</h1>
        <h1 className="mt-10">ไม่รายการใหม่</h1>
      </div>
    );
  }

  return (
    <div className="mx-5 bg-white p-5 rounded-md">
      <h1 className="text-3xl">ใหม่</h1>
      <br />
      <div className="bg-white rounded-md ">
        {props.hotels.slice(0, 10).map((e, i) => (
          <CardMini key={Math.random()} hotel={e} />
        ))}
      </div>
    </div>
  );
};

const Card = (props: { hotel: any }) => {
  const e = props.hotel;
  const timeStamp = e.created_at;
  const date = new Date(timeStamp.seconds);

  return (
    <Link to={"/hotel"} state={{ hotel: e }}>
      <hr className="my-1" />
      <div className="flex gap-4">
        <div className="bg-white rounded-sm shadow-lg p-2">
          <img src={e.imageUrls[0]} alt="" className="w-28 h-28" />
        </div>
        <div>
          <h1 className="text-blue-400">
            {e.name}{" "}
            {/* <span className="text-xs text-white rounded-lg bg-orange-500 px-2">
              update !
            </span> */}
          </h1>
          <h3 className="text-gray-400">{e.address}</h3>
          <h1 className="text-gray-700">
            {Utils.bath(e.min_price)} - {Utils.bath(e.max_price)} บาท/เดือน
          </h1>
          <a
            className="text-xs text-blue-600 underline"
            href={e.map_url}
            target="_blank"
          >
            ดูแผนที่
          </a>
        </div>
      </div>

      <hr className="my-1" />
    </Link>
  );
};

const CardMini = (props: { hotel: any }) => {
  const e = props.hotel;
  const timeStamp = e.updated_at;
  const date = new Date(timeStamp.seconds);
  return (
    <>
      <a href={e.map_url} target="_blank">
        <div className="bg-white mb-4  border rounded-xl shadow-sm sm:flex   ">
          <div>
            <figure className="max-h-[6rem]">
              <img
                className="h-auto max-h-[6rem] min-w-[7rem] rounded-md ml-1 mt-1"
                src={e.imageUrls[0]}
                alt="image description"
              />
            </figure>
            <div className="p-2">
              <p className="text-xs">เบอร์ : {e.phone}</p>
              <p className="text-xs">ไลน์ : {e.line}</p>
            </div>
          </div>

          <div className="p-2 flex flex-wrap text-sm min-w-[7rem]">
            <div className="p-1 flex flex-col h-full ">
              <h3 className="text-lg font-bold text-gray-800 ">{e.name}</h3>

              <p className="text-xs">{e.type}</p>
              <p className="text-xs">
                ราคา {e.min_price} - {e.max_price}
              </p>
              <a
                className="text-xs text-blue-600 underline"
                href={e.map_url}
                target="_blank"
              >
                ดูแผนที่
              </a>

              <div className="mt-5 sm:mt-auto">
                <p className="text-xs text-gray-500 ">
                  อับเดตเมื่อ {date.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </a>
    </>
  );
};
export default MainLayout;
