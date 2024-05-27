import { NextResponse } from 'next/server';
import { uploadFiles } from '@/actions/uploadThing';

export async function POST(req: Request) {
  try {
    console.log("reached");
    const formData = await req.formData();
    const files = formData.getAll('file') as File[];

    console.log(files);

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    const data = await uploadFiles(formData);

    console.log(data);

    // Assuming the function always returns an array of results, handle potential individual errors within the results if necessary
    const hasError = data.some(result => result.error);
    if (hasError) {
      return NextResponse.json({ error: 'Error uploading one or more files' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
