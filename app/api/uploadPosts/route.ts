// pages/api/upload.js
import pool from "@/lib/db";
import { NextResponse } from "next/server";

interface Body {
  post: string;
  postData: string;
}

export async function POST(req: Request, res: NextResponse) {
  const { post, postData }: Body = await req.json();

  try {
    const result = await pool.query(
      "INSERT INTO Posts (posts, postData) VALUES ($1, $2) RETURNING *",
      [JSON.stringify(post), JSON.stringify(postData)]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error inserting data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Fetch all data
export async function GET(req: Request, res: NextResponse) {
  try {
    const result = await pool.query("SELECT * FROM Posts ORDER BY id DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
