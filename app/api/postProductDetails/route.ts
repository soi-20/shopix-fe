import { auth_pool as pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const products = await req.json();

  try {
    await pool.query("BEGIN");

    for (const product of products) {
      const { link, price, logo, title, image, rating } = product;

      // Skip products without a rating
      if (rating === "NA" || rating === null) continue;

      // Check if the product already exists
      const existingProduct = await pool.query(
        "SELECT 1 FROM products WHERE link = $1",
        [link]
      );
      if (existingProduct.rows.length > 0) continue;

      // Generate a UUID
      const uuid = uuidv4();

      // Insert new product
      await pool.query(
        "INSERT INTO products (id, title, image, price, rating, link, site_name, delivery, logo, site_id, brand_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
        [uuid, title, image, price, rating, link, null, null, logo, null, null]
      );
    }

    await pool.query("COMMIT");
    return NextResponse.json({ message: "Products inserted successfully" });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error inserting data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
