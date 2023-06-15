import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response("Please sign in to make a comment!", {
      status: 401,
    });
  const email = session.user?.email as string;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  console.log(user, "##########");
  const { data } = await req.json();
  console.log("data", data);
  const { title, postId } = data;
  if (!title.length) {
    return NextResponse.json(
      { msg: "Please write a comment" },
      { status: 403 }
    );
  }
  // console.log(title, postId);
  console.log(user);
  const result = await prisma.comments.create({
    //@ts-ignore
    data: {
      message: title,
      userId: user?.id,
      postId,
      createdAt: new Date().toDateString(),
    },
  });

  return NextResponse.json(result, { status: 200 });

  // return NextResponse.json(error, { status: 400 });
}
