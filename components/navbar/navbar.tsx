import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { handleSignOut as signOutAction } from "@/lib/auth/signoutServerAction";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await checkIsAuthenticated();
      setIsAuthenticated(authStatus);
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
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <Button onClick={handleSignIn}>Sign In</Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
