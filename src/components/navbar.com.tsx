import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth, dbHotels } from "../configs/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Role } from "../interfaces/role.enum";
import { logout, setDefaltUser, setUser } from "../stores/users/userSlice";
import { useFormik } from "formik";
import { getDocs } from "firebase/firestore";
type Props = {};

const NavBarCom = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigate();
  const router = useLocation();
  const dispatch = useDispatch();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toLoginPage = () => {
    navigation("/auth/login");
  };
  const onDashboard = () => {
    navigation("/member");
  };
  const onSignOut = () => {
    signOut(auth)
      .then((res) => {
        console.log(res);
        alert(`ออกจากระบบ สำเร็จ`);
        dispatch(logout());
        console.log(user);
        navigation("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const [hotels, setHotels] = useState<any[]>([]);
  const [hotelsD, setHotelsD] = useState<any[]>([]);
  const getHotels = async () => {
    const data = await getDocs(dbHotels);
    const hotels = data.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setHotelsD(hotels);
    setHotels(hotels);
  };

  useEffect(() => {
    getHotels();
  }, []);

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: (values) => {
      console.log(values);
      let newHotels = hotelsD;

      newHotels = newHotels.filter((e) => {
        const text = `
        ${e.type.toLowerCase()} 
        ${e.name.toLowerCase()} 
        ${e.address.toLowerCase()}
        ${e.phone.toLowerCase()}
        ${e.line.toLowerCase()}
        ${e.min_price.toString()}
        ${e.max_price.toString()}
        `;
        console.log(text);
        // const eA = e.address.toLowerCase();
        const eV = values.search.toLowerCase();
        const isIn = text.includes(eV);
        return isIn;
      });

      setHotels(newHotels);
    },
  });

  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm py-3 md:py-0 ">
      <div
        className="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="relative md:flex md:items-center md:justify-between">
          <div className="flex items-center justify-between">
            <NavLink to={"/"}>
              <p
                className="flex-none text-xl font-semibold "
                aria-label="Brand"
              >
                Resident
              </p>
            </NavLink>
            <div>
              <form
                onClick={() => {
                  if (router.pathname !== "/hotels/search") {
                    navigation("/hotels/search");
                  }
                }}
                onSubmit={formik.handleSubmit}
                className="md:w-[350px] ml-3"
              >
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                  ค้นหา
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="ค้นหาหอพัก..."
                    name="search"
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.submitForm();
                    }}
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    ค้นหา
                  </button>
                </div>
              </form>
              <div className="float-left absolute z-40 max-[300px]  shadow-2xl">
                {formik.values.search === "" ? (
                  <></>
                ) : hotels.length === 0 ? (
                  <div className="bg-white shadow-2xl px-10 flex justify-center align-middle ">
                    <h1>ไม่พอหอพัก</h1>
                  </div>
                ) : (
                  hotels.map((e) => (
                    <>
                      <Link to={"/hotel"} state={{ hotel: e }}>
                        <ul className="max-w-md divide-y divide-gray-200 bg-white px-8">
                          <li className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <div className="bg-white rounded-sm shadow-lg p-2">
                                  <img
                                    src={e.imageUrls[0]}
                                    alt=""
                                    className="w-12 h-12"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                  {e.name}
                                </p>
                                <p className="text-xs">ที่อยู่ : {e.address}</p>
                                <p className="text-xs">เบอร์ : {e.phone}</p>
                                <p className="text-xs">ไลน์ : {e.line}</p>
                                <p className="text-xs md:hidden  ">
                                  ราคา {e.min_price} - {e.max_price}
                                </p>
                              </div>
                              <div className=" hidden md:block inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                <p className="text-xs">
                                  ราคา {e.min_price} - {e.max_price}
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </Link>
                    </>
                  ))
                )}
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                onClick={toggle}
                className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm "
                data-hs-collapse="#navbar-collapse-with-animation"
                aria-controls="navbar-collapse-with-animation"
                aria-label="Toggle navigation"
              >
                <svg
                  className="hs-collapse-open:hidden w-4 h-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <svg
                  className="hs-collapse-open:block hidden w-4 h-4"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
          </div>

          <div
            id="navbar-collapse-with-animation"
            className={`hs-collapse  overflow-hidden transition-all duration-300 basis-full grow md:block ${
              isOpen ? "" : "hidden"
            }`}
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] scrollbar-y">
              <div className="flex flex-col gap-x-0 mt-5 divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end md:gap-x-7 md:mt-0 md:pl-7 md:divide-y-0 md:divide-solid ">
                <NavLink to={"/"}>
                  <p
                    className="font-medium text-blue-600 py-3 md:py-6 "
                    aria-label="Brand"
                  >
                    Home
                  </p>
                </NavLink>

                {user.info.email === "" ? (
                  <button
                    onClick={toLoginPage}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                      เข้าสู่ระบบ
                    </span>
                  </button>
                ) : (
                  <></>
                )}

                {user.info.role !== Role.none ? (
                  <button
                    onClick={onDashboard}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      Dashboard
                    </span>
                  </button>
                ) : (
                  <></>
                )}

                {user.info.email !== "" ? (
                  <button
                    onClick={onSignOut}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                      ออกจากระบบ
                    </span>
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBarCom;
