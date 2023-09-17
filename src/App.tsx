import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./components/layouts/main.layout";
import LoginPage from "./pages/login.page";
import MemberLayout from "./components/layouts/member.layout";
import AdminLayout from "./components/layouts/admin.layout";
import AuthLayout from "./components/layouts/auth.layout";
import MemberDashboard from "./pages/member/dashboard.page";
import RegisterPage from "./pages/register.page";
import HotelsPage from "./pages/member/hotels.page";
import HotelsAddPage from "./pages/member/hotels-add.page";
import SearchHotelPage from "./pages/searchHotelPage";
import HotelsEditPage from "./pages/member/hotels-edit.page";
import ShowHotelPage from "./pages/showHotelPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: MainLayout,
  },
  {
    path: "hotels/search",
    Component: SearchHotelPage,
  },
  {
    path: "hotel",
    Component: ShowHotelPage,
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
    children: [
      {
        path: "",
        Component: MemberDashboard,
      },
      {
        path: "hotels",
        Component: HotelsPage,
      },
      {
        path: "hotels/add",
        Component: HotelsAddPage,
      },
      {
        path: "hotels/edit",
        Component: HotelsEditPage,
      },
    ],
  },
  {
    path: "admin",
    Component: AdminLayout,
  },
  // {
  //   path: "/logout",
  //   async action() {
  //     // We signout in a "resource route" that we can hit from a fetcher.Form
  //     // await fakeAuthProvider.signout();
  //     return redirect("/");
  //   },
  // },
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
