"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

type User = {
  img: string;
};

const Logout = ({ img }: User) => {
  return (
    <li className=" flex gap-8 item-center">
      <button
        onClick={() => signOut()}
        className=" text-sm font-bold bg-red-600 text-white px-5 py-2 rounded-xl disabled:opacity-25"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={35}
          height={35}
          src={img}
          alt=""
          className=" rounded-full
        "
        />
      </Link>
    </li>
  );
};

export default Logout;
