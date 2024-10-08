"use client";

import { useSelector } from "react-redux";
import LoginPage from "./auth/login/page";
import AdminPage from "./admin/page";

export default function Home() {
  const { token } = useSelector((state) => state.auth);
  return (
    <div className="flex justify-center items-center wrap h-screen">
      {token.access ? <AdminPage /> : <LoginPage />}
    </div>
  );
}
