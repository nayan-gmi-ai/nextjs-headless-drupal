export async function submitWebform(payload: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return {
    ok: res.ok,
    data,
  };
}