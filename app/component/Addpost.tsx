"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const queryClient = useQueryClient();
  let toastId: string;
  //create a post
  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data, { id: toastId });
        }
        setIsDisable(false);
      },
      onSuccess: (data) => {
        toast.success("Post has been made!", { id: toastId });
        queryClient.invalidateQueries(["posts"]);
        setTitle("");
        setIsDisable(false);
      },
    }
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    toastId = toast.loading("Creating your Post", { duration: 3000 });
    setIsDisable(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-xl">
      <div className=" flex my-4 flex-col">
        <textarea
          className="p-4 text-lg rounded-md my-2 bg-gray-300 outline-none"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
      </div>
      <div className="flex item-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          className="text-sm bg-teal-600 text-white py-2 px-5 rounded-xl disabled:opacity-25"
          disabled={isDisable}
          type="submit"
        >
          Create a post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
