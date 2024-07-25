import { auth_pool as pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export const maxDuration = 60;

export async function GET(req: Request) {
  try {
    const { isAuthenticated, session } = await checkIsAuthenticated();
    if (!isAuthenticated) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (session === null) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const userId = session?.user?.id;
    const result = await pool.query(
      `SELECT p.id, p.title, p.image, p.rating, p.price, p.logo, p.link, p.site_name, p.brand_name, p.delivery, p.created_at, p.updated_at, w.added_at 
      FROM wishlist w 
      JOIN products p ON w.product_id = p.id 
      WHERE w.user_id = $1`,
      [userId]
    );

    const wishlistItems = result.rows;

    return NextResponse.json({ wishlistItems: wishlistItems, userId: userId });
  } catch (error) {
    console.error("Error fetching wishlist items", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
