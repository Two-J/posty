import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthPosts from "./MyPosts";

const dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/[...nextauth]");
  }

  return (
    <main>
      <h1 className=" text-2xl font-bold capitalize">Here, all Your posts.</h1>
      <AuthPosts />
    </main>
  );
};

export default dashboard;
