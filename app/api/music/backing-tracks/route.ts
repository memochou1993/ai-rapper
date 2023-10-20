import { uberduck } from '@/services';
import { ServerResponse } from '@/structures/server';
import { UberduckBackingTracking } from '@/structures/uberduck';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const payload = req.nextUrl.searchParams;
    console.log('Received payload from client', payload);
    const res = await uberduck.fetchBackingTracks(payload);
    // Handle JSON parsing failure
    const data = await res.json();
    if (!res.ok) {
      return Response.json(new ServerResponse({ error: data }), { status: res.status });
    }
    const items = data.backing_tracks.map((v: any) => new UberduckBackingTracking(v));
    return Response.json(new ServerResponse({ data: items }));
  } catch (e: any) {
    return Response.json(new ServerResponse({ error: e.message }), { status: 500 });
  }
}
