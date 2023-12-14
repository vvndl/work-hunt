import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import "./style.scss";
import { AuthContextProvider } from "./components/common/context/AuthContext";
import { ChatContextProvider } from "./components/common/context/ChatContext";
import "./18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContextProvider>
        <ChatContextProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </ChatContextProvider>
      </AuthContextProvider>
    </Suspense>
  </React.StrictMode>
);
