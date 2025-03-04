/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiOutlineSetting, AiOutlineSearch } from "react-icons/ai";
import { FiUser, FiLogOut } from "react-icons/fi";
import { BsGraphUp } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { Link } from "react-router-dom";
import {
  MdDashboard,
  MdMenuBook,
  MdPolicy,
  MdPrivacyTip,
  MdContactPhone,
} from "react-icons/md";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaMoneyCheckAlt, FaEdit, FaUserShield } from "react-icons/fa";
import { RiTerminalWindowLine } from "react-icons/ri";

const Sidebar = ({ closeDrawer }) => {
  const [active, setActive] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const menuItems = [
    {
      icon: <MdDashboard className="h-5 w-5" />,
      label: "Dashboard",
      Link: "/",
    },
    {
      icon: <MdMenuBook className="h-5 w-5" />,
      label: "Book List",
      Link: "/book-list",
    },
    { icon: <BsGraphUp className="h-5 w-5" />, label: "Boxes", Link: "/boxes" },
    {
      icon: <LuCircleDollarSign className="h-5 w-5" />,
      label: "Order List",
      Link: "/order-list",
    },
    {
      icon: <FaMoneyCheckAlt className="h-5 w-5" />,
      label: "Subscriptions",
      Link: "/subscription",
    },
    {
      icon: <FiUser className="h-5 w-5" />,
      label: "User List",
      Link: "/user-list",
    },
    {
      icon: <FaEdit className="h-5 w-5" />,
      label: "Reviews",
      Link: "/reviews",
    },
    { icon: <MdMenuBook className="h-5 w-5" />, label: "Blog", Link: "/blog" },
    {
      icon: <AiOutlineSetting className="h-5 w-5" />,
      label: "Settings",
      isDropdown: true,
      subItems: [
        {
          icon: <FaEdit className="h-5 w-5" />,
          label: "About Us",
          Link: "/settings/about-us",
        },
        {
          icon: <MdPrivacyTip className="h-5 w-5" />,
          label: "Privacy Policy",
          Link: "/settings/privacy-policy",
        },
        {
          icon: <MdMenuBook className="h-5 w-5" />,
          label: "Team",
          Link: "/settings/team",
        },
        {
          icon: <MdContactPhone className="h-5 w-5" />,
          label: "Contact Setting",
          Link: "/settings/contact-us",
        },
        {
          icon: <MdMenuBook className="h-5 w-5" />,
          label: "FAQs",
          Link: "/settings/faqs",
        },
        {
          icon: <RiTerminalWindowLine className="h-5 w-5" />,
          label: "Terms & Conditions",
          Link: "/settings/terms-condition",
        },
      ],
    },
    {
      icon: <FaUserShield className="h-5 w-5" />,
      label: "Administrator",
      Link: "/administrator",
    },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subItems &&
        item.subItems.some((sub) =>
          sub.label.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="bg-white h-full w-72  p-3">
      <div className="relative mb-4 ml-6 pt-8">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 text-gray-700"
        />
        <AiOutlineSearch className="absolute right-4 top-[55px] transform -translate-y-1/2 text-gray-500" />
      </div>
      <div className="flex flex-col h-full">
        {filteredMenuItems.map((item) => (
          <div key={item.label}>
            <div
              className={`flex justify-between items-center px-5 py-2 cursor-pointer transition-all rounded-lg ${
                active === item.label
                  ? "bg-red-400 text-white font-semibold"
                  : "text-black"
              }`}
              onClick={() =>
                item.isDropdown
                  ? setOpenDropdown(
                      openDropdown === item.label ? "" : item.label
                    )
                  : setActive(item.label)
              }
            >
              <Link to={item.Link} className="flex items-center gap-3 w-full">
                {item.icon}
                <p>{item.label}</p>
                {item.isDropdown && (
                  <BiChevronDown
                    className={`${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>
            </div>
            {item.isDropdown && openDropdown === item.label && (
              <div className="flex flex-col pl-8">
                {item.subItems.map((subItem) => (
                  <Link to={subItem.Link} key={subItem.label}>
                    <div
                      className={`py-2 px-5 cursor-pointer transition-all rounded-lg ${
                        active === subItem.label
                          ? "bg-primary text-white font-semibold"
                          : "text-black"
                      }`}
                      onClick={() => setActive(subItem.label)}
                    >
                      <p className="flex items-center gap-2">
                        {subItem.icon} {subItem.label}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link to="/sign-in">
          <div className="bg-red-400 text-white w-full py-3 flex justify-center items-center cursor-pointer rounded-lg mt-10">
            <FiLogOut className="text-xl" />
            <p className="ml-2">Log out</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
