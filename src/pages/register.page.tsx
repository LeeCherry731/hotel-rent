import react, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { auth, dbUsers } from "../configs/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { IAddUser } from "../interfaces/add-user.interface";
import { Role } from "../interfaces/role.enum";
import { setUser } from "../stores/users/userSlice";
import { useDispatch } from "react-redux";

type Props = {};

const RegisterPage = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showP, setshowP] = useState(false);
  const [showC, setshowC] = useState(false);
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const onSubmit = async (val: typeof initialValues) => {
    console.log(val);
    createUserWithEmailAndPassword(auth, val.email, val.password)
      .then((res) => {
        console.log(res);
        alert(`${val.email} สมัครสมาชิกสำเร็จ`);

        const user: IAddUser = {
          email: val.email,
          name: val.name,
          role: Role.member,
          created_at: new Date(),
          updated_at: new Date(),
        };

        addDoc(dbUsers, user)
          .then((res) => {
            console.log(res);
            getUser(val.email);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const getUser = async (email: string) => {
    const q = query(dbUsers, where("email", "==", email));

    onSnapshot(q, (snapshot) => {
      let user: any;
      snapshot.docs.forEach((doc) => {
        user = {
          id: doc.id,
          ...doc.data(),
        };
      });

      if (user === undefined) {
        alert("ไม่พบข้อมูล user");
      } else {
        let role = Role.none;
        switch (user.role) {
          case "admin":
            role = Role.admin;
            break;
          case "member":
            role = Role.member;
            break;
          case "none":
            role = Role.none;
            break;

          default:
            break;
        }
        const userInfo = {
          id: user.id ?? "",
          name: user.name ?? "",
          email: user.email ?? "",
          role: role,
          phone: user.phone ?? "",
          line: user.line ?? "",
        };
        dispatch(setUser(userInfo));
        navigate("/");
      }
    });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("กรุณากรอกอีเมลให้ถูกต้อง")
      .required("กรุณากรอกอีเมล"),
    name: Yup.string().required("กรุณากรอกซื่อ"),
    password: Yup.string()
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters.")
      .required("กรุณากรอกรหัสผ่าน"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "รหัสผ่านไม่ตรงกัน")
      .required("กรุณากรอกรหัสผ่าน"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div className="h-full bg-white rounded-md p-5 border-1 mt-32 md:mx-40 sm:mx-10">
            <div className="mt-2">
              <h1 className="block text-2xl mb-2 text-slate-700">
                สมัครสมาชิก
              </h1>
              <hr className="my-4" />
              <label className="block text-sm font-medium mb-2 text-slate-700 ">
                อีเมล
              </label>
              <Field
                type="text"
                name="email"
                className="bg-gray-100  border-2 py-3 px-4 block w-full  rounded-md text-sm focus:border-red-500 focus:ring-red-500 "
                required
                aria-describedby="hs-validation-name-error-helper"
              />
              <span className="text-red-600">
                <ErrorMessage name="email" />
              </span>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-2 text-slate-700">
                ชื่อ - สกุล
              </label>
              <Field
                type="text"
                name="name"
                className="bg-gray-100  relative border-2 py-3 px-4 block w-full  rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                required
                aria-describedby="hs-validation-name-success-helper"
              />

              <span className="text-red-600">
                <ErrorMessage className="text-red-600" name="name" />
              </span>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-2 text-slate-700">
                รหัสผ่าน
              </label>
              <Field
                type="password"
                name="password"
                className="bg-gray-100 relative border-2 py-3 px-4 block w-full  rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                required
                aria-describedby="hs-validation-name-success-helper"
              />

              <span className="text-red-600">
                <ErrorMessage className="text-red-600" name="password" />
              </span>
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-2 text-slate-700">
                ยืนยันรหัสผ่าน
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="bg-gray-100  relative border-2 py-3 px-4 block w-full rounded-md text-sm focus:border-green-500 focus:ring-green-500 "
                required
                aria-describedby="hs-validation-name-success-helper"
              />

              <span className="text-red-600">
                <ErrorMessage className="text-red-600" name="confirmPassword" />
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
      ;
    </>
  );
};

export default RegisterPage;
