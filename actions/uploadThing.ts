// uploadThing.ts
export async function uploadFiles(formData: FormData) {
  try {
    const response = await fetch('https://experiments-testing.azurewebsites.net/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
}
