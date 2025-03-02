/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ConfigProvider, Drawer } from "antd";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaX } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import brandlogo from "../../assets/image/logo.png";
import { useGetAdminProfileQuery } from "../../redux/features/AdminApi/AdminApi";

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data: admin } = useGetAdminProfileQuery(localStorage.getItem("_id"));

  // Determine if the screen is mobile
  const isMobile = useMemo(() => window.innerWidth < 768, []);

  // Toggle drawer state
  const toggleDrawer = useCallback(() => setDrawerOpen((prev) => !prev), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeDrawer();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [closeDrawer]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <header className="h-20 bg-white flex justify-between items-center px-4 md:px-10 shadow-md fixed top-0 left-0 w-full z-50">
        {/* Mobile Menu Icon */}
        {isMobile && (
          <GiHamburgerMenu
            onClick={toggleDrawer}
            className="h-8 w-8 cursor-pointer text-gray-700 hover:text-black transition-all"
          />
        )}

        {/* Logo */}
        <Link to="/">
          <img
            src={brandlogo}
            alt="Brand Logo"
            className="h-6 md:h-7 object-contain"
          />
        </Link>

        {/* Admin Profile */}
        <div className="flex items-center gap-3">
          <Link to="/admin-profile" className="flex items-center gap-2">
            <FaUserShield className="w-10 h-10 text-primary" />
            <p className="hidden md:block text-lg font-semibold text-primary">
              {admin?.data?.fullName || "Admin"}<br/>
              <p className="text-sm text-red-300">{admin?.data?.email || "Admin"}</p>
            </p>
          </Link>
        </div>
      </header>

      {/* Sidebar & Content Layout */}
      <ConfigProvider
        theme={{
          components: {
            Drawer: {
              padding: 0,
              paddingXS: 30,
            },
          },
        }}
      >
        <div className="flex flex-1 pt-20">
          {" "}
          {/* Offset for fixed header */}
          {isMobile ? (
            <Drawer
              title="Menu"
              placement="left"
              closable
              onClose={closeDrawer}
              open={drawerOpen}
              width="80%"
              closeIcon={<FaX className="text-black" />}
            >
              <Sidebar onClose={closeDrawer} />
            </Drawer>
          ) : (
            <aside className="w-[18%] min-h-screen bg-white shadow-lg fixed left-0 top-24 h-[calc(100vh-80px)]">
              <Sidebar />
            </aside>
          )}
          {/* Scrollable Content */}
          <main
            className={`flex-1 bg-gray-100 p-4 md:p-8 overflow-auto ${
              isMobile ? "ml-0" : "ml-[18%]"
            } h-[calc(100vh-80px)]`}
          >
            <Outlet />
          </main>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default MainLayout;
