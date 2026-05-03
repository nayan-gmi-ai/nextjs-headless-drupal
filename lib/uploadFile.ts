export async function uploadFileToDrupal(
  file: File,
  webformId: string,
  fieldName: string
): Promise<number> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/${webformId}/upload/${fieldName}?_format=json`,
    {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `file; filename="${file.name}"`,
      },
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed: ${err}`);
  }

  const data = await res.json();

  const fid = data?.fid?.[0]?.value;

  if (!fid) {
    throw new Error("No file ID returned from Drupal");
  }

  return fid;
}