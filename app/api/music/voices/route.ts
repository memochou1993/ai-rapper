import { uberduck } from '@/services';
import { ServerResponse } from '@/structures/server';
import { UberduckVoice } from '@/structures/uberduck';
import { logRequest } from '@/utils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  logRequest(req);
  try {
    const payload = req.nextUrl.searchParams;
    const res = await uberduck.fetchVoices(payload);
    // Handle JSON parsing failure
    const data = await res.json();
    if (!res.ok) {
      return Response.json(new ServerResponse({ error: data }), { status: res.status });
    }
    const items = data.map((v: any) => new UberduckVoice(v));
    return Response.json(new ServerResponse({ data: items }));
  } catch (e: any) {
    return Response.json(new ServerResponse({ error: e.message }), { status: 500 });
  }
}
