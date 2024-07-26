import { NextResponse } from "next/server";
import { auth_pool as pool } from "@/lib/db";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { isAuthenticated, session } = await checkIsAuthenticated();
  let userId = null;
  if (isAuthenticated) {
    userId = session?.user?.id;
  }

  try {
    if (!params.id) {
      return NextResponse.json({ error: "Missing Search ID" }, { status: 400 });
    }

    // const result = await pool.query(
    //   "SELECT json_response FROM search WHERE search_id = $1 AND user_id = $2",
    //   [params.id, userId]
    // );

    //  we need to modify this query, we will return the image_url only if the user is authenticated, json_response we will always return, set image_url to null if the user is not authenticated

    const result = await pool.query(
      "SELECT json_response, CASE WHEN user_id = $2 THEN image_url ELSE NULL END as image_url FROM search WHERE search_id = $1",
      [params.id, userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Search ID not found or access denied" },
        { status: 404 }
      );
    }

    const jsonResponse = result.rows[0].json_response;
    const imgURL = result.rows[0].image_url;
    return NextResponse.json({
      data: { results: JSON.parse(jsonResponse), image_url: imgURL },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
