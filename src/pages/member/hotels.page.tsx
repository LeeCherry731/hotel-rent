import React, { useEffect, useState } from "react";
import { deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { db, dbHotels } from "../../configs/firebase.config";
import { Role } from "../../interfaces/role.enum";

type Props = {};

const HotelsPage = (props: Props) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const user = useSelector((state: RootState) => state.user.info);
  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    const hotels = data.docs.map((doc) => {
      console.log(doc.data());
      return { ...doc.data(), id: doc.id };
    });
    if (user.role === Role.member) {
      const newHotels = hotels.filter((e: any) => {
        return e.userId === user.id;
      });
      setHotels(newHotels);
    }
    setHotels(hotels);
  };

  useEffect(() => {
    getHotels();
  }, []);

  const deleteHotel = async (id: string) => {
    const hotel = doc(db, "hotels", id);
    console.log(hotel);
    deleteDoc(hotel).then(() => {
      alert("ลบข้อมูลสำเร็จ");
      getHotels();
    });
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white">
        <div className="flex justify-end">
          <Link to={"add"}>
            <button
              type="button"
              className="place-self-end text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              + Add
            </button>
          </Link>
        </div>

        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="p-4">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                ราคาต่ำสุด
              </th>
              <th scope="col" className="px-6 py-3">
                ราคาสูงสุด
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((e, i) => {
              return (
                <tr key={i} className="bg-white border-b  hover:bg-gray-50 ">
                  <td className="w-4 p-4">
                    <div className="flex items-center">{i + 1}</div>
                  </td>
                  <th
                    scope="row"
                    className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <figure className="max-h-[10rem]">
                      <img
                        className="h-auto max-h-[10rem]  rounded-lg"
                        src={e.imageUrls[0]}
                        alt="image description"
                      />
                    </figure>
                  </th>
                  <td className="px-6 py-4">{e.name}</td>
                  <td className="px-6 py-4">{e.phone}</td>
                  <td className="px-6 py-4">{e.address}</td>
                  <td className="px-6 py-4">{e.min_price}</td>
                  <td className="px-6 py-4">{e.max_price}</td>

                  <td className="px-6 py-4">
                    <Link
                      to={"edit"}
                      state={{ hotel: e }}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        Edit
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        deleteHotel(e.id);
                      }}
                      className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white  focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                        Delete
                      </span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HotelsPage;
