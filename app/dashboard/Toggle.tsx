"use client";

import React from "react";

interface Props {
  deletePost: () => void;
  setToggle: (toggle: boolean) => void;
}

const Toggle = ({ deletePost, setToggle }: Props) => {
  return (
    <div
      onClick={() => setToggle(false)}
      className=" fixed bg-black/50 w-full h-full z-20 left-0 top-0"
    >
      <div className=" absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
        <h3 className="text-xl capitalize">
          are you sure you want to delete this post?
        </h3>
        <h3 className="text-sm text-red-600">
          Pressing the Delete button will permenantly delete your post!
        </h3>
        <button
          onClick={deletePost}
          className="text-sm bg-red-600 text-white py-2 px-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Toggle;
