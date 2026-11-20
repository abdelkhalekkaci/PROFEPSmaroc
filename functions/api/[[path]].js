export async function onRequest() {
  return new Response(
    JSON.stringify({ success: false, error: 'Point de terminaison API introuvable' }),
    {
      status: 404,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }
  );
}
