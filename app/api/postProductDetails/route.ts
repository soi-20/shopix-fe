import { auth_pool as pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { products, img_url, searchId } = await req.json();
  const { isAuthenticated, session } = await checkIsAuthenticated();
  let userId = null;
  if (isAuthenticated) {
    userId = session?.user?.id;
  }

  try {
    await pool.query("BEGIN");

    let searchFound = null;
    let search_id = null;

    if (searchId) {
      search_id = searchId;
      searchFound = await pool.query(
        "SELECT search_id, json_response FROM search WHERE search_id = $1",
        [searchId]
      );
    }

    if (searchFound && searchFound?.rows?.length > 0) {
      // if search found, then simply get the record, update the products and update the record in the db
      const { search_id: search_id_found, json_response } = searchFound.rows[0];
      const productsFound = JSON.parse(json_response);

      const updatedProducts = [...productsFound, ...products];

      await pool.query(
        "UPDATE search SET json_response = $1 WHERE search_id = $2 RETURNING search_id",
        [JSON.stringify(updatedProducts), searchId]
      );
    } else {
      const searchResult = await pool.query(
        "INSERT INTO search (json_response, user_id, image_url) VALUES ($1, $2, $3) RETURNING search_id",
        [JSON.stringify(products), userId, img_url] // Include userId in the search table
      );

      // get search id
      search_id = searchResult.rows[0].search_id;
    }

    for (const product of products) {
      let { id, link, price, logo, title, image, rating } = product;

      // Skip products without a rating
      let processed = true;
      if (rating === "NA" || rating === null) {
        processed = false;
        rating = null;
      }

      // Check if the product already exists
      const existingProduct = await pool.query(
        "SELECT 1 FROM products WHERE link = $1",
        [link]
      );
      if (existingProduct.rows.length > 0) continue;

      // Insert new product
      await pool.query(
        "INSERT INTO products (id, title, image, price, rating, link, site_name, delivery, logo, site_id, brand_name, processed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
        [
          id,
          title,
          image,
          price,
          rating,
          link,
          null,
          null,
          logo,
          null,
          null,
          processed,
        ]
      );
    }

    await pool.query("COMMIT");
    return NextResponse.json({
      message: "Products inserted successfully",
      searchId: search_id,
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Error inserting data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
