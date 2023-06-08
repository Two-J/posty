"use client";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <li>
      <button
        onClick={() => signIn()}
        className=" text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25"
      >
        Sign In
      </button>
    </li>
  );
};

export default Login;
