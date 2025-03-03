import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { ConfigProvider, Drawer } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import brandlogo from "../../assets/image/logo.png";

const MainLayout = () => {
    const [open, setOpen] = useState(false);
    const location = useLocation();

    // Mock admin profile data for design
    const adminProfile = {
        name: "Admin User",
        email: "admin@example.com",
        role: "admin"
    };

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const isAuthPage = location.pathname === "/signin" ||
        location.pathname === "/forgate-password" ||
        location.pathname === "/verify-otp" ||
        location.pathname === "/new-password";

    if (isAuthPage) {
        return <Outlet />;
    }

    return (
        <div className="min-h-screen bg-[#F4F7FE]">
            {/* Header for both mobile and desktop */}
            <header className="w-full bg-white shadow-sm">
                <div className="flex justify-between items-center py-3 px-4">
                    <div>
                        <img src={brandlogo} alt="logo" className="w-32" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:block text-right">
                            <h3 className="text-lg font-semibold">{adminProfile.name}</h3>
                            <p className="text-sm text-gray-500">{adminProfile.email}</p>
                        </div>
                        <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                            <FaRegUser className="text-xl text-gray-600" />
                        </div>
                        <button className="block lg:hidden" onClick={showDrawer}>
                            <RxHamburgerMenu className="text-2xl" />
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar for desktop */}
                <div className="hidden lg:block">
                    <Sidebar adminProfile={adminProfile} />
                </div>

                {/* Mobile drawer */}
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

                {/* Main content */}
                <div className="w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
