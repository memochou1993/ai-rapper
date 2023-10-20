import { uberduck } from '@/services';
import { UberduckVoice } from '@/structures/uberduck';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const payload = req.nextUrl.searchParams;
  console.log('Received payload from client', payload);
  const res = await uberduck.fetchVoices(payload);
  let data;
  try {
    // Handle JSON parsing failure
    data = await res.json();
  } catch {
    return Response.json({ error: res.statusText }, { status: res.status });
  }
  if (!res.ok) {
    return Response.json({ error: data }, { status: res.status });
  }
  const items = data.map((v: any) => new UberduckVoice(v));
  return Response.json(items);
}
