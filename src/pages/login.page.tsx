import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { auth } from "../configs/firebase.config";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const onSubmit = (val: typeof initialValues) => {
    console.log(val);
    signInWithEmailAndPassword(auth, val.email, val.password)
      .then((res) => {
        console.log(res);
        alert(`${val.email} สำเร็จ`);
        // localStorage.setItem("accessToken", res.)
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("กรุณากรอกอีเมลให้ถูกต้อง")
      .required("กรุณากรอกอีเมล"),
    password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <Form>
        <div className="h-full bg-white rounded-md p-5 border-1 mt-32 md:mx-40 sm:mx-10">
          <div className="mt-2">
            <h1 className="block text-2xl mb-2 text-slate-700">เข้าสู่ระบบ</h1>
            <hr className="my-4" />
            <label className="block text-sm font-medium mb-2 text-slate-700 ">
              อีเมล
            </label>
            <Field
              type="text"
              name="email"
              className="border-2 py-3 px-4 block w-full  rounded-md text-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              aria-describedby="hs-validation-name-error-helper"
            />
            <span className="text-red-600">
              <ErrorMessage name="email" />
            </span>
          </div>

          <div className="mt-2">
            <label className="block text-sm font-medium mb-2 text-slate-700">
              รหัสผ่าน
            </label>
            <Field
              type="text"
              name="password"
              className=" border-2 py-3 px-4 block w-full  rounded-md text-sm focus:border-green-500 focus:ring-green-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              required
              aria-describedby="hs-validation-name-success-helper"
            />
            <span className="text-red-600">
              <ErrorMessage className="text-red-600" name="password" />
            </span>
          </div>

          <button
            type="submit"
            className="mt-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginPage;
