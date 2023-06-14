"use client";
import Image from "next/image";
import Toggle from "./Toggle";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaRegComment } from "react-icons/fa";
import Link from "next/link";

type Props = {
  id: string;
  img: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    createdAt: string;
    userId: string;
  }[];
};

const EditPost = ({ img, name, title, id, comments }: Props) => {
  const [toggle, setToggle] = useState(false);
  let deleteId: string;
  const queryClient = useQueryClient();
  //delete post
  const { mutate } = useMutation(
    async (id: string) => await axios.put("/api/posts", { data: id }),
    {
      onError: (error) => {
        toast.error("Error deleting this post!", { id: deleteId });
      },
      onSuccess: (data) => {
        toast.success("Post has been deleted.", { id: deleteId });
        queryClient.invalidateQueries(["auth-posts"]);
      },
    }
  );

  const deletePost = () => {
    deleteId = toast.loading("deleting your post", { duration: 3000 });
    mutate(id);
  };

  return (
    <div>
      <div className=" bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src={img}
            alt="img"
            className="rounded-full"
          />
          <h3 className="font-bold text-gray-700">{name} </h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex item-center gap-4 justify-between">
          <Link href={`/post/${id}`}>
            <p className="text-sm font-bold flex text-gray-700">
              {comments?.length} comments
              <FaRegComment size={20} className="mx-2" />
            </p>
          </Link>
          <button
            className="text-sm font-bold text-red-600"
            onClick={() => setToggle(true)}
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </div>
  );
};

export default EditPost;
