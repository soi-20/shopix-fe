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

    const result = await pool.query(
      "SELECT json_response FROM search WHERE search_id = $1 AND user_id = $2",
      [params.id, userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Search ID not found or access denied" },
        { status: 404 }
      );
    }

    const jsonResponse = result.rows[0].json_response;
    return NextResponse.json(JSON.parse(jsonResponse));
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
