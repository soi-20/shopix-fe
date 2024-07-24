"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { handleSignOut as signOutAction } from "@/lib/auth/signoutServerAction";
import { auth } from "@/lib/auth/authConfig";
import Image from "next/image";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [image, setImage] = useState<any>(null);
  const router = useRouter();

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
    router.push("/auth/sign-in");
  };

  // Display a loading state while checking authentication
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
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <p className="text-xl cursor-pointer text-center font-bold text-slate-500">
          shopix
        </p>
      </Link>
      <div className="flex items-center gap-8">
        {isAuthenticated ? (
          <Image
            src={image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          ></Image>
        ) : (
          <Button onClick={handleSignIn}>sign in</Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
