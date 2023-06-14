"use client";

import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AuthType } from "../types/Types";
import EditPost from "./EditPost";

const fetchPosts = async () => {
  const response = await axios.get("/api/posts/authPosts");
  return response.data;
};

const AuthPosts = () => {
  const { data, isLoading } = useQuery<AuthType>({
    queryFn: fetchPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading) return <h1>Posts are loading! Please wait...</h1>;
  
  return (
    <div>
      {data?.post?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          name={data.name}
          img={data.image}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

export default AuthPosts;
