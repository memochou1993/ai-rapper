import { uberduck } from '@/services';
import { ServerResponse } from '@/structures/server';
import { UberduckVoice } from '@/structures/uberduck';
import { logRequest } from '@/utils';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  logRequest(req);
  const { id } = params;
  try {
    const res = await uberduck.fetchVoice(id);
    // Handle JSON parsing failure
    const data = await res.json();
    if (!res.ok) {
      return Response.json(new ServerResponse({ error: data }), { status: res.status });
    }
    const item = new UberduckVoice(data);
    return Response.json(new ServerResponse({ data: item }));
  } catch (e: any) {
    return Response.json(new ServerResponse({ error: e.message }), { status: 500 });
  }
}
