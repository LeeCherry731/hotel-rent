import NavBarCom from "../navbar.com";
import MapCom from "../map.com";
import Carousel from "../carousel.com";
import TableHotelHome from "../tableHotelHome";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { dbHotels } from "../../configs/firebase.config";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { useNavigate } from "react-router";

const MainLayout = () => {
  const [hotels, setHotels] = useState<any[]>([]);

  const count = useSelector((state: RootState) => state.counter.value);
  const navigate = useNavigate();

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

      <div className="flex flex-row mt-5 max-w-[85rem] w-full mx-auto">
        <div className="basis-3/4">
          <div
            onClick={() => {
              navigate("/hotels/search");
            }}
          >
            <TableHotelHome hotels={hotels} />
          </div>
          <br />
          <Content hotels={hotels} />
        </div>
        <div className="basis-1/4">
          <ContentCardMini hotels={hotels} />
        </div>
      </div>
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
      <div className="grid  grid-cols-3 gap-4">
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
      <div className="  bg-white rounded-md flex flex-col">
        {props.hotels.slice(0, 5).map((e, i) => (
          <CardMini key={i} hotel={e} />
        ))}
      </div>{" "}
    </div>
  );
};

const Card = (props: { hotel: any }) => {
  const e = props.hotel;
  const timeStamp = e.created_at;
  const date = new Date(timeStamp.seconds);

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-gray-700 dark:shadow-slate-700/[.7] dark:divide-gray-600">
          <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
            <img
              className="h-auto max-h-[6rem] min-w-[7rem] rounded-md ml-1 mt-1"
              src={e.imageUrls[0]}
              alt="image description"
            />
            <div className="p-4 flex-1 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {e.name}
              </h3>
              <p className="mt-1 text-sm line-clamp-4 text-gray-800 dark:text-gray-400">
                {e.address}
              </p>

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
              <p className="text-xs">เบอร์ : {e.phone}</p>
              <p className="text-xs">ไลน์ : {e.line}</p>
            </div>
            <div className="p-4 border-t sm:px-5 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                อับเดตเมื่อ {date.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardMini = (props: { hotel: any }) => {
  const e = props.hotel;
  const timeStamp = e.updated_at;
  const date = new Date(timeStamp.seconds);
  return (
    <>
      <a href={e.map_url} target="_blank">
        <div className="bg-white mb-4 h-40 border rounded-xl shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
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
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {e.name}
              </h3>

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
                <p className="text-xs text-gray-500 dark:text-gray-500">
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
