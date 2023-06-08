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
        className=" text-sm bg-gray-700 text-white px-8 py-5 rounded-xl disabled:opacity-25"
      >
        Sign Out
      </button>
      <Link href={"/dashboard"}>
        <Image
          width={35}
          height={35}
          src={img}
          alt=""
          className=" w-14 rounded-full
        "
        />
      </Link>
    </li>
  );
};

export default Logout;
