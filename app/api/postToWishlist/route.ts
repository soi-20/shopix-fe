import { auth_pool as pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { userId, product } = await req.json();

  try {
    await pool.query("BEGIN");

    const { id: productId } = product;

    // Check if the wishlist item already exists for the user
    const existingWishlistItem = await pool.query(
      "SELECT 1 FROM wishlist WHERE user_id = $1 AND product_id = $2",
      [userId, productId]
    );
    if (existingWishlistItem.rows.length > 0) {
      await pool.query("ROLLBACK");
      return NextResponse.json({ message: "Wishlist item already exists" });
    }

    // Generate a UUID for the wishlist item
    const uuid = uuidv4();

    // Insert new wishlist item with UUID
    await pool.query(
      "INSERT INTO wishlist (id, user_id, product_id) VALUES ($1, $2, $3)",
      [uuid, userId, productId]
    );

    await pool.query("COMMIT");
    return NextResponse.json({ message: "Wishlist item added successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error adding wishlist item", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
