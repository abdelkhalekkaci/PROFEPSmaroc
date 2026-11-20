export async function onRequestGet() {
  return new Response(
    JSON.stringify({ status: 'ok', service: 'ProfEPS.ma', version: '2.0.0' }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    }
  );
}
