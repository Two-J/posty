"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegComment } from "react-icons/fa";
interface Props {
  name: string;
  img: string;
  postTitle: string;
  id: string;
  comments: [];
}

const Posts = ({ name, img, postTitle, id, comments }: Props) => {
  return (
    <div className=" bg-white my-8 p-8 rounded-lg">
      <div className=" flex items-center gap-2">
        <Image
          width={30}
          height={30}
          src={img}
          alt="img"
          className="rounded-full"
        />
        <h3 className=" font-bold text-gray-700">{name}</h3>
      </div>
      <div className=" my-8">
        <p className="breake-all">{postTitle}</p>
      </div>
      <div className=" flex gap-4 items-center cursor-pointer">
        <Link href={`/post/${id}`} className="flex">
          <p className="font-bold text-sm text-gray-700">
            {comments.length} Comments
          </p>
          <FaRegComment size={20} className="mx-2" />
        </Link>
      </div>
    </div>
  );
};

export default Posts;
