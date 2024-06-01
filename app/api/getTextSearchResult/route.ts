import { SearchSchema, searchSchema } from "@/lib/validation";
import { NextResponse } from 'next/server'; 

export async function POST(req:Request, res:Response) {
    try {
      const body = await req.json();
      const result = searchSchema.safeParse(body);
      
      console.log(result, body);
        if (!result.success) {
            console.error(result.error);
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        const query = {
          query: body.searchFound
        };  
  
      console.log(JSON.stringify(query));
  
      const response = await fetch('https://experiments-testing.azurewebsites.net/search-shopping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
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