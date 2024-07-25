import { auth_pool as pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, productId } = await req.json();
  console.log("userId", userId);

  try {
    await pool.query("BEGIN");

    // Check if the wishlist item exists for the user
    const existingWishlistItem = await pool.query(
      "SELECT 1 FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    if (existingWishlistItem.rows.length === 0) {
      await pool.query("ROLLBACK");
      return NextResponse.json(
        { error: "Wishlist item not found" },
        { status: 404 }
      );
    }

    // Delete the wishlist item
    await pool.query(
      "DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );

    await pool.query("COMMIT");
    return NextResponse.json({ message: "Wishlist item removed successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error removing wishlist item", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
