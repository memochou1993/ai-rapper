import { uberduck } from '@/services';
import { ServerResponse } from '@/structures/server';
import { UberduckFreestyle } from '@/structures/uberduck';
import { logRequest } from '@/utils';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  logRequest(req);
  try {
    // Handle JSON parsing failure
    const payload = await req.json();
    const res = await uberduck.generateFreestyle(payload);
    // Handle JSON parsing failure
    const data = await res.json();
    if (!res.ok) {
      return Response.json(new ServerResponse({ error: data }), { status: res.status });
    }
    const item = new UberduckFreestyle(data);
    return Response.json(new ServerResponse({ data: item }));
  } catch (e: any) {
    return Response.json(new ServerResponse({ error: e.message }), { status: 500 });
  }
}
