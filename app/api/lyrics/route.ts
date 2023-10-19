import { uberduck } from '@/services';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const res = await uberduck.generateLyrics(await req.json());
  const data = await res.json();
  if (!res.ok) {
    return Response.json({ error: data }, { status: res.status });
  }
  return Response.json(data);
}
