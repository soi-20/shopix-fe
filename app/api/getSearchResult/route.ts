import { NextResponse } from "next/server";
import { searchSchema } from "@/lib/validation";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = searchSchema.safeParse(body);

    if (!result.success) {
      console.error(result.error);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const imgURL = result.data.searchFound;

    const response = await fetch(
      "https://shoppin-tech.azurewebsites.net/search",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ imgURL }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
