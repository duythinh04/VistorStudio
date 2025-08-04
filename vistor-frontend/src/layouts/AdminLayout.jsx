import Sidebar from "../components/AdminSideBar";
import Topbar from "../components/AdminTopBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>

      <div id="wrapper" className="d-flex">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column w-100">
          <div id="content">
            <Topbar />
            <div className="container-fluid py-4">
              <Outlet />
            </div>
          </div>
          <footer className="sticky-footer bg-white mt-auto">
            <div className="container my-auto">
              <div className="text-center my-auto">Admin page</div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
