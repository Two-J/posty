import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  // Do whatever you want
  return new Response("Hello World!", {
    status: 200,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    authOptions
  );
  console.log(req.body);
}
