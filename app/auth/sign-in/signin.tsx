"use client";

import { FcGoogle } from "react-icons/fc";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";

export const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[hsl(0,0%,97.5%)]">
      <div className="w-80 p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <div className="flex flex-col items-center">
          <button
            className="flex items-center justify-center w-full p-4 text-md font-bold border rounded-xl bg-transparent hover:bg-[hsl(0,0%,97.5%)] focus:outline-none"
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle className="mr-5 w-6 h-6" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
