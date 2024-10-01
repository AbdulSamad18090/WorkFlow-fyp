"use client";
import React, { useState, useEffect } from "react";
import { GiSpaceShuttle } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Header = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  console.log("Session =>", session);

  useEffect(() => {
    setAuthenticatedUser(session?.user?.userData);
  }, [session, pathname]);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  console.log("Authenticated User =>", authenticatedUser);

  const profileImage = authenticatedUser?.image || "/avatar.png";

  return (
    <div className="flex w-full justify-between leading-[60px] border-b px-8 bg-white sticky top-0 z-50 cursor-pointer shadow-sm">
      <div className="flex gap-2 items-center">
        <GiSpaceShuttle className="md:text-[35px] sm:text-sm icon text-blue-500" />
        <div className="md:text-[16px] sm:text-[12px] font-semibold">
          OpenSpace - Home
        </div>
      </div>
      <div
        className="flex items-center gap-2 relative"
        onClick={() => setShowDialog(!showDialog)}
      >
        <FaQuestion className="text-lg text-blue-500" />
        <div className="bg-blue-500 rounded-full p-[2px]">
          <img
            src={profileImage}
            width={35}
            height={35}
            alt="Profile"
            className="rounded-full"
          />
        </div>
        {/* {showDialog && (
          <div className="absolute top-14 right-0 w-[300px] bg-white shadow-lg border border-gray-200 rounded-lg py-3 px-4 transform transition-transform duration-300 ease-in-out">
            {authenticatedUser ? (
              <>
                <div className="py-4">
                  <p className="font-semibold leading-tight">
                    {authenticatedUser.fullName}
                  </p>
                  <p className="text-gray-500 leading-tight">
                    {authenticatedUser.email}
                  </p>
                </div>
                <hr className="border-t border-gray-300 my-0" />
                <div className="flex justify-between gap-2 text-gray-500 py-3 px-1 text-sm">
                  <button
                    className="bg-blue-50 hover:bg-blue-100 hover:shadow-lg transition-all border border-blue-300 p-2 rounded-lg text-blue-500 w-full"
                    onClick={() => {
                      router.push("/Profile");
                    }}
                  >
                    View Profile
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 hover:shadow-lg transition-all p-2 rounded-lg text-white w-full"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-3">
                  <p className="text-base font-semibold text-gray-800">
                    Welcome to OpenSpace.ai
                  </p>
                </div>
                <div className="flex gap-2 mb-3">
                  <Link
                    href="/Auth"
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-400 transition-colors duration-200 py-1.5 rounded-md text-blue-500 text-center text-sm font-medium"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/Auth"
                    className="w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-200 py-1.5 rounded-md text-white text-center text-sm font-medium"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Header;
