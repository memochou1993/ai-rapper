import { uberduck } from '@/services';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const payload = req.nextUrl.searchParams;
  console.log('Received payload from client', payload);
  const res = await uberduck.fetchBackingTracks(payload);
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
  return Response.json(data.backing_tracks);
}
