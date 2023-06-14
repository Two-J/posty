import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/route";
import Logout from "./Logout";
import { HiHome } from "react-icons/hi";
import SignIn from "./signin/page";

const Nav = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className=" flex justify-between py-4 items-center">
      <Link href="/" className="flex justify-between">
        <h1 className=" font-bold text-lg">Home</h1>
        <HiHome size={25} />
      </Link>
      <ul className=" flex items-center gap-6">
        {session?.user ? <Logout img={session.user.image || ""} /> : <SignIn />}
      </ul>
    </nav>
  );
};

export default Nav;
