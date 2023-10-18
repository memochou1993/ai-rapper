import { uberduck } from '@/services';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const res = await uberduck.fetchVoices(req.nextUrl.searchParams);
  const data = await res.json();
  if (!res.ok) {
    return Response.json({ error: data }, { status: res.status });
  }
  return Response.json(data);
}
