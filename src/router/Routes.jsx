import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/Main/Main";
import SignIn from "../Pages/Auth/SignIn/SignIn";
import ForgatePassword from "../Pages/Auth/ForgatePassword/ForgatePassword";
import Newpass from "../Pages/Auth/NewPass/Newpass";
import VerifyPass from "../Pages/Auth/VerifyPass/VerifyPass";
import ContinuePage from "../Pages/Auth/ContinuePage/ContinuePage";
import AboutUs from "../Pages/Settings/AboutUS/AboutUs";
import ContactUS from "../Pages/Settings/ContactUS/ContactUS";
import PrivacyPolicy from "../Pages/Settings/PrivacyPolicy/PrivacyPolicy";
import TermsCondition from "../Pages/Settings/TermsCondition/TermsCondition";
import AdminProfile from "../Pages/AdminProfile/AdminProfile";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import BookList from "../Pages/BookList/BookList";
import AddBookPopup from "../Pages/BookList/BookCreatePopup";
import BoxesList from "../Pages/Boxes/Boxes";
import EditBoxPage from "../Pages/Boxes/EditBox";
import OrderList from "../Pages/OrderList/OrderList";
import SubscriptionPage from "../Pages/Subscription/Subscription";
import UserList from "../Pages/UserList/UserList";
import UserDetails from "../Pages/UserList/UserDetails";
import InvoiceHistoryPage from "../Pages/UserList/InvoiceHistory";
import ReviewsPage from "../Pages/Reviews/Reviews";
import BlogPage from "../Pages/Blog/Blog";
import AdminManagementPage from "../Pages/Admin/Admin";
import FAQPage from "../Pages/Settings/FAQs/FAQs";
import TeamPage from "../Pages/Settings/Team/Team";
import SubscribersPage from "../Pages/Subscription/Subscribers";
// import PrivateRoute from "./privateRoute";

export const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },

  {
    path: "/forgate-password",
    element: <ForgatePassword />,
  },
  {
    path: "/verification",
    element: <VerifyPass />,
  },

  {
    path: "/new-password",
    element: <Newpass></Newpass>,
  },
  {
    path: "/continue-page",
    element: <ContinuePage />,
  },
  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/book-list",
            element: <BookList />,
          },
          {
            path: "/boxes",
            element: <BoxesList />,
          },
          {
            path: "/edit-box/:boxId",
            element: <EditBoxPage />,
          },
          {
            path: "/order-list",
            element: <OrderList />,
          },
          {
            path: "/subscription",
            element: <SubscriptionPage />,
          },
          {
            path: "/subscription/subscribers/:subscriptionId",
            element: <SubscribersPage />,
          },
          {
            path: "/user-list",
            element: <UserList />,
          },
          {
            path: "/user-details/:id",
            element: <UserDetails />,
          },
          {
            path: "/add-book-to-invoice",
            element: <EditBoxPage />,
          },
          {
            path: "/invoice-history",
            element: <InvoiceHistoryPage />,
          },
          {
            path: "/reviews",
            element: <ReviewsPage />,
          },
          {
            path: "/blog",
            element: <BlogPage />,
          },
          {
            path: "/administrator",
            element: <AdminManagementPage />,
          },
          {
            path: "/settings/faqs",
            element: <FAQPage />,
          },
          {
            path: "/settings/team",
            element: <TeamPage/>,
          },
          // {
          //     path: "/user-management/doctor",
          //     element: <Doctor />
          // },
          // {
          //     path: "/user-management/sign-up-request",
          //     element: <SignUpRequest />
          // },
          // {
          //     path: '/appoinment-management',
          //     element: <AllAppointment />

          // },
          // {
          //     path: '/appoinment-management/:id',
          //     element: <Appointment />
          // }
          // ,
          // {
          //     path: '/payment-management',
          //     element: <Payment></Payment>
          // },
          // {
          //     path: '/add-category',
          //     element: <Category></Category>
          // },
          // {
          //     path: '/subdcription-management',
          //     element: <Subscription />
          // },
          // {
          //     path: '/make-admin',
          //     element: <MakeAdmin />
          // },

          // setting:
          {
            path: "/settings/about-us",
            element: <AboutUs />,
          },
          {
            path: "/settings/contact-us",
            element: <ContactUS />,
          },

          {
            path: "/settings/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/settings/terms-condition",
            element: <TermsCondition />,
          },
          // {
          //     path: "/settings/banner",
          //     element: <Banner />
          // },

          // Admin profile:
          {
            path: "/admin-profile",
            element: <AdminProfile />,
          },
          // {
          //     path: '/notification',
          //     element: <Notifications />
          // }
        ],
      },
    ],
  },
]);
