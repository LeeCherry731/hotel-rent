import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { fakeAuthProvider } from "./services/auth";
import MainLayout from "./components/layouts/main.layout";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import MemberLayout from "./components/layouts/member.layout";
import AdminLayout from "./components/layouts/admin.layout";
import AuthLayout from "./components/layouts/auth.layout";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: MainLayout,
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginPage,
      },
      {
        path: "register",
        Component: RegisterPage,
      },
    ],
  },
  {
    path: "member",
    Component: MemberLayout,
  },
  {
    path: "admin",
    Component: AdminLayout,
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

function App() {
  return (
    <div className="">
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </div>
  );
}

export default App;
