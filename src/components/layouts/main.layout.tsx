import NavBarCom from "../navbar.com";
import MapCom from "../map.com";
import Carousel from "../carousel.com";
import TableHotelHome from "../tableHotelHome";
import { useEffect, useState } from "react";
import { getDocs, increment } from "firebase/firestore";
import { dbHotels } from "../../configs/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores/store";
import { decrement, increment as i } from "../../stores/counters/counterSlice";
import { useNavigate } from "react-router";

const MainLayout = () => {
  const [hotels, setHotels] = useState<any[]>([]);

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
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
        {/* <button
          onClick={() => dispatch(i())}
          type="button"
          className="px-5 bg-fuchsia-400"
        >
          +
        </button>
         <p>{count}</p>
        <button
          onClick={() => dispatch(decrement())}
          type="button"
          className="px-5 bg-gray-500"
        >
          -
        </button> */}
      </div>
      <div className="w-full bg-gray-500">
        <Carousel />
      </div>
      {/* <div className="w-full mt-20">
        <MapCom />
      </div> */}
      <div className="flex flex-row mt-5">
        <div
          className="basis-3/4"
          onClick={() => {
            navigate("/hotels/search");
          }}
        >
          <TableHotelHome hotels={hotels} />;
          <br />
          <Content />
        </div>
        <div className="basis-1/4">
          <ContentCardMini hotels={hotels} />
        </div>
      </div>
    </div>
  );
};

const Content = () => {
  const hotals = [1, 2, 3, 4, 5, 6];

  return (
    <div className="mx-5 bg-white p-5 rounded-md">
      <h1 className="text-3xl">แนะนำ</h1>
      <br />
      <div className="grid  grid-cols-3 gap-4">
        {hotals.map((e) => (
          <Card />
        ))}
      </div>
    </div>
  );
};
const ContentCardMini = (props: { hotels: any[] }) => {
  return (
    <div className="mx-5 bg-white p-5 rounded-md">
      <h1 className="text-3xl">ใหม่</h1>
      <br />
      <div className="  bg-white rounded-md flex flex-col">
        {props.hotels.slice(0, 5).map((e) => (
          <CardMini hotel={e} />
        ))}
      </div>{" "}
    </div>
  );
};

const Card = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="grid border rounded-xl shadow-sm divide-y overflow-hidden sm:flex sm:divide-y-0 sm:divide-x dark:border-gray-700 dark:shadow-slate-700/[.7] dark:divide-gray-600">
          <div className="flex flex-col flex-[1_0_0%] bg-white dark:bg-gray-800">
            <img
              className="w-45 h-40 rounded-t-xl sm:rounded-tr-none"
              src="https://bobbyhadz.com/images/blog/react-prevent-multiple-button-clicks/thumbnail.webp"
              alt="Image Description"
            />
            <div className="p-4 flex-1 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Card title
              </h3>
              <p className="mt-1 text-sm line-clamp-4 text-gray-800 dark:text-gray-400">
                This is a wider card with supporting text below as a natural
              </p>
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  className="w-4 h-4 text-gray-300 dark:text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              </div>
            </div>
            <div className="p-4 border-t sm:px-5 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Last updated 5 mins ago
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
  return (
    <>
      <div className="bg-white mb-4 h-40 border rounded-xl shadow-sm sm:flex dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
        <figure className="max-h-[6rem]">
          <img
            className="h-auto max-h-[6rem] min-w-[7rem] rounded-md ml-1 mt-1"
            src={e.imageUrls[0]}
            alt="image description"
          />
        </figure>
        <div className="p-2 flex flex-wrap text-sm">
          <div className="p-1 flex flex-col h-full ">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              {e.name}
            </h3>
            <p className="mt-1 line-clamp-3 text-xs text-gray-800 dark:text-gray-400">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>

            <div className="flex items-center space-x-1">
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            </div>

            <div className="mt-5 sm:mt-auto">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                Last updated 5 mins ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
