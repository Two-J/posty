import { NextApiRequest } from "next";
import { getServerSession } from "next-auth/next";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "../../auth/[...nextauth]/route";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      detaills: string;
      slug: string;
    };
  }
) {
  const slug = params.detaills;
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: slug,
      },
      include: {
        user: true,
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ mes: "error" }, { status: 403 });
  }
}
