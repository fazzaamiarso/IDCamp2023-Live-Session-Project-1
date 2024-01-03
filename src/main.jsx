import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./root.jsx";
import CountryDetail from "./pages/country-detail.jsx";
import Home from "./pages/home";
import { DarkModeProvider } from "./context/darkmode-context";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DarkModeProvider>
        <Root />
      </DarkModeProvider>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "country/:code", element: <CountryDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
