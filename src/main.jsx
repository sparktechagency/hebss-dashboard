import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./router/Routes";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ConfigProvider } from "antd";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConfigProvider> 
        <RouterProvider router={router} />
      </ConfigProvider>
    </PersistGate>
  </Provider>
);
