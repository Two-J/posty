"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { type } from "os";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  id: string;
};

type Comment = {
  postId: string;
  title: string;
};

const AddComments = ({ id }: Props) => {
  const [title, setTitle] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const queryClient = useQueryClient();
  let commentId: string;
  const { mutate } = useMutation(
    async (data: Comment) => await axios.post("/api/posts/comments", { data }),
    {
      onError: (error) => {
        setIsDisable(false);
        if (error instanceof AxiosError) {
          toast.error("Failed your comment", { id: commentId });
        }
      },
      onSuccess: (data) => {
        setTitle("");
        setIsDisable(false);
        queryClient.invalidateQueries(["detail-post"]);
        toast.success("Added your comment", { id: commentId });
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisable(true);
    commentId = toast.loading("Adding your comment", { duration: 3000 });
    mutate({ title, postId: id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3 className="font-bold">Comments</h3>
      <div className="flex flex-col my-2">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="write a comment"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>
      <div className="flex items-center gap-2">
        <button
          className="text-sm bg-teal-600 text-white py-2 px-5 rounded-xl disabled:opacity-25"
          disabled={isDisable}
          type="submit"
        >
          Add comment
        </button>
        <p
          className={`font-bold text-sm ${
            title.length > 100 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/100`}</p>
      </div>
    </form>
  );
};

export default AddComments;
