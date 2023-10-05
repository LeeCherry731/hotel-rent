import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

type Props = {};

const AuthLayout = (props: Props) => {
  const location = useLocation();

  return (
    <>
      <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm ">
        <div className="max-w-[85rem] w-full mx-auto px-4">
          <div className="flex items-center justify-between">
            <NavLink to={"/"}>
              <p className="flex-none text-xl font-semibold ">Resident</p>
            </NavLink>
            <div className="py-2">
              <button>
                {location.pathname === "/auth/register" ? (
                  <NavLink to={"/auth/login"}>
                    <p className="inline-flex justify-center items-center gap-x-2 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-2.5 px-3 dark:focus:ring-offset-gray-800">
                      เข้าสู่ระบบ
                    </p>
                  </NavLink>
                ) : (
                  <></>
                )}
                {location.pathname === "/auth/login" ? (
                  <NavLink to={"/auth/register"}>
                    <p className="inline-flex justify-center items-center gap-x-2 text-center bg-blue-600 hover:bg-blue-700 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-2.5 px-3 dark:focus:ring-offset-gray-800">
                      สมัครสมาชิก
                    </p>
                  </NavLink>
                ) : (
                  <></>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="p-4 md:p-0">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
