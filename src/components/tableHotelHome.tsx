import Utils from "../utils/utils";

type Props = {
  hotels: any[];
};

const TableHotelHome = (props: Props) => {
  const hotels = props.hotels.slice(0, 8);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white mx-5">
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-6 py-1 min-w-[6rem]"></th>
              <th scope="col" className="px-6 py-1 min-w-[8rem]">
                Name
              </th>
              <th scope="col" className="px-6 py-1 min-w-[6rem]">
                Phone
              </th>
              <th scope="col" className="px-6 py-1 min-w-[10rem]">
                Address
              </th>
              <th scope="col" className="px-6 py-1 min-w-[8rem]">
                ราคาต่ำสุด
              </th>
              <th scope="col" className="px-6 py-1 min-w-[8rem]">
                ราคาสูงสุด
              </th>
              <th scope="col" className="px-6 py-1 min-w-[8rem]">
                ราคาบาท/เดือน
              </th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((e, i) => {
              return (
                <tr key={i} className="bg-white border-b ">
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
                  <td className="px-6 py-4">{Utils.bath(e.min_price)}</td>
                  <td className="px-6 py-4">{Utils.bath(e.max_price)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          {/* <span className="text-sm font-normal text-gray-500 ">
            Showing <span className="font-semibold text-gray-900 ">1-10</span>{" "}
            of <span className="font-semibold text-gray-900 ">1000</span>
          </span> */}
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <p className="flex items-center justify-center px-3 h-8 ml-0 leading-tight  text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">
                Previous
              </p>
            </li>
            <li>
              <p
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 leading-tight text-blue-600 bg-blue-100 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                1
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                2
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                3
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                4
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                5
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">
                Next
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TableHotelHome;
