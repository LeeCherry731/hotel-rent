import { Link } from "react-router-dom";
import Utils from "../utils/utils";

type Props = {
  hotels: any[];
};

const TableHotelHome = (props: Props) => {
  const hotels = props.hotels.slice(0, 8);
  return (
    <>
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white mx-5">
        {hotels.map((e) => (
          <Link to={"/hotel"} state={{ hotel: e }}>
            <hr className="my-1" />
            <div className="flex gap-4">
              <div className="bg-white rounded-sm shadow-lg p-2">
                <img src={e.imageUrls[0]} alt="" className="w-28 h-28" />
              </div>
              <div>
                <h1 className="text-blue-400">
                  {e.name}{" "}
                  <span className="text-xs text-white rounded-lg bg-orange-500 px-2">
                    update !
                  </span>
                </h1>
                <h3 className="text-gray-400">{e.address}</h3>
                <h1 className="text-gray-700">
                  {Utils.bath(e.min_price)} - {Utils.bath(e.max_price)}{" "}
                  บาท/เดือน
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
        ))}
      </div>
    </>
  );
};

export default TableHotelHome;
