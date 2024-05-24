import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const taskId = url.searchParams.get("id");

        if (!taskId) {
            return NextResponse.json({ error: "Missing task ID" }, { status: 400 });
        }

        const response = await fetch(`https://experiments-testing.azurewebsites.net/task-status/${taskId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}