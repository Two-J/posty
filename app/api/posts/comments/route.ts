import { getServerSession, User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response("pls sign in to make a comment!", {
      status: 401,
    });
  const email = session.user?.email as string;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const { data } = await req.json();
  const { title, postId } = data;
  if (!title.length) {
    return NextResponse.json(
      { msg: "Please write a comment" },
      { status: 401 }
    );
  }
  try {
    const data = await prisma.comments.create({
      //@ts-ignore
      data: {
        message: title,
        userId: user?.id,
        postId,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 403 });
  }

  return new Response("good", { status: 200 });
}
