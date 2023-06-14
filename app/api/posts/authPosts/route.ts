import { getServerSession } from "next-auth/next";
import { authOptions, prisma } from "../../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ mess: "Please sign in!" }, { status: 401 });
  //get auth users posts
  const email = session.user?.email as string;
  try {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        post: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            comments: true,
          },
        },
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 403 });
  }
}
