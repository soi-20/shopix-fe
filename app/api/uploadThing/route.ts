import { NextResponse } from 'next/server';
import { uploadFiles } from '@/actions/uploadThing';

export async function POST(req: Request) {
  try {
    console.log("reached");
    const formData = await req.formData();
    const file = formData.get('file') as File;

    console.log(file);

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const data = await uploadFiles(formData);

    console.log(data);

    if (data.error) {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
