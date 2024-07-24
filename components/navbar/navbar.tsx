"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { handleSignOut as signOutAction } from "@/lib/auth/signoutServerAction";
import { PiShoppingCart } from "react-icons/pi";
import Image from "next/image";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [image, setImage] = useState<any>(null);
  const [showPopover, setShowPopover] = useState(false);
  const router = useRouter();
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { isAuthenticated, session } = await checkIsAuthenticated();
      setIsAuthenticated(isAuthenticated);
      setImage(session?.user?.image);
    };

    checkAuth();
  }, []);

  const handleSignIn = () => {
    router.push("/auth/sign-in");
  };

  const handleSignOut = async () => {
    await signOutAction();
    // reload the page to update the UI
    window.location.reload();
  };

  const togglePopover = () => {
    setShowPopover((prev) => !prev);
  };

  const closePopover = (e: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", closePopover);
    } else {
      document.removeEventListener("mousedown", closePopover);
    }
    return () => {
      document.removeEventListener("mousedown", closePopover);
    };
  }, [showPopover]);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-between items-center p-4">
        <Link href="/">
          <p className="text-xl cursor-pointer text-center font-bold text-slate-500">
            shopix
          </p>
        </Link>
        <div className="flex items-center gap-8">
          <ThemeToggle />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 relative">
      <Link href="/">
        <p className="text-xl cursor-pointer text-center font-bold text-slate-500">
          shopix
        </p>
      </Link>
      <div className="flex items-center gap-8">
        {/* cart button */}
        <div className="text-[#1d1d1f]">
          <Link href="/wishlist">
            <PiShoppingCart size={28} />
          </Link>
        </div>
        <ThemeToggle />
        {isAuthenticated ? (
          <div className="relative">
            <Image
              src={image}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
              onClick={togglePopover}
            />
            {showPopover && (
              <div
                ref={popoverRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button onClick={handleSignIn}>sign in</Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
