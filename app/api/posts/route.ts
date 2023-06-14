import { getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { type User } from "@prisma/client";
import { Request } from "express";

export async function GET() {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response("pls sign in to make a post!", {
      status: 401,
    });
  const email = session.user?.email as string;
  const user = (await prisma.user.findUnique({
    where: { email },
  })) as User;

  const { title } = await req.json();
  // check title
  if (title.length > 300) {
    return new Response("Please write a shorter post", { status: 403 });
  }
  if (!title.length) {
    return new Response("Please do not leave empty!", { status: 403 });
  }

  //create post

  const result = await prisma.post.create({
    //@ts-ignore
    data: {
      title,
      userId: user.id,
    },
  });

  return new Response("good", { status: 200 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response("pls sign in to delete a post!", {
      status: 401,
    });
  const { data } = await req.json();
  try {
    await prisma.post.delete({
      where: {
        id: data,
      },
    });
    return NextResponse.json("that work", { status: 200 });
  } catch (err) {
    return NextResponse.json({ err: "error has occured" }, { status: 500 });
  }
  return NextResponse.json("all good", { status: 200 });
}
