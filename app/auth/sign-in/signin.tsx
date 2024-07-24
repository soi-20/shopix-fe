"use client";

import { FcGoogle } from "react-icons/fc";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";

export const SignInPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-96 p-8 bg-white rounded-3xl shadow-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in</h2>
        <div className="flex flex-col items-center">
          <button
            className="flex items-center justify-center w-full p-4 text-lg font-semibold border border-gray-300 rounded-full bg-white hover:bg-gray-100 transition-colors duration-300 focus:outline-none shadow-md"
            onClick={() => handleGoogleSignIn()}
          >
            <FcGoogle className="mr-4 w-7 h-7" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};
