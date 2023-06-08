import Link from "next/link";
import React from "react";
import Login from "./Login";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../lib/auth";
import Logout from "./Logout";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className=" flex justify-between py-4 items-center">
      <Link href="/">
        <h1 className=" font-bold text-lg">Send it.</h1>
      </Link>
      <ul className=" flex items-center gap-6">
        {session?.user ? <Logout img={session.user.image || ""} /> : <Login />}
      </ul>
    </nav>
  );
};

export default Nav;
