type Props = {
  hotels: any[];
};

const TableHotelHome = (props: Props) => {
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-white mx-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
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
            </tr>
          </thead>
          <tbody>
            {props.hotels.map((e, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav
          className="flex items-center justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1-10
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              1000
            </span>
          </span>
          <ul className="inline-flex -space-x-px text-sm h-8">
            <li>
              <p className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                1
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                2
              </p>
            </li>
            <li>
              <p
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                4
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                5
              </p>
            </li>
            <li>
              <p className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
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
