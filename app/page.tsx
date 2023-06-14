"use client";
import CreatePost from "./component/Addpost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Posts from "./component/Posts";
import { PostType } from "./types/Types";

const allPost = async () => {
  const response = await axios.get("/api/posts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPost,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <main>
      <h1 className="text-sm font-bold text-blue-500">
        Hello everyone! You can create your post.
      </h1>
      <CreatePost />
      {data?.map((post) => (
        <Posts
          key={post.id}
          //@ts-ignore
          comments={post.comments}
          name={post.user.name}
          img={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
