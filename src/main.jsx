import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import {
  LoginPage,
  RegisterPage,
  ChangePasswordPage,
  ForgotPasswordPage,
  ResetFormPage,
  VerificationUserPage,
  ProctectedRoute,
  SucessVerify,
} from "./Component/Auth/index.js";

import LinkStatsDashboard from "./Component/UrlShortner/AnalyticPage.jsx";

import Layout from "./Component/Layout.jsx";

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<RegisterPage />} />

      <Route path="forgetpassword" element={<ForgotPasswordPage />} />
      <Route path="resetform/:token" element={<ResetFormPage />} />

      <Route element={<ProctectedRoute />}>
        <Route path="sucessVerify/:data" element={<SucessVerify />} />
        <Route path="analytic" element={<LinkStatsDashboard />} />

        <Route path="changepassword" element={<ChangePasswordPage />} />
        <Route path="verification" element={<VerificationUserPage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={route}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);
