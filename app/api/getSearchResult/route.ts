import { SearchSchema, searchSchema } from "@/lib/validation";
import { NextResponse } from 'next/server'; // assuming you're using Next.js

export async function POST(req:Request, res:Response) {
    try {
      const body = await req.json();
      const result = searchSchema.safeParse(body.text);
      
      console.log(result, body);
        if (!result.success) {
            console.error(result.error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }
  
      const searchFound = result.data;

      console.log(JSON.stringify(searchFound));
  
      const response = await fetch('https://experiments-testing.azurewebsites.net/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchFound),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();

      console.log(data);
  
      return NextResponse.json(data);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
