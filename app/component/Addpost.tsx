"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [isDisable, setIsDisable] = useState(false);

  //create a post
  const { mutate } = useMutation(
    async (title) => await axios.post("/api/posts", { title })
  );

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisable(true);
    //@ts-ignore
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
