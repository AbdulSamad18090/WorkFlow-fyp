"use client";
import React, { useEffect } from "react";
import Mainer from "./components/Mainer.jsx";
import { useSession } from "next-auth/react";
import ErrorPage from "./components/ErrorPage/page.jsx";
import { useRouter } from "next/navigation.js";
import { ImSpinner8 } from "react-icons/im";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Use window.location.pathname to get the current route
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      // Clear local storage when on the home route
      localStorage.clear();
      console.log("Local storage cleared.");
    }
  }, [router]);

  if (status === "loading") {
    return (
      <div className="w-full h-32 flex items-center justify-center p-5">
        <ImSpinner8 className="text-3xl animate-spin" />
      </div>
    );
  }

  // Show error page if no session is found
  if (!session && status !== "loading") {
    return <ErrorPage />;
  }

  // Show Mainer component if session exists
  return (
    <div>
      <Mainer />
    </div>
  );
};

export default Page;
