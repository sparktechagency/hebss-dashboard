import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import brandlogo from "../../assets/image/Logo.png";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get user data from Redux authSlice
  const user = useSelector((state) => state.auth.user);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // console.log(user)

  // ✅ Now build adminProfile based on logged-in user
  const adminProfile = {
    name: user?.fullName ,
    email: user?.email ,
    role: "admin", // If you store role in user, replace "admin" with user.role
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Auth pages where layout is hidden
  const isAuthPage =
    location.pathname === "/sign-in" ||
    location.pathname === "/forgate-password" ||
    location.pathname === "/verify-otp" ||
    location.pathname === "/new-password";

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-[#F4F7FE] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 z-10 w-full bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 md:pl-20">
          <div>
            <img src={brandlogo} alt="logo" className="w-32" />
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer md:mr-8"
            onClick={() => navigate("/admin-profile")}
          >
            <div className="hidden text-right md:block">
              <h3 className="text-lg font-semibold">{adminProfile.name}</h3>
              <p className="text-sm text-gray-500">{adminProfile.email}</p>
            </div>
            <div className="items-center justify-center hidden w-10 h-10 bg-gray-100 rounded-full md:flex">
              <FaRegUser className="text-xl text-gray-600" />
            </div>
            <button className="block lg:hidden" onClick={showDrawer}>
              <RxHamburgerMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <div className="flex pt-16">
        {/* Sidebar for large screens */}
        <div className="fixed left-0 hidden w-64 h-full bg-white shadow-md lg:block top-16">
          <Sidebar adminProfile={adminProfile} />
        </div>

        {/* Mobile Drawer */}
        <ConfigProvider
          theme={{
            components: {
              Drawer: {
                colorBgElevated: "#ffffff",
              },
            },
          }}
        >
          <Drawer
            placement="left"
            width="100%"
            onClose={onClose}
            open={open}
            closeIcon={<IoMdClose className="text-2xl" />}
          >
            <Sidebar adminProfile={adminProfile} />
          </Drawer>
        </ConfigProvider>

        {/* Main Content */}
        <div className="flex-1 lg:ml-72 overflow-y-auto h-[calc(100vh-64px)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
