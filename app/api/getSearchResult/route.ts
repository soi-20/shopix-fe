import { NextResponse } from "next/server";
import { searchSchema } from "@/lib/validation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { isAuthenticated, session } = await checkIsAuthenticated();
    let userId = null;
    if (isAuthenticated) {
      userId = session?.user?.id;
    }

    const result = searchSchema.safeParse(body);

    if (!result.success) {
      console.error(result.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const imgURL = result.data.searchFound;

    const response = await fetch("" + process.env.BACKEND_SEARCH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      // pass both imgURL and userId
      body: JSON.stringify({ imgURL, userId: userId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const results = data.results;
    const search_id = data.search_id;

    return NextResponse.json({ results, imgURL, search_id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
