"use client";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => signIn()}
        className=" text-sm bg-green-600 text-white py-2 px-4 rounded-xl disabled:opacity-25"
      >
        Sign In
      </button>
    </div>
  );
};

export default SignIn;
