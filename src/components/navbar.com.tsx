import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";
import { Role } from "../interfaces/role.enum";
import { logout, setDefaltUser, setUser } from "../stores/users/userSlice";
type Props = {};

const NavBarCom = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // dispatch(setDefaltUser());
  }, []);

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
        // localStorage.setItem("accessToken", res.)
        // const userInfo = {
        //   name: "",
        //   email: "",
        //   role: Role.none,
        //   phone: "",
        //   line: "",
        // };
        dispatch(logout());
        // console.log(userInfo);
        console.log(user);
        navigation("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

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
                Brand
              </p>
            </NavLink>
            <input
              onClick={() => {
                navigation("/hotels/search");
              }}
              type="text"
              className="mx-2 py-2 px-5 block w-full border-2 border-gray-40000 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 "
              placeholder="ค้นหาหอพัก"
            ></input>
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
