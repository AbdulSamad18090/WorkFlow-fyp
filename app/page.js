"use client";
import React, { useEffect } from "react";
import Mainer from "./components/Mainer.jsx";
import { useSession } from "next-auth/react";
import ErrorPage from "./components/ErrorPage/page.jsx";
import { useRouter } from "next/navigation.js";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Use window.location.pathname to get the current route
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      // Clear local storage when on the home route
      localStorage.clear();
      console.log("Local storage cleared.");
    }
  }, [router]);

  // Show error page if no session is found
  if (!session) {
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
